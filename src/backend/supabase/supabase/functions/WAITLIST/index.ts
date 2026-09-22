import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const startTime = Date.now()
  const requestId = crypto.randomUUID()

  console.log('==============================')
  console.log('🚀 Edge Function Invoked')
  console.log('Request ID:', requestId)
  console.log('Timestamp:', new Date().toISOString())
  console.log('==============================')

  // 🔐 Environment Variables
  const SUP_URL = Deno.env.get('SUP_URL')
  const SUP_SERVICE_ROLE_KEY = Deno.env.get('SUP_SERVICE_ROLE_KEY')
  const TERMII_API_KEY = Deno.env.get('TERMII_API_KEY')
  const TERMII_TEMPLATE_ID = Deno.env.get('TERMII_TEMPLATE_ID')
  const TERMII_EMAIL_CONFIG_ID = Deno.env.get('TERMII_EMAIL_CONFIG_ID')

  if (!SUP_URL || !SUP_SERVICE_ROLE_KEY) {
    console.error('❌ Missing Supabase credentials')
    return new Response('Server misconfigured', { status: 500 })
  }

  const supabase = createClient(SUP_URL, SUP_SERVICE_ROLE_KEY)

  try {
    // 📦 Parse Webhook Payload
    const rawBody = await req.text()
    console.log('📦 Raw Body:', rawBody)

    const payload = JSON.parse(rawBody)
    const record = payload?.record

    if (!record) {
      throw new Error('No record found in payload')
    }

    const { id, first_name, email } = record

    console.log('🧑 Processing user:', { id, first_name, email })

    // 📝 Audit — Trigger Received
    await supabase.from('audit_logs').insert({
      source: 'edge_function',
      event_type: 'waitlist_trigger_received',
      function_name: 'send-waitlist-email',
      entity_table: 'waitlist_leads',
      entity_id: id,
      request_id: requestId,
      request_payload: record,
      status: 'received'
    })

   
   // 🌍 Build Termii Payload
const termiiPayload = {
  api_key: TERMII_API_KEY,
  email: email,
  subject: 'Confirm your early-access spot',
  email_configuration_id: TERMII_EMAIL_CONFIG_ID,
  template_id: TERMII_TEMPLATE_ID,
  variables: {
    first_name: first_name,
    brand_name: "Wealth Oceans Technologies",
    sender_name: "Joseph",
    brand_website: "www.wealthoceanstech.com",
    brand_tagline: "Lead. Nurture. Convert. With AI.",
    current_year: new Date().getFullYear()
  }
}


    console.log('📤 Sending email via Termii...')
    console.log('Full Termii Payload:', termiiPayload)

    // 📝 Audit — Outgoing Request
    await supabase.from('audit_logs').insert({
      source: 'edge_function',
      event_type: 'waitlist_email_request',
      function_name: 'send-waitlist-email',
      entity_table: 'waitlist_leads',
      entity_id: id,
      request_id: requestId,
      request_payload: termiiPayload,
      status: 'pending'
    })

    // 🌍 Call Termii API
    const response = await fetch(
      'https://api.ng.termii.com/api/templates/send-email',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(termiiPayload),
      }
    )

    const responseText = await response.text()

    let parsedResponse: any
    try {
      parsedResponse = JSON.parse(responseText)
    } catch {
      parsedResponse = responseText
    }

    console.log('🌍 Termii Status:', response.status)
    console.log('📨 Termii Response:', parsedResponse)

    // 📝 Audit — Termii Response
    await supabase.from('audit_logs').insert({
      source: 'edge_function',
      event_type: 'waitlist_email_response',
      function_name: 'send-waitlist-email',
      entity_table: 'waitlist_leads',
      entity_id: id,
      request_id: requestId,
      request_payload: termiiPayload,
      response_payload: parsedResponse,
      status: response.ok ? 'success' : 'error'
    })

    if (!response.ok) {
      throw new Error(`Termii Error: ${JSON.stringify(parsedResponse)}`)
    }

    const duration = Date.now() - startTime

    console.log('✅ Email Sent Successfully')
    console.log('⏱ Duration (ms):', duration)
    console.log('==============================')

    return new Response(
      JSON.stringify({
        success: true,
        request_id: requestId,
        duration_ms: duration
      }),
      { status: 200 }
    )

  } catch (error: any) {

    console.error('❌ ERROR')
    console.error('Request ID:', requestId)
    console.error('Message:', error?.message)
    console.error('Stack:', error?.stack)

    await supabase.from('audit_logs').insert({
      source: 'edge_function',
      event_type: 'waitlist_email_error',
      function_name: 'send-waitlist-email',
      request_id: requestId,
      error_message: error?.message,
      status: 'error'
    })

    const duration = Date.now() - startTime

    console.log('⏱ Duration (ms):', duration)
    console.log('==============================')

    return new Response(
      JSON.stringify({
        error: 'Email failed',
        request_id: requestId
      }),
      { status: 500 }
    )
  }
})
