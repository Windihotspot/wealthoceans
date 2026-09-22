// POST /functions/v1/onboarding-create-organization
// Step 1 of onboarding: create the organization and attach the
// calling user to it as the owner.
//
// Body: { organization_name: string, website?: string, industry?: string }

import {
  handleCors,
  jsonResponse,
  errorResponse,
} from '../_shared/cors.ts'

import {
  getAdminClient,
  getAuthenticatedUser,
} from '../_shared/supabaseAdmin.ts'

import type {
  CreateOrganizationPayload,
} from '../_shared/types.ts'

function slugify(name: string): string {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  console.log('[slugify] Input:', name)
  console.log('[slugify] Generated slug:', slug)

  return slug
}

Deno.serve(async (req: Request) => {
  console.log('==========================================')
  console.log('[onboarding-create-organization] REQUEST')
  console.log('==========================================')

  console.log('[request] Method:', req.method)
  console.log('[request] URL:', req.url)
  console.log(
    '[request] Origin:',
    req.headers.get('origin')
  )

  // Don't log the Authorization header/token.
  console.log(
    '[request] Has Authorization:',
    !!req.headers.get('authorization')
  )

  // --------------------------------------------------
  // CORS
  // --------------------------------------------------
  console.log('[cors] Checking CORS...')

  const cors = handleCors(req)

  if (cors) {
    console.log('[cors] OPTIONS request handled')
    return cors
  }

  console.log('[cors] CORS check passed')

  // --------------------------------------------------
  // Method validation
  // --------------------------------------------------
  console.log(
    '[request] Validating HTTP method...'
  )

  if (req.method !== 'POST') {
    console.warn(
      '[request] Invalid method:',
      req.method
    )

    return errorResponse(
      'Method not allowed',
      405,
      null,
      req
    )
  }

  console.log('[request] POST method confirmed')

  // --------------------------------------------------
  // Authenticate user
  // --------------------------------------------------
  console.log('[auth] Authenticating user...')

  let user

  try {
    user = await getAuthenticatedUser(req)

    if (!user) {
      console.warn(
        '[auth] No authenticated user found'
      )

      return errorResponse(
        'Unauthorized',
        401,
        null,
        req
      )
    }

    console.log('[auth] User authenticated')
    console.log('[auth] User ID:', user.id)
    console.log('[auth] User email:', user.email)
  } catch (err) {
    console.error(
      '[auth] Authentication error:',
      err
    )

    return errorResponse(
      'Authentication failed',
      401,
      null,
      req
    )
  }

  // --------------------------------------------------
  // Parse request body
  // --------------------------------------------------
  console.log('[body] Reading request body...')

  let payload: CreateOrganizationPayload

  try {
    payload = await req.json()

    console.log('[body] Payload received:', {
      organization_name: payload.organization_name,
      website: payload.website,
      industry: payload.industry,
    })
  } catch (err) {
    console.error(
      '[body] Failed to parse JSON:',
      err
    )

    return errorResponse(
      'Invalid JSON body',
      400,
      null,
      req
    )
  }

  // --------------------------------------------------
  // Extract payload
  // --------------------------------------------------
  const {
    organization_name,
    website,
    industry,
  } = payload

  console.log('[validation] Organization name:', organization_name)
  console.log('[validation] Website:', website)
  console.log('[validation] Industry:', industry)

  // --------------------------------------------------
  // Validate organization name
  // --------------------------------------------------
  console.log(
    '[validation] Validating organization name...'
  )

  if (
    !organization_name ||
    organization_name.trim().length < 2
  ) {
    console.warn(
      '[validation] Invalid organization name'
    )

    return errorResponse(
      'organization_name is required (min 2 characters)',
      422,
      null,
      req
    )
  }

  console.log(
    '[validation] Organization name is valid'
  )

  // --------------------------------------------------
  // Get admin client
  // --------------------------------------------------
  console.log(
    '[supabase] Creating admin client...'
  )

  const admin = getAdminClient()

  console.log(
    '[supabase] Admin client created'
  )

  // --------------------------------------------------
  // Check existing organization membership
  // --------------------------------------------------
  console.log(
    '[user] Checking existing user record...'
  )

  console.log(
    '[user] Looking up user ID:',
    user.id
  )

  const {
    data: existingUser,
    error: existingUserErr,
  } = await admin
    .from('users')
    .select('id, organization_id')
    .eq('id', user.id)
    .single()

  console.log(
    '[user] Existing user result:',
    existingUser
  )

  if (existingUserErr) {
    console.error(
      '[user] Failed to load user record:',
      existingUserErr
    )

    return errorResponse(
      'Could not load user record',
      500,
      existingUserErr.message,
      req
    )
  }

  console.log(
    '[user] User record loaded successfully'
  )

  if (existingUser?.organization_id) {
    console.warn(
      '[user] User already belongs to organization:',
      existingUser.organization_id
    )

    return errorResponse(
      'User already belongs to an organization',
      409,
      null,
      req
    )
  }

  console.log(
    '[user] User does not currently belong to an organization'
  )

  // --------------------------------------------------
  // Generate slug
  // --------------------------------------------------
  console.log(
    '[organization] Generating organization slug...'
  )

  const baseSlug =
    slugify(organization_name) || 'business'

  const slug =
    `${baseSlug}-${user.id.slice(0, 6)}`

  console.log(
    '[organization] Base slug:',
    baseSlug
  )

  console.log(
    '[organization] Final slug:',
    slug
  )

  // --------------------------------------------------
  // Create organization
  // --------------------------------------------------
  console.log(
    '[organization] Creating organization...'
  )

  const organizationPayload = {
    name: organization_name.trim(),
    website: website?.trim() || null,
    industry: industry?.trim() || null,
    slug,
    onboarding_step: 2,
    onboarding_completed: false,
  }

  console.log(
    '[organization] Insert payload:',
    organizationPayload
  )

  const {
    data: org,
    error: orgErr,
  } = await admin
    .from('organizations')
    .insert(organizationPayload)
    .select()
    .single()

  console.log(
    '[organization] Insert result:',
    org
  )

  if (orgErr) {
    console.error(
      '[organization] Failed to create organization:',
      orgErr
    )

    return errorResponse(
      'Failed to create organization',
      500,
      orgErr.message,
      req
    )
  }

  console.log(
    '[organization] Organization created successfully'
  )

  console.log(
    '[organization] Organization ID:',
    org.id
  )

  // --------------------------------------------------
  // Attach user to organization
  // --------------------------------------------------
  console.log(
    '[user] Attaching user to organization...'
  )

  console.log(
    '[user] User ID:',
    user.id
  )

  console.log(
    '[user] Organization ID:',
    org.id
  )

  const userUpdatePayload = {
    organization_id: org.id,
    is_owner: true,
    updated_at: new Date().toISOString(),
  }

  console.log(
    '[user] Update payload:',
    userUpdatePayload
  )

  const {
    error: userUpdateErr,
  } = await admin
    .from('users')
    .update(userUpdatePayload)
    .eq('id', user.id)

  if (userUpdateErr) {
    console.error(
      '[user] Failed to attach user to organization:',
      userUpdateErr
    )

    // --------------------------------------------------
    // Rollback
    // --------------------------------------------------
    console.warn(
      '[rollback] Attempting to delete organization:',
      org.id
    )

    const {
      error: rollbackErr,
    } = await admin
      .from('organizations')
      .delete()
      .eq('id', org.id)

    if (rollbackErr) {
      console.error(
        '[rollback] Failed to delete organization:',
        rollbackErr
      )
    } else {
      console.log(
        '[rollback] Organization successfully deleted'
      )
    }

    return errorResponse(
      'Failed to attach user to organization',
      500,
      userUpdateErr.message,
      req
    )
  }

  console.log(
    '[user] User successfully attached to organization'
  )

  console.log(
    '[user] User is now organization owner'
  )

  // --------------------------------------------------
  // Success
  // --------------------------------------------------
  console.log('==========================================')
  console.log(
    '[onboarding-create-organization] SUCCESS'
  )
  console.log('User ID:', user.id)
  console.log('Organization ID:', org.id)
  console.log('Organization Name:', org.name)
  console.log('Organization Slug:', org.slug)
  console.log('Onboarding Step:', org.onboarding_step)
  console.log('==========================================')

  return jsonResponse(
    {
      organization: org,
      onboarding_step: 2,
    },
    201,
    req
  )
})