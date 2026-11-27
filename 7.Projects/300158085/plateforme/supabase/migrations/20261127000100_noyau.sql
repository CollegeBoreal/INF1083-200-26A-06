-- =====================================================================
-- SankoTalent — Migration 0001 : noyau de la plateforme (priorité P0)
--
-- Contenu :
--   1. Types (rôles, types de compte, statuts de candidature)
--   2. Identifiants publics automatiques avec chiffre de contrôle (section 46)
--   3. Spécialités configurables (section 5 et 48.3)
--   4. Profils et rôles des utilisateurs (sections 4 et 6)
--   5. Changement de rôle avec double approbation (principe des quatre yeux, section 37)
--   6. Entreprises et vérification (sections 20 et 40.2)
--   7. Dossier candidat et candidatures avec historique (sections 6, 7 et 44)
--   8. Consentements (section 24)
--   9. Journal d'audit non modifiable (sections 19 et 37)
--  10. Règles d'accès par ligne (Row Level Security)
--
-- Cible : PostgreSQL 15+ avec Supabase (schéma auth fourni par Supabase).
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- 1. Types
-- ---------------------------------------------------------------------

create type public.app_role as enum (
  'candidat', 'etudiant', 'stagiaire', 'entreprise', 'recruteur',
  'evaluateur', 'surveillant', 'admin', 'super_admin'
);

create type public.account_type as enum ('talent', 'entreprise', 'apprenant', 'formateur');

create type public.application_status as enum (
  'brouillon',                -- dossier enregistré, pas encore soumis
  'soumise',                  -- étape 4
  'verification_admin',       -- étape 5
  'preselectionnee',          -- étape 6
  'invitee_test',             -- étape 7
  'test_termine',             -- étapes 9 et 10
  'video',                    -- étape 11
  'entretien_technique',      -- étape 12
  'entretien_professionnel',  -- étape 13
  'validation_finale',        -- étape 14
  'admise',                   -- étape 15 : base des talents qualifiés
  'non_retenue',
  'retiree'                   -- retirée par le candidat
);

create type public.verification_status as enum ('en_attente', 'verifiee', 'refusee');

-- ---------------------------------------------------------------------
-- 2. Identifiants publics : ST-TAL-2027-000123-7 (section 46)
-- ---------------------------------------------------------------------

create table public.public_id_counters (
  prefix text not null,
  year   int  not null,
  last_value bigint not null default 0,
  primary key (prefix, year)
);

-- Chiffre de contrôle de Luhn calculé sur l'année et le numéro
create or replace function public.luhn_check_digit(digits text)
returns int language plpgsql immutable as $$
declare
  total int := 0;
  d int;
  i int;
  pos int := 0;
begin
  for i in reverse length(digits)..1 loop
    d := substr(digits, i, 1)::int;
    if pos % 2 = 0 then
      d := d * 2;
      if d > 9 then d := d - 9; end if;
    end if;
    total := total + d;
    pos := pos + 1;
  end loop;
  return (10 - (total % 10)) % 10;
end $$;

create or replace function public.next_public_id(p_prefix text)
returns text language plpgsql security definer set search_path = public as $$
declare
  y int := extract(year from now())::int;
  n bigint;
begin
  insert into public.public_id_counters (prefix, year, last_value)
  values (p_prefix, y, 1)
  on conflict (prefix, year) do update set last_value = public.public_id_counters.last_value + 1
  returning last_value into n;
  return format('ST-%s-%s-%s-%s', p_prefix, y, lpad(n::text, 6, '0'),
                public.luhn_check_digit(y::text || lpad(n::text, 6, '0')));
end $$;

