import {
  handleCors,
  jsonResponse,
  errorResponse
} from '../_shared/cors.ts'

import {
  getAdminClient,
  getAuthenticatedUser
} from '../_shared/supabaseAdmin.ts'

interface SaveCommunicationStylePayload {
  communication_style: string
  tone_preference: string
  key_phrases: string
  pitch_example: string
  pitch_audio_url?: string // NEW: optional audio URL from storage
  unique_selling_language: string
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  const cors = handleCors(req)

  if (cors) return cors

  // Only POST is allowed
  if (req.method !== 'POST') {
    return errorResponse(
      'Method not allowed',
      405,
      null,
      req
    )
  }

  // Authenticate user
  const user = await getAuthenticatedUser(req)

  if (!user) {
    return errorResponse(
      'Unauthorized',
      401,
      null,
      req
    )
  }

  // Parse request body
  let payload: SaveCommunicationStylePayload

  try {
    payload = await req.json()
  } catch {
    return errorResponse(
      'Invalid JSON body',
      400,
      null,
      req
    )
  }

  const {
    communication_style,
    tone_preference,
    key_phrases,
    pitch_example,
    pitch_audio_url,
    unique_selling_language
  } = payload

  // Validate required fields
  if (
    !communication_style ||
    !tone_preference ||
    !pitch_example
  ) {
    return errorResponse(
      'communication_style, tone_preference, and pitch_example are required',
      422,
      null,
      req
    )
  }

  const admin = getAdminClient()

  // Verify user owns an organization
  const {
    data: userRow,
    error: userErr
  } = await admin
    .from('users')
    .select('organization_id, is_owner')
    .eq('id', user.id)
    .single()

  if (userErr || !userRow?.organization_id) {
    return errorResponse(
      'No organization found for this user',
      400,
      userErr?.message ?? null,
      req
    )
  }

  // Verify organization owner
  if (!userRow.is_owner) {
    return errorResponse(
      'Only the organization owner can complete onboarding',
      403,
      null,
      req
    )
  }

  // Verify onboarding state
  const {
    data: orgCheck,
    error: checkErr
  } = await admin
    .from('organizations')
    .select('onboarding_step, onboarding_completed')
    .eq('id', userRow.organization_id)
    .single()

  if (checkErr || !orgCheck) {
    return errorResponse(
      'Organization not found',
      400,
      checkErr?.message ?? null,
      req
    )
  }

  if (orgCheck.onboarding_completed) {
    return errorResponse(
      'Onboarding already completed',
      409,
      null,
      req
    )
  }

  // Save communication profile
  const {
    data: org,
    error: orgErr
  } = await admin
    .from('organizations')
    .update({
      communication_style: communication_style.trim(),
      tone_preference: tone_preference.trim(),
      key_phrases: key_phrases?.trim() || null,
      pitch_example: pitch_example.trim(),
      pitch_audio_url: pitch_audio_url || null, // NEW: save audio URL
      unique_selling_language:
        unique_selling_language?.trim() || null,
      onboarding_step: 4
    })
    .eq('id', userRow.organization_id)
    .select()
    .single()

  if (orgErr) {
    console.error(
      '[onboarding-save-communication-style] Failed to save:',
      orgErr
    )

    return errorResponse(
      'Failed to save communication profile',
      500,
      orgErr.message,
      req
    )
  }

  // Success
  return jsonResponse(
    {
      organization: org
    },
    200,
    req
  )
})