// GET /functions/v1/get-current-user
// Returns the authenticated user's profile, their organization (if any),
// and the current onboarding status. The frontend router guard calls
// this once after login to decide: onboarding wizard vs dashboard.

import { handleCors, jsonResponse, errorResponse } from '../_shared/cors.ts'
import { getAdminClient, getAuthenticatedUser } from '../_shared/supabaseAdmin.ts'

Deno.serve(async (req: Request) => {
  const cors = handleCors(req)
  if (cors) return cors

  if (req.method !== 'GET') {
    return errorResponse('Method not allowed', 405)
  }

  const user = await getAuthenticatedUser(req)
  if (!user) return errorResponse('Unauthorized', 401)

  const admin = getAdminClient()

  const { data: userRow, error: userErr } = await admin
    .from('users')
    .select('id, email, name, role, is_owner, organization_id, created_at')
    .eq('id', user.id)
    .single()

  if (userErr) {
    return errorResponse('Failed to load user profile', 500, userErr.message)
  }

  let organization = null
  if (userRow.organization_id) {
    const { data: org, error: orgErr } = await admin
      .from('organizations')
      .select('*')
      .eq('id', userRow.organization_id)
      .single()

    if (orgErr) {
      return errorResponse('Failed to load organization', 500, orgErr.message)
    }
    organization = org
  }

  return jsonResponse({
    user: userRow,
    organization,
    onboarding: {
      step: organization?.onboarding_step ?? 1,
      completed: organization?.onboarding_completed ?? false
    }
  })
})