-- Vérifie un identifiant dicté au téléphone (détection d'une faute de frappe)
create or replace function public.public_id_is_valid(p_id text)
returns boolean language sql immutable as $$
  select p_id ~ '^ST-[A-Z]{3}-[0-9]{4}-[0-9]{6}-[0-9]$'
     and public.luhn_check_digit(split_part(p_id, '-', 3) || split_part(p_id, '-', 4))
         = split_part(p_id, '-', 5)::int
$$;

-- ---------------------------------------------------------------------
-- 3. Spécialités (configurables par l'administration)
-- ---------------------------------------------------------------------

create table public.specializations (
  key       text primary key,
  name_fr   text not null,
  name_en   text not null,
  color     text not null,
  active    boolean not null default true,
  sort_order int not null default 0
);

insert into public.specializations (key, name_fr, name_en, color, sort_order) values
  ('reseau',        'Réseaux informatiques',         'Network Engineering',     '#22D3EE', 1),
  ('securite',      'Cybersécurité',                 'Cybersecurity',           '#22E39A', 2),
  ('support',       'Assistance informatique',       'IT Support',              '#FBBF24', 3),
  ('systemes',      'Administration des systèmes',   'Systems Administration',  '#A78BFA', 4),
  ('developpement', 'Développement logiciel',        'Software Development',    '#F472B6', 5),
  ('cloud',         'Informatique en nuage',         'Cloud Computing',         '#60A5FA', 6),
  ('projets',       'Gestion de projets TI',         'IT Project Management',   '#FB923C', 7);

-- ---------------------------------------------------------------------
-- 4. Profils et rôles
-- ---------------------------------------------------------------------

create table public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  public_id     text not null unique,
  account_type  public.account_type not null,
  first_name    text,
  last_name     text,
  phone         text,
  city          text,
  province      text,
  country       text not null default 'RD Congo',
  language      text not null default 'fr' check (language in ('fr', 'en')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table public.user_roles (
  user_id    uuid not null references public.profiles (id) on delete cascade,
  role       public.app_role not null,
  granted_by uuid references public.profiles (id),
  granted_at timestamptz not null default now(),
  primary key (user_id, role)
);

-- Le rôle d'un utilisateur se lit toujours sur le serveur, jamais dans le navigateur
create or replace function public.has_role(p_role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = auth.uid() and role = p_role)
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select public.has_role('admin') or public.has_role('super_admin')
$$;

-- ---------------------------------------------------------------------
-- 9 (déclaré tôt car utilisé partout). Journal d'audit non modifiable
-- ---------------------------------------------------------------------

create table public.audit_logs (
  id          bigint generated always as identity primary key,
  occurred_at timestamptz not null default now(),
  actor_id    uuid,
  action      text not null,
  entity      text not null,
  entity_id   text,
  details     jsonb not null default '{}'::jsonb
);

create or replace function public.audit_logs_are_immutable()
returns trigger language plpgsql as $$
begin
  raise exception 'Le journal d''audit ne peut être ni modifié ni supprimé';
end $$;

create trigger audit_logs_no_update before update or delete on public.audit_logs
  for each row execute function public.audit_logs_are_immutable();

create or replace function public.write_audit(p_action text, p_entity text, p_entity_id text, p_details jsonb default '{}'::jsonb)
returns void language sql security definer set search_path = public as $$
  insert into public.audit_logs (actor_id, action, entity, entity_id, details)
  values (auth.uid(), p_action, p_entity, p_entity_id, coalesce(p_details, '{}'::jsonb))
$$;

-- Création automatique du profil, de l'identifiant et du rôle de base à l'inscription
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  t public.account_type := coalesce(nullif(new.raw_user_meta_data ->> 'account_type', ''), 'talent')::public.account_type;
  prefix text := case t when 'talent' then 'TAL' when 'entreprise' then 'REC'
                        when 'apprenant' then 'APP' when 'formateur' then 'FOR' end;
  base_role public.app_role := case t when 'talent' then 'candidat' when 'entreprise' then 'entreprise'
                                      when 'apprenant' then 'etudiant' when 'formateur' then 'candidat' end;
begin
  insert into public.profiles (id, public_id, account_type, first_name, last_name, language)
  values (new.id, public.next_public_id(prefix), t,
          new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name',
          coalesce(nullif(new.raw_user_meta_data ->> 'language', ''), 'fr'));
  -- Un rôle sensible (admin, évaluateur…) n'est JAMAIS attribué à l'inscription
  insert into public.user_roles (user_id, role) values (new.id, base_role);
  insert into public.audit_logs (actor_id, action, entity, entity_id, details)
  values (new.id, 'inscription', 'profile', new.id::text, jsonb_build_object('account_type', t));
  return new;
end $$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.touch_updated_at();

-- Un utilisateur ne peut pas modifier son identifiant ni son type de compte
create or replace function public.protect_profile_fields()
returns trigger language plpgsql as $$
begin
  if new.public_id is distinct from old.public_id or new.account_type is distinct from old.account_type then
    raise exception 'L''identifiant et le type de compte ne peuvent pas être modifiés';
  end if;
  return new;
end $$;

create trigger profiles_protect before update on public.profiles
  for each row execute function public.protect_profile_fields();

-- ---------------------------------------------------------------------
-- 5. Changement de rôle avec double approbation (quatre yeux)
-- ---------------------------------------------------------------------

create table public.role_change_requests (
  id           uuid primary key default gen_random_uuid(),
  target_user  uuid not null references public.profiles (id) on delete cascade,
  role         public.app_role not null,
  operation    text not null check (operation in ('accorder', 'retirer')),
  reason       text not null check (length(reason) >= 10),
  requested_by uuid not null references public.profiles (id),
  requested_at timestamptz not null default now(),
  decided_by   uuid references public.profiles (id),
  decided_at   timestamptz,
  status       text not null default 'en_attente' check (status in ('en_attente', 'approuvee', 'refusee'))
);

-- Étape 1 : un administrateur prépare la demande
create or replace function public.request_role_change(p_target uuid, p_role public.app_role, p_operation text, p_reason text)
returns uuid language plpgsql security definer set search_path = public as $$
declare
  rid uuid;
begin
  if not public.is_admin() then
    raise exception 'Seul un administrateur peut demander un changement de rôle';
  end if;
  if p_role in ('admin', 'super_admin') and not public.has_role('super_admin') then
    raise exception 'Seul un super-administrateur peut demander un rôle d''administration';
  end if;
  insert into public.role_change_requests (target_user, role, operation, reason, requested_by)
  values (p_target, p_role, p_operation, p_reason, auth.uid())
  returning id into rid;
  perform public.write_audit('demande_changement_role', 'role_change_request', rid::text,
    jsonb_build_object('cible', p_target, 'role', p_role, 'operation', p_operation));
  return rid;
end $$;

-- Étape 2 : un AUTRE administrateur approuve ou refuse
create or replace function public.decide_role_change(p_request uuid, p_approve boolean)
returns void language plpgsql security definer set search_path = public as $$
declare
  r public.role_change_requests;
begin
  select * into r from public.role_change_requests where id = p_request for update;
  if not found or r.status <> 'en_attente' then
    raise exception 'Demande introuvable ou déjà traitée';
  end if;
  if r.requested_by = auth.uid() then
    raise exception 'La personne qui a préparé la demande ne peut pas l''approuver (principe des quatre yeux)';
  end if;
  if not public.has_role('super_admin') then
    raise exception 'Seul un super-administrateur peut approuver un changement de rôle';
  end if;
  if r.target_user = auth.uid() then
    raise exception 'Personne ne peut approuver un changement de son propre rôle';
  end if;

  update public.role_change_requests
     set status = case when p_approve then 'approuvee' else 'refusee' end,
         decided_by = auth.uid(), decided_at = now()
   where id = p_request;

  if p_approve then
    if r.operation = 'accorder' then
      insert into public.user_roles (user_id, role, granted_by) values (r.target_user, r.role, auth.uid())
      on conflict do nothing;
    else
      delete from public.user_roles where user_id = r.target_user and role = r.role;
    end if;
  end if;
  perform public.write_audit(case when p_approve then 'approbation_changement_role' else 'refus_changement_role' end,
    'role_change_request', p_request::text, jsonb_build_object('cible', r.target_user, 'role', r.role));
end $$;

-- ---------------------------------------------------------------------
-- 6. Entreprises
-- ---------------------------------------------------------------------

create table public.companies (
  id            uuid primary key default gen_random_uuid(),
  public_id     text not null unique,
  name          text not null,
  rccm          text,           -- registre du commerce
  id_nat        text,           -- identification nationale
  city          text,
  province      text,
  verification  public.verification_status not null default 'en_attente',
  verified_by   uuid references public.profiles (id),
  verified_at   timestamptz,
  created_by    uuid not null default auth.uid() references public.profiles (id),
  created_at    timestamptz not null default now()
);

create table public.company_members (
  company_id uuid not null references public.companies (id) on delete cascade,
  user_id    uuid not null references public.profiles (id) on delete cascade,
  is_owner   boolean not null default false,
  primary key (company_id, user_id)
);

-- Identifiant attribué par le serveur, jamais par l'utilisateur
create or replace function public.assign_public_id()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  new.public_id := public.next_public_id(tg_argv[0]);
  return new;
end $$;

create trigger companies_public_id before insert on public.companies
  for each row execute function public.assign_public_id('ENT');

create or replace function public.add_company_owner()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.company_members (company_id, user_id, is_owner) values (new.id, new.created_by, true);
  perform public.write_audit('creation_entreprise', 'company', new.id::text, jsonb_build_object('nom', new.name));
  return new;
end $$;

create trigger companies_owner after insert on public.companies
  for each row execute function public.add_company_owner();

-- Une entreprise ne peut pas se déclarer « vérifiée » elle-même
create or replace function public.protect_company_verification()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (new.verification, new.verified_by, new.verified_at) is distinct from (old.verification, old.verified_by, old.verified_at)
     and not public.is_admin() then
    raise exception 'Seule l''administration peut vérifier une entreprise';
  end if;
  if new.public_id is distinct from old.public_id then
    raise exception 'L''identifiant d''une entreprise ne peut pas être modifié';
  end if;
  return new;
end $$;

create trigger companies_protect before update on public.companies
  for each row execute function public.protect_company_verification();

create or replace function public.is_company_member(p_company uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.company_members where company_id = p_company and user_id = auth.uid())
$$;

-- ---------------------------------------------------------------------
-- 7. Dossier candidat et candidatures
-- ---------------------------------------------------------------------

create table public.candidate_profiles (
  user_id          uuid primary key references public.profiles (id) on delete cascade,
  specialization   text references public.specializations (key),
  level            text check (level in ('debutant', 'intermediaire', 'avance', 'expert')),
  years_experience int check (years_experience between 0 and 60),
  education_level  text,
  institution      text,
  study_year       text,
  languages        text[] not null default '{}',
  skills           text[] not null default '{}',
  availability     text,
  github_url       text check (github_url is null or github_url ~ '^https://github\.com/'),
  linkedin_url     text check (linkedin_url is null or linkedin_url ~ '^https://([a-z]+\.)?linkedin\.com/'),
  portfolio_url    text check (portfolio_url is null or portfolio_url ~ '^https://'),
  updated_at       timestamptz not null default now()
);

create trigger candidate_profiles_updated_at before update on public.candidate_profiles
  for each row execute function public.touch_updated_at();

-- Pourcentage de complétion du dossier (tableau de bord du candidat, section 18)
create or replace function public.profile_completion(p_user uuid)
returns int language sql stable security definer set search_path = public as $$
  select (
    (case when p.first_name is not null and p.last_name is not null then 1 else 0 end) +
    (case when p.phone is not null then 1 else 0 end) +
    (case when p.city is not null then 1 else 0 end) +
    (case when c.specialization is not null then 1 else 0 end) +
    (case when c.level is not null then 1 else 0 end) +
    (case when c.years_experience is not null then 1 else 0 end) +
    (case when c.education_level is not null then 1 else 0 end) +
    (case when cardinality(coalesce(c.skills, '{}')) > 0 then 1 else 0 end) +
    (case when cardinality(coalesce(c.languages, '{}')) > 0 then 1 else 0 end) +
    (case when c.github_url is not null or c.linkedin_url is not null or c.portfolio_url is not null then 1 else 0 end)
  ) * 10
  from public.profiles p left join public.candidate_profiles c on c.user_id = p.id
  where p.id = p_user
    and (p_user = auth.uid() or public.is_admin())
$$;

create table public.applications (
  id             uuid primary key default gen_random_uuid(),
  public_id      text not null unique,
  candidate_id   uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  specialization text not null references public.specializations (key),
  status         public.application_status not null default 'brouillon',
  submitted_at   timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Une seule candidature active par spécialité
create trigger applications_public_id before insert on public.applications
  for each row execute function public.assign_public_id('CAN');

create unique index applications_one_active_per_specialization
  on public.applications (candidate_id, specialization)
  where status not in ('non_retenue', 'retiree');

create trigger applications_updated_at before update on public.applications
  for each row execute function public.touch_updated_at();

create table public.application_status_history (
  id             bigint generated always as identity primary key,
  application_id uuid not null references public.applications (id) on delete cascade,
  from_status    public.application_status,
  to_status      public.application_status not null,
  changed_by     uuid,
  changed_at     timestamptz not null default now(),
  comment        text
);

-- Le candidat ne change jamais lui-même le statut, sauf soumettre et retirer
create or replace function public.protect_application_status()
returns trigger language plpgsql as $$
begin
  if new.status is distinct from old.status and current_setting('sankotalent.status_change', true) is distinct from 'on' then
    raise exception 'Le statut d''une candidature se change uniquement par les fonctions prévues';
  end if;
  if new.candidate_id is distinct from old.candidate_id or new.public_id is distinct from old.public_id then
    raise exception 'Le candidat et l''identifiant d''une candidature ne peuvent pas être modifiés';
  end if;
  return new;
end $$;

create trigger applications_protect before update on public.applications
  for each row execute function public.protect_application_status();

create or replace function public.set_application_status(p_app uuid, p_to public.application_status, p_comment text)
returns void language plpgsql security definer set search_path = public as $$
declare
  a public.applications;
begin
  select * into a from public.applications where id = p_app for update;
  if not found then raise exception 'Candidature introuvable'; end if;

  if a.candidate_id = auth.uid() then
    -- Le candidat peut seulement soumettre un brouillon ou retirer sa candidature
    if not ((a.status = 'brouillon' and p_to = 'soumise') or (p_to = 'retiree' and a.status not in ('admise', 'non_retenue', 'retiree'))) then
      raise exception 'Action non autorisée pour le candidat';
    end if;
  elsif not (public.is_admin() or public.has_role('evaluateur')) then
    raise exception 'Action non autorisée';
  elsif p_to in ('admise', 'non_retenue') and not public.is_admin() then
    -- Décision finale : toujours humaine et réservée à l'administration (sections 7 et 12)
    raise exception 'La décision finale est réservée à l''administration';
  end if;

  perform set_config('sankotalent.status_change', 'on', true);
  update public.applications
     set status = p_to,
         submitted_at = case when p_to = 'soumise' then now() else submitted_at end
   where id = p_app;
  perform set_config('sankotalent.status_change', 'off', true);

  insert into public.application_status_history (application_id, from_status, to_status, changed_by, comment)
  values (p_app, a.status, p_to, auth.uid(), p_comment);
  perform public.write_audit('statut_candidature', 'application', p_app::text,
    jsonb_build_object('de', a.status, 'vers', p_to));
end $$;

-- ---------------------------------------------------------------------
-- 8. Consentements
-- ---------------------------------------------------------------------

create table public.consent_records (
  id          bigint generated always as identity primary key,
  user_id     uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  consent     text not null check (consent in ('conditions_utilisation', 'politique_confidentialite',
                                               'surveillance_examen', 'enregistrement_video', 'communications')),
  version     text not null,
  granted     boolean not null,
  recorded_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 10. Règles d'accès par ligne (RLS)
-- ---------------------------------------------------------------------

alter table public.public_id_counters          enable row level security;
alter table public.specializations             enable row level security;
alter table public.profiles                    enable row level security;
alter table public.user_roles                  enable row level security;
alter table public.role_change_requests        enable row level security;
alter table public.companies                   enable row level security;
alter table public.company_members             enable row level security;
alter table public.candidate_profiles          enable row level security;
alter table public.applications                enable row level security;
alter table public.application_status_history  enable row level security;
alter table public.consent_records             enable row level security;
alter table public.audit_logs                  enable row level security;

-- Spécialités : lecture publique, modification par l'administration
create policy specializations_read on public.specializations for select using (true);
create policy specializations_admin on public.specializations for all
  using (public.is_admin()) with check (public.is_admin());

-- Profils : chacun voit et modifie le sien ; l'administration voit tout
create policy profiles_own_read on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy profiles_own_update on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

-- Rôles : lecture des siens ; aucune écriture directe (uniquement par decide_role_change)
create policy user_roles_read on public.user_roles for select using (user_id = auth.uid() or public.is_admin());

create policy role_requests_admin_read on public.role_change_requests for select using (public.is_admin());

-- Entreprises : les membres et l'administration ; création par un compte entreprise
create policy companies_read on public.companies for select using (public.is_company_member(id) or public.is_admin());
create policy companies_insert on public.companies for insert
  with check (created_by = auth.uid() and public.has_role('entreprise'));
create policy companies_update on public.companies for update
  using (public.is_company_member(id) or public.is_admin())
  with check (public.is_company_member(id) or public.is_admin());

create policy company_members_read on public.company_members for select
  using (user_id = auth.uid() or public.is_admin() or public.is_company_member(company_id));

-- Dossier candidat : le candidat ; lecture par l'administration et les évaluateurs
create policy candidate_profiles_own on public.candidate_profiles for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy candidate_profiles_staff_read on public.candidate_profiles for select
  using (public.is_admin() or public.has_role('evaluateur'));

-- Candidatures : le candidat crée et lit les siennes ; le personnel autorisé lit tout
create policy applications_own_read on public.applications for select
  using (candidate_id = auth.uid() or public.is_admin() or public.has_role('evaluateur'));
create policy applications_own_insert on public.applications for insert
  with check (candidate_id = auth.uid() and status = 'brouillon');
create policy applications_own_update on public.applications for update
  using (candidate_id = auth.uid() and status = 'brouillon')
  with check (candidate_id = auth.uid());

-- Historique : visible par le candidat concerné (transparence, section 44) et le personnel
create policy history_read on public.application_status_history for select
  using (public.is_admin() or public.has_role('evaluateur')
         or exists (select 1 from public.applications a where a.id = application_id and a.candidate_id = auth.uid()));

-- Consentements : chacun ajoute et lit les siens ; jamais modifiés (un retrait = nouvelle ligne)
create policy consents_own_read on public.consent_records for select using (user_id = auth.uid() or public.is_admin());
create policy consents_own_insert on public.consent_records for insert with check (user_id = auth.uid());

-- Journal d'audit : lecture par l'administration uniquement ; écriture par les fonctions
create policy audit_admin_read on public.audit_logs for select using (public.is_admin());

-- Droits de base pour les rôles Supabase
grant usage on schema public to anon, authenticated;
grant select on public.specializations to anon, authenticated;
grant select, update on public.profiles to authenticated;
grant select on public.user_roles, public.role_change_requests, public.company_members,
               public.application_status_history, public.audit_logs to authenticated;
grant select, insert, update on public.companies, public.candidate_profiles, public.applications to authenticated;
grant select, insert on public.consent_records to authenticated;
grant execute on function public.request_role_change, public.decide_role_change,
                          public.set_application_status, public.profile_completion,
                          public.public_id_is_valid to authenticated;
revoke execute on function public.next_public_id, public.write_audit from public, anon, authenticated;
