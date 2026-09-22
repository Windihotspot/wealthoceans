// supabase/functions/onboarding-save-communication-style/index.ts
// POST /functions/v1/onboarding-save-communication-style


import { handleCors, jsonResponse, errorResponse } from '../_shared/cors.ts'
import { getAdminClient, getAuthenticatedUser } from '../_shared/supabaseAdmin.ts'

interface SaveCommunicationStylePayload {
  communication_style: string
  tone_preference: string
  key_phrases: string
  pitch_example: string
  unique_selling_language: string
}

Deno.serve(async (req: Request) => {
  const cors = handleCors(req)
  if (cors) return cors

  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405)
  }

  const user = await getAuthenticatedUser(req)
  if (!user) return errorResponse('Unauthorized', 401)

  let payload: SaveCommunicationStylePayload
  try {
    payload = await req.json()
  } catch {
    return errorResponse('Invalid JSON body', 400)
  }

  const {
    communication_style,
    tone_preference,
    key_phrases,
    pitch_example,
    unique_selling_language
  } = payload

  // Validate required fields
  if (!communication_style || !tone_preference || !pitch_example) {
    return errorResponse(
      'communication_style, tone_preference, and pitch_example are required',
      422
    )
  }

  const admin = getAdminClient()

  // Verify user owns an organization
  const { data: userRow, error: userErr } = await admin
    .from('users')
    .select('organization_id, is_owner')
    .eq('id', user.id)
    .single()

  if (userErr || !userRow?.organization_id) {
    return errorResponse('No organization found for this user', 400)
  }

  if (!userRow.is_owner) {
    return errorResponse('Only the organization owner can complete onboarding', 403)
  }

  // Verify we're at step 3
  const { data: orgCheck, error: checkErr } = await admin
    .from('organizations')
    .select('onboarding_step, onboarding_completed')
    .eq('id', userRow.organization_id)
    .single()

  if (checkErr || !orgCheck) {
    return errorResponse('Organization not found', 400)
  }

  if (orgCheck.onboarding_completed) {
    return errorResponse('Onboarding already completed', 409)
  }

  // Save communication profile
  const { data: org, error: orgErr } = await admin
    .from('organizations')
    .update({
      communication_style: communication_style.trim(),
      tone_preference: tone_preference.trim(),
      key_phrases: key_phrases?.trim() || null,
      pitch_example: pitch_example.trim(),
      unique_selling_language: unique_selling_language?.trim() || null,
      onboarding_step: 4
    })
    .eq('id', userRow.organization_id)
    .select()
    .single()

  if (orgErr) {
    return errorResponse('Failed to save communication profile', 500, orgErr.message)
  }

  return jsonResponse({ organization: org })
})