// POST /functions/v1/onboarding-create-organization
// Step 1 of onboarding: create the organization and attach the
// calling user to it as the owner.
//
// Body: { organization_name: string, website?: string, industry?: string }

import { handleCors, jsonResponse, errorResponse } from '../_shared/cors.ts'
import { getAdminClient, getAuthenticatedUser } from '../_shared/supabaseAdmin.ts'
import type { CreateOrganizationPayload } from '../_shared/types.ts'

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

Deno.serve(async (req: Request) => {
  const cors = handleCors(req)
  if (cors) return cors

  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405)
  }

  const user = await getAuthenticatedUser(req)
  if (!user) return errorResponse('Unauthorized', 401)

  let payload: CreateOrganizationPayload
  try {
    payload = await req.json()
  } catch {
    return errorResponse('Invalid JSON body', 400)
  }

  const { organization_name, website, industry } = payload

  if (!organization_name || organization_name.trim().length < 2) {
    return errorResponse('organization_name is required (min 2 characters)', 422)
  }

  const admin = getAdminClient()

  // Guard: does this user already belong to an organization?
  const { data: existingUser, error: existingUserErr } = await admin
    .from('users')
    .select('id, organization_id')
    .eq('id', user.id)
    .single()

  if (existingUserErr) {
    return errorResponse('Could not load user record', 500, existingUserErr.message)
  }

  if (existingUser?.organization_id) {
    return errorResponse('User already belongs to an organization', 409)
  }

  // Build a unique-ish slug
  const baseSlug = slugify(organization_name) || 'business'
  const slug = `${baseSlug}-${user.id.slice(0, 6)}`

  const { data: org, error: orgErr } = await admin
    .from('organizations')
    .insert({
      name: organization_name.trim(),
      website: website?.trim() || null,
      industry: industry?.trim() || null,
      slug,
      onboarding_step: 2,
      onboarding_completed: false
    })
    .select()
    .single()

  if (orgErr) {
    return errorResponse('Failed to create organization', 500, orgErr.message)
  }

  const { error: userUpdateErr } = await admin
    .from('users')
    .update({
      organization_id: org.id,
      is_owner: true,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id)

  if (userUpdateErr) {
    // Roll back the org so we don't leave an orphan record
    await admin.from('organizations').delete().eq('id', org.id)
    return errorResponse('Failed to attach user to organization', 500, userUpdateErr.message)
  }

  return jsonResponse({ organization: org }, 201)
})
