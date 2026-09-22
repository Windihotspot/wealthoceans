import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { getCorsHeaders, handlePreflight } from './cors.ts'

serve(async (req) => {
  // Handle CORS preflight before anything else
  const preflight = handlePreflight(req)
  if (preflight) return preflight

  const cors = getCorsHeaders(req)
  const startTime = Date.now()
  const requestId = crypto.randomUUID()

  console.log('==============================')
  console.log('🚀 send-demo-email invoked')
  console.log('Request ID:', requestId)
  console.log('==============================')

  const SUP_URL = Deno.env.get('SUP_URL')
  const SUP_SERVICE_ROLE_KEY = Deno.env.get('SUP_SERVICE_ROLE_KEY')
  const TERMII_API_KEY = Deno.env.get('TERMII_API_KEY')
  const TERMII_DEMO_TEMPLATE_ID = Deno.env.get('TERMII_DEMO_TEMPLATE_ID')
  const TERMII_EMAIL_CONFIG_ID = Deno.env.get('TERMII_EMAIL_CONFIG_ID')

  if (!SUP_URL || !SUP_SERVICE_ROLE_KEY) {
    console.error('❌ Missing Supabase credentials')
    return new Response('Server misconfigured', { status: 500, headers: cors })
  }

  const supabase = createClient(SUP_URL, SUP_SERVICE_ROLE_KEY)

  try {
    const rawBody = await req.text()
    console.log('📦 Raw Body:', rawBody)

    const payload = JSON.parse(rawBody)
    const record = payload?.record

    if (!record) {
      throw new Error('No record found in payload')
    }

    const { id, first_name, last_name, email, scheduled_at, meeting_link } = record

    console.log('🧑 Processing demo request:', { id, first_name, email })

    // 📝 Audit — Trigger Received
    await supabase.from('audit_logs').insert({
      source: 'edge_function',
      event_type: 'demo_trigger_received',
      function_name: 'send-demo-email',
      entity_table: 'demo_requests',
      entity_id: id,
      request_id: requestId,
      request_payload: record,
      status: 'received',
    })

    // 🌍 Build Termii Payload
    // NOTE: create the HTML template (demo-confirmation-email.html) as a
    // template in your Termii dashboard, then drop its ID into
    // TERMII_DEMO_TEMPLATE_ID. Variables below map to the {{placeholders}}
    // used in that template.
    const termiiPayload = {
      api_key: TERMII_API_KEY,
      email: email,
      subject: "You booked the call. Good. Now listen...",
      email_configuration_id: TERMII_EMAIL_CONFIG_ID,
      template_id: TERMII_DEMO_TEMPLATE_ID,
      variables: {
        first_name: first_name,
        last_name: last_name,
        call_time: scheduled_at ?? 'a time we will confirm shortly',
        join_link: meeting_link ?? '#',
        brand_name: 'Wealth Oceans Technologies',
        sender_name: 'Joseph',
        brand_website: 'www.wealthoceanstech.com',
        brand_tagline: 'Lead. Nurture. Convert. With AI.',
        current_year: new Date().getFullYear(),
      },
    }

    console.log('📤 Sending demo confirmation via Termii...')

    // 📝 Audit — Outgoing Request
    await supabase.from('audit_logs').insert({
      source: 'edge_function',
      event_type: 'demo_email_request',
      function_name: 'send-demo-email',
      entity_table: 'demo_requests',
      entity_id: id,
      request_id: requestId,
      request_payload: termiiPayload,
      status: 'pending',
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
      event_type: 'demo_email_response',
      function_name: 'send-demo-email',
      entity_table: 'demo_requests',
      entity_id: id,
      request_id: requestId,
      request_payload: termiiPayload,
      response_payload: parsedResponse,
      status: response.ok ? 'success' : 'error',
    })

    if (!response.ok) {
      throw new Error(`Termii Error: ${JSON.stringify(parsedResponse)}`)
    }

    // mark as notified so you can filter in the dashboard
    await supabase.from('demo_requests').update({ notified: true }).eq('id', id)

    const duration = Date.now() - startTime
    console.log('✅ Demo confirmation sent')
    console.log('⏱ Duration (ms):', duration)

    return new Response(
      JSON.stringify({ success: true, request_id: requestId, duration_ms: duration }),
      { status: 200, headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  } catch (error: any) {
    console.error('❌ ERROR', error?.message)

    await supabase.from('audit_logs').insert({
      source: 'edge_function',
      event_type: 'demo_email_error',
      function_name: 'send-demo-email',
      request_id: requestId,
      error_message: error?.message,
      status: 'error',
    })

    return new Response(
      JSON.stringify({ error: 'Email failed', request_id: requestId }),
      { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  }
})