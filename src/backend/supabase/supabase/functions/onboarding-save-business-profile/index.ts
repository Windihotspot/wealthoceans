// POST /functions/v1/onboarding-save-business-profile
// Step 2 of onboarding: business description, target audience, offer,
// budget. This is the data the Market Intelligence Engine (Sprint 2)
// will later consume.
//
// Body: {
//   business_description: string,
//   target_audience: string,
//   main_offer: string,
//   monthly_ad_budget?: number
// }

import { handleCors, jsonResponse, errorResponse } from '../_shared/cors.ts'
import { getAdminClient, getAuthenticatedUser } from '../_shared/supabaseAdmin.ts'
import type { SaveBusinessProfilePayload } from '../_shared/types.ts'

Deno.serve(async (req: Request) => {
  const cors = handleCors(req)
  if (cors) return cors

  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405)
  }

  const user = await getAuthenticatedUser(req)
  if (!user) return errorResponse('Unauthorized', 401)

  let payload: SaveBusinessProfilePayload
  try {
    payload = await req.json()
  } catch {
    return errorResponse('Invalid JSON body', 400)
  }

  const { business_description, target_audience, main_offer, monthly_ad_budget } = payload

  if (!business_description || !target_audience || !main_offer) {
    return errorResponse(
      'business_description, target_audience and main_offer are all required',
      422
    )
  }

  const admin = getAdminClient()

  const { data: userRow, error: userErr } = await admin
    .from('users')
    .select('organization_id, is_owner')
    .eq('id', user.id)
    .single()

  if (userErr || !userRow?.organization_id) {
    return errorResponse('No organization found for this user. Complete step 1 first.', 400)
  }

  if (!userRow.is_owner) {
    return errorResponse('Only the organization owner can complete onboarding', 403)
  }

  const { data: org, error: orgErr } = await admin
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
    return errorResponse('Failed to save business profile', 500, orgErr.message)
  }

  return jsonResponse({ organization: org })
})
