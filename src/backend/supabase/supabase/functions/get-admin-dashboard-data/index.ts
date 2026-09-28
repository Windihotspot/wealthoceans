import {
  handleCors,
  jsonResponse,
  errorResponse,
} from '../_shared/cors.ts'

import {
  getAdminClient,
  getAuthenticatedUser,
} from '../_shared/supabaseAdmin.ts'

Deno.serve(async (req: Request) => {
  console.log('==========================================')
  console.log('[get-admin-dashboard-data] REQUEST')
  console.log('==========================================')

  // Handle CORS
  const cors = handleCors(req)
  if (cors) return cors

  // Only GET is allowed
  if (req.method !== 'GET') {
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

  console.log('[auth] User authenticated:', user.id)

  const admin = getAdminClient()

  try {
    // Get query parameter to determine which data to fetch
    const url = new URL(req.url)
    const dataType = url.searchParams.get('type') || 'all' // 'all', 'waitlist', or 'organizations'

    console.log('[query] Data type requested:', dataType)

    // ==========================================
    // 1. FETCH WAITLIST DATA
    // ==========================================
    let waitlistData = null

    if (dataType === 'all' || dataType === 'waitlist') {
      console.log('[waitlist] Fetching waitlist leads...')

      const { data: leads, error: leadsErr } = await admin
        .from('waitlist_leads')
        .select('*')
        .order('joined_at', { ascending: false })

      if (leadsErr) {
        console.error('[waitlist] Error fetching leads:', leadsErr)
        throw new Error(`Failed to fetch waitlist: ${leadsErr.message}`)
      }

      console.log('[waitlist] Fetched', leads?.length || 0, 'leads')

      // Get email events for waitlist leads
      const leadIds = leads?.map((l) => l.id) || []

      let emailEvents = []
      if (leadIds.length > 0) {
        const { data: events, error: eventsErr } = await admin
          .from('email_events')
          .select('*')
          .in('lead_id', leadIds)

        if (eventsErr) {
          console.warn('[email_events] Error fetching events:', eventsErr)
        } else {
          emailEvents = events || []
          console.log('[email_events] Fetched', emailEvents.length, 'events')
        }
      }

      // Get audit logs for waitlist
      const { data: auditLogs, error: auditErr } = await admin
        .from('audit_logs')
        .select('*')
        .eq('entity_table', 'waitlist_leads')
        .order('created_at', { ascending: false })

      if (auditErr) {
        console.warn('[audit_logs] Error fetching logs:', auditErr)
      }

      waitlistData = {
        leads: leads || [],
        email_events: emailEvents,
        audit_logs: auditLogs || [],
        total_leads: leads?.length || 0,
        confirmed_leads: leads?.filter((l) => l.confirmed).length || 0,
        pending_leads: leads?.filter((l) => !l.confirmed).length || 0,
      }
    }

    // ==========================================
    // 2. FETCH ORGANIZATIONS & USERS DATA
    // ==========================================
    let organizationsData = null

    if (dataType === 'all' || dataType === 'organizations') {
      console.log('[organizations] Fetching organizations...')

      const { data: orgs, error: orgsErr } = await admin
        .from('organizations')
        .select('*')
        .order('created_at', { ascending: false })

      if (orgsErr) {
        console.error('[organizations] Error fetching orgs:', orgsErr)
        throw new Error(`Failed to fetch organizations: ${orgsErr.message}`)
      }

      console.log('[organizations] Fetched', orgs?.length || 0, 'organizations')

      // Get users for all organizations
      console.log('[users] Fetching users...')

      const { data: users, error: usersErr } = await admin
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (usersErr) {
        console.error('[users] Error fetching users:', usersErr)
        throw new Error(`Failed to fetch users: ${usersErr.message}`)
      }

      console.log('[users] Fetched', users?.length || 0, 'users')

      // Get leads for all organizations
      console.log('[leads] Fetching leads...')

      const { data: leads, error: leadsErr } = await admin
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (leadsErr) {
        console.warn('[leads] Error fetching leads:', leadsErr)
      }

      // Enrich organizations with user count and onboarding progress
      const enrichedOrgs = (orgs || []).map((org) => {
        const orgUsers = (users || []).filter((u) => u.organization_id === org.id)
        const orgLeads = (leads || []).filter((l) => l.organization_id === org.id)

        return {
          ...org,
          user_count: orgUsers.length,
          lead_count: orgLeads.length,
          owner: orgUsers.find((u) => u.is_owner),
          users: orgUsers,
          onboarding_progress: {
            step: org.onboarding_step,
            completed: org.onboarding_completed,
            completed_at: org.onboarding_completed_at,
          },
        }
      })

      organizationsData = {
        organizations: enrichedOrgs,
        users: users || [],
        leads: leads || [],
        total_organizations: orgs?.length || 0,
        total_users: users?.length || 0,
        total_leads: leads?.length || 0,
        onboarded_count: (orgs || []).filter((o) => o.onboarding_completed).length,
      }
    }

    // ==========================================
    // 3. RETURN RESPONSE
    // ==========================================
    const response = {
      timestamp: new Date().toISOString(),
      user_id: user.id,
      data_type: dataType,
      ...(waitlistData && { waitlist: waitlistData }),
      ...(organizationsData && { organizations: organizationsData }),
    }

    console.log('==========================================')
    console.log('[get-admin-dashboard-data] SUCCESS')
    console.log('==========================================')

    return jsonResponse(response, 200, req)
  } catch (error: any) {
    console.error('[error] Exception caught:', error.message)

    return errorResponse(
      'Failed to fetch dashboard data',
      500,
      error.message,
      req
    )
  }
})