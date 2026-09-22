import {
  handleCors,
  jsonResponse,
  errorResponse
} from '../_shared/cors.ts'

import {
  getAdminClient,
  getAuthenticatedUser
} from '../_shared/supabaseAdmin.ts'

import type {
  SaveBusinessProfilePayload
} from '../_shared/types.ts'

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
  let payload: SaveBusinessProfilePayload

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
    business_description,
    target_audience,
    main_offer,
    monthly_ad_budget
  } = payload

  // Validate required fields
  if (
    !business_description ||
    !target_audience ||
    !main_offer
  ) {
    return errorResponse(
      'business_description, target_audience and main_offer are all required',
      422,
      null,
      req
    )
  }

  const admin = getAdminClient()

  // Find user's organization
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
      'No organization found for this user. Complete step 1 first.',
      400,
      userErr?.message ?? null,
      req
    )
  }

  // Only owner can complete onboarding
  if (!userRow.is_owner) {
    return errorResponse(
      'Only the organization owner can complete onboarding',
      403,
      null,
      req
    )
  }

  // Save business profile
  const {
    data: org,
    error: orgErr
  } = await admin
    .from('organizations')
    .update({
      business_description: business_description.trim(),
      target_audience: target_audience.trim(),
      main_offer: main_offer.trim(),
      monthly_ad_budget: monthly_ad_budget ?? null,
      onboarding_step: 3
    })
    .eq('id', userRow.organization_id)
    .select()
    .single()

  if (orgErr) {
    console.error(
      '[onboarding-save-business-profile] Failed to save:',
      orgErr
    )

    return errorResponse(
      'Failed to save business profile',
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