# LCI Backend — Sprint 1 (Foundation)

Supabase Edge Functions (Deno) + one migration. This covers **Auth +
Business Onboarding**, matching your dev flow:

```
SIGN UP → BUSINESS SETUP → (AI MARKET RESEARCH — Sprint 2) → ...
```

## 1. Run the migration

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

This adds onboarding columns to `organizations`, adds `is_owner` to
`users`, sets up RLS policies, and creates a trigger that auto-inserts
a `public.users` row whenever someone signs up via Supabase Auth.

## 2. Deploy the functions

```bash
supabase functions deploy onboarding-create-organization
supabase functions deploy onboarding-save-business-profile
supabase functions deploy onboarding-complete
supabase functions deploy get-current-user
```

No extra secrets needed beyond what Supabase sets automatically
(`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY`).

## 3. Onboarding flow this implements

| Order | Function                              | What it does                                             |
|-------|----------------------------------------|------------------------------------------------------------|
| 1     | (Supabase Auth) `signUp`               | Creates the `auth.users` row → trigger creates `public.users` |
| 2     | `onboarding-create-organization`       | Creates the org, sets caller as owner, step → 2           |
| 3     | `onboarding-save-business-profile`     | Saves description / audience / offer / budget, step → 3   |
| 4     | `onboarding-complete`                  | Validates profile is filled, flips `onboarding_completed`  |
| —     | `get-current-user`                     | Called after login/refresh to know where to route the user |

Every function:
- Verifies the caller's JWT via `getAuthenticatedUser` (no client can
  act on behalf of another user).
- Uses the **service role** client so it can write regardless of RLS
  (RLS still protects direct client reads/writes).
- Returns `{ error, details }` JSON on failure with a real HTTP status
  code, so the frontend `ApiService` / axios interceptor behaves
  predictably.

## Next sprints (not included here, ask when ready)
- Sprint 2: `market-intelligence-generate`, `offer-generate` (Claude API calls)
- Sprint 3: leads/conversations/scoring functions
- Sprint 4: channel webhooks (WhatsApp/IG/FB simulated)
- Sprint 5: payment simulation + email
- Sprint 6: analytics aggregation functions
