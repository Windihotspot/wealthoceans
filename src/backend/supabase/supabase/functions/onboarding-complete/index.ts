// supabase/functions/onboarding-complete/index.ts

import {
  handleCors,
  jsonResponse,
  errorResponse,
} from '../_shared/cors.ts'

import {
  getAdminClient,
  getAuthenticatedUser,
} from '../_shared/supabaseAdmin.ts'

import {
  sendTermiiEmail,
} from '../_shared/termii.ts'

Deno.serve(async (req: Request) => {
  const cors = handleCors(req)

  if (cors) return cors

  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405)
  }

  const user = await getAuthenticatedUser(req)

  if (!user) {
    return errorResponse('Unauthorized', 401)
  }

  const admin = getAdminClient()

  // --------------------------------------------------
  // Get user's organization
  // --------------------------------------------------

  const { data: userRow, error: userErr } = await admin
    .from('users')
    .select('organization_id')
    .eq('id', user.id)
    .single()

  if (userErr || !userRow?.organization_id) {
    return errorResponse(
      'No organization found for this user',
      400
    )
  }

  // --------------------------------------------------
  // Load organization profile
  // --------------------------------------------------

  const { data: org, error: orgErr } = await admin
    .from('organizations')
    .select(`
      id,
      onboarding_step,
      onboarding_completed,
      business_description,
      target_audience,
      main_offer,
      communication_style,
      pitch_example
    `)
    .eq('id', userRow.organization_id)
    .single()

  if (orgErr) {
    return errorResponse(
      'Failed to load organization',
      500,
      orgErr.message
    )
  }

  // --------------------------------------------------
  // Validate onboarding
  // --------------------------------------------------

  const missingFields: string[] = []

  if (!org.business_description) {
    missingFields.push('Business description')
  }

  if (!org.target_audience) {
    missingFields.push('Target audience')
  }

  if (!org.main_offer) {
    missingFields.push('Main offer')
  }

  if (!org.communication_style) {
    missingFields.push('Communication style')
  }

  if (!org.pitch_example) {
    missingFields.push('Pitch example')
  }

  if (missingFields.length > 0) {
    return errorResponse(
      `Incomplete profile. Missing: ${missingFields.join(', ')}. Complete all steps first.`,
      400
    )
  }

  // --------------------------------------------------
  // Mark onboarding as complete
  // --------------------------------------------------

  const { data: updatedOrg, error: updateErr } = await admin
    .from('organizations')
    .update({
      onboarding_step: 5,
      onboarding_completed: true,
      onboarding_completed_at: new Date().toISOString(),
    })
    .eq('id', userRow.organization_id)
    .select()
    .single()

  if (updateErr) {
    return errorResponse(
      'Failed to complete onboarding',
      500,
      updateErr.message
    )
  }

  // --------------------------------------------------
  // Send onboarding completion email
  // --------------------------------------------------

  let emailSent = false
  let emailError: string | null = null

  try {
    const templateId = Deno.env.get(
      'TERMII_ONBOARDING_TEMPLATE_ID'
    )

    const emailConfigurationId = Deno.env.get(
      'TERMII_EMAIL_CONFIGURATION_ID'
    )

    const logoUrl = Deno.env.get('EMAIL_LOGO_URL')
    const bannerUrl = Deno.env.get('EMAIL_BANNER_URL')
    const appUrl = Deno.env.get('APP_URL')
    const supportEmail = Deno.env.get('SUPPORT_EMAIL')

    if (!templateId) {
      throw new Error(
        'Missing TERMII_ONBOARDING_TEMPLATE_ID'
      )
    }

    if (!emailConfigurationId) {
      throw new Error(
        'Missing TERMII_EMAIL_CONFIGURATION_ID'
      )
    }

    if (!logoUrl) {
      throw new Error('Missing EMAIL_LOGO_URL')
    }

    if (!bannerUrl) {
      throw new Error('Missing EMAIL_BANNER_URL')
    }

    if (!appUrl) {
      throw new Error('Missing APP_URL')
    }

    if (!supportEmail) {
      throw new Error('Missing SUPPORT_EMAIL')
    }

    // Get name from Supabase Auth metadata
    const metadata = user.user_metadata ?? {}

    const firstName =
      metadata.first_name ||
      metadata.firstName ||
      metadata.name?.split(' ')[0] ||
      'there'

    if (!user.email) {
      throw new Error(
        'Authenticated user does not have an email address'
      )
    }

    await sendTermiiEmail({
      email: user.email,
      subject: 'Welcome to Wealth Oceans Technologies',
      templateId,
      emailConfigurationId,

      variables: {
        first_name: firstName,

        logo_url: logoUrl,

        banner_url: bannerUrl,

        dashboard_url: appUrl,

        support_email: supportEmail,

        year: new Date().getFullYear(),
      },
    })

    emailSent = true

  } catch (err) {
    emailError =
      err instanceof Error
        ? err.message
        : 'Unknown email error'

    console.error(
      'Failed to send onboarding email:',
      emailError
    )
  }

  // --------------------------------------------------
  // Return result
  // --------------------------------------------------

  return jsonResponse({
    organization: updatedOrg,

    onboarding_completed: true,

    email: {
      sent: emailSent,
      error: emailError,
    },
  })
})