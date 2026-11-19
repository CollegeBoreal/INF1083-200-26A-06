-- Waypoint — base de données en ligne (Supabase / PostgreSQL)
-- À coller dans Supabase → SQL Editor → New query → Run.

-- Une ligne par utilisateur : son profil et les étapes qu'il a faites.
-- Les documents du coffre ne sont PAS ici : ils restent sur le téléphone.
create table if not exists public.progression (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  profil     jsonb,
  faites     text[] not null default '{}',
  mis_a_jour timestamptz not null default now()
);

-- Sécurité : chaque utilisateur ne voit et ne modifie QUE sa propre ligne.
alter table public.progression enable row level security;

drop policy if exists "lire sa progression" on public.progression;
create policy "lire sa progression"
  on public.progression for select
  using (auth.uid() = user_id);

drop policy if exists "creer sa progression" on public.progression;
create policy "creer sa progression"
  on public.progression for insert
  with check (auth.uid() = user_id);

drop policy if exists "modifier sa progression" on public.progression;
create policy "modifier sa progression"
  on public.progression for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
