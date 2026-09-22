-- ============================================================
-- Migration: Onboarding fields for organizations + users
-- Adds everything Sprint 1 (Foundation) needs on top of the
-- existing schema you already have in Supabase.
-- Safe to run multiple times (IF NOT EXISTS / IF EXISTS guards).
-- ============================================================

-- ---------- organizations: business profile + onboarding state ----------
alter table public.organizations
  add column if not exists slug text unique,
  add column if not exists logo_url text,
  add column if not exists business_description text,
  add column if not exists target_audience text,
  add column if not exists main_offer text,
  add column if not exists monthly_ad_budget numeric,
  add column if not exists onboarding_step integer not null default 1,
  add column if not exists onboarding_completed boolean not null default false,
  add column if not exists onboarding_completed_at timestamp with time zone;

-- ---------- users: link every auth user to an onboarding step ----------
-- (organization_id + role already exist per your schema)
alter table public.users
  add column if not exists is_owner boolean not null default false,
  add column if not exists updated_at timestamp with time zone default now();

-- ---------- user_role enum guard ----------
-- If user_role enum doesn't already contain 'owner', add it.
do $$
begin
  if not exists (
    select 1 from pg_type t
    join pg_enum e on t.oid = e.enumtypid
    where t.typname = 'user_role' and e.enumlabel = 'owner'
  ) then
    alter type public.user_role add value 'owner';
  end if;
end$$;

-- ---------- helpful index ----------
create index if not exists idx_users_organization_id on public.users(organization_id);
create index if not exists idx_organizations_onboarding_completed on public.organizations(onboarding_completed);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.organizations enable row level security;
alter table public.users enable row level security;

-- Users can read their own row
drop policy if exists "users_select_self" on public.users;
create policy "users_select_self"
  on public.users for select
  using (auth.uid() = id);

-- Users can update their own row (name only really, role changes should go through an edge function)
drop policy if exists "users_update_self" on public.users;
create policy "users_update_self"
  on public.users for update
  using (auth.uid() = id);

-- Users can read their own organization
drop policy if exists "org_select_member" on public.organizations;
create policy "org_select_member"
  on public.organizations for select
  using (
    id in (select organization_id from public.users where id = auth.uid())
  );

-- Only the owner can update the organization directly from the client
-- (edge functions use the service role key and bypass RLS anyway)
drop policy if exists "org_update_owner" on public.organizations;
create policy "org_update_owner"
  on public.organizations for update
  using (
    id in (
      select organization_id from public.users
      where id = auth.uid() and is_owner = true
    )
  );

-- ============================================================
-- Trigger: auto-create a `public.users` row whenever a new
-- auth.users row is created (Supabase Auth sign up)
-- ============================================================
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, name, role, created_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'marketer',
    now()
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_auth_user();
