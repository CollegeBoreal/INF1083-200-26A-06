-- =====================================================================
-- Tests de la migration 0001 (noyau)
-- Chaque test affiche OK ou arrête tout avec une erreur.
-- Lancement : voir docs/TESTING.md
-- =====================================================================
\set ON_ERROR_STOP on
\set QUIET on

-- Utilitaires de test -------------------------------------------------
create schema tests;
create function tests.ok(msg text) returns void language plpgsql as $$
begin raise notice 'OK  %', msg; end $$;

-- Exécute une requête et vérifie qu'elle ÉCHOUE (l'attaque est bloquée)
create function tests.doit_echouer(requete text, msg text) returns void language plpgsql as $$
begin
  begin
    execute requete;
  exception when others then
    perform tests.ok(msg || '  [bloqué : ' || sqlerrm || ']');
    return;
  end;
  raise exception 'ÉCHEC DU TEST : % (la requête aurait dû être refusée)', msg;
end $$;
grant usage on schema tests to authenticated;
grant execute on all functions in schema tests to authenticated;

-- Jeu de données : inscriptions réelles par le schéma auth ----------
insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-0000-0000-0000000000a1', 'candidat.a@exemple.cd', '{"account_type":"talent","first_name":"Patrick","last_name":"Exemple"}'),
  ('00000000-0000-0000-0000-0000000000b2', 'candidat.b@exemple.cd', '{"account_type":"talent","first_name":"Grâce","last_name":"Exemple"}'),
  ('00000000-0000-0000-0000-0000000000e3', 'rh@entreprise.cd',      '{"account_type":"entreprise"}'),
  ('00000000-0000-0000-0000-0000000000d4', 'admin1@sankoveya.com',  '{"account_type":"talent"}'),
  ('00000000-0000-0000-0000-0000000000d5', 'admin2@sankoveya.com',  '{"account_type":"talent"}'),
  ('00000000-0000-0000-0000-0000000000f6', 'evaluateur@sankoveya.com', '{"account_type":"talent"}'),
  -- tentative d'auto-promotion à l'inscription par les métadonnées
  ('00000000-0000-0000-0000-0000000000c7', 'pirate@exemple.cd',     '{"account_type":"talent","role":"super_admin"}');

-- Amorçage : premiers administrateurs créés par le propriétaire de la base
insert into public.user_roles (user_id, role) values
  ('00000000-0000-0000-0000-0000000000d4', 'admin'),
  ('00000000-0000-0000-0000-0000000000d5', 'super_admin'),
  ('00000000-0000-0000-0000-0000000000f6', 'evaluateur');

-- Bascule vers un utilisateur connecté
create function tests.connecter(u text) returns void language sql as $$
  select set_config('request.jwt.claim.sub', u, false)::text, null::void
$$;

\echo '--- 1. Identifiants automatiques'
do $$
declare pid text;
begin
  select public_id into pid from public.profiles where id = '00000000-0000-0000-0000-0000000000a1';
  if pid !~ '^ST-TAL-[0-9]{4}-000001-[0-9]$' then raise exception 'format inattendu : %', pid; end if;
  if not public.public_id_is_valid(pid) then raise exception 'chiffre de contrôle invalide : %', pid; end if;
  perform tests.ok('Identifiant du premier talent : ' || pid);
  if public.public_id_is_valid(regexp_replace(pid, '000001', '000007')) then
    raise exception 'une faute de frappe n''est pas détectée';
  end if;
  perform tests.ok('Une faute de frappe dans l''identifiant est détectée');
  select public_id into pid from public.profiles where id = '00000000-0000-0000-0000-0000000000e3';
  if pid !~ '^ST-REC-' then raise exception 'préfixe du représentant d''entreprise inattendu : %', pid; end if;
  perform tests.ok('Identifiant du représentant d''entreprise : ' || pid);
end $$;

\echo '--- 2. Isolement des données entre candidats'
select tests.connecter('00000000-0000-0000-0000-0000000000a1');
set role authenticated;
do $$
begin
  if (select count(*) from public.profiles) <> 1 then raise exception 'le candidat A voit d''autres profils'; end if;
  perform tests.ok('Le candidat A ne voit que son propre profil');
end $$;
select tests.doit_echouer($q$ update public.profiles set public_id = 'ST-TAL-2027-999999-0' where id = auth.uid() $q$,
  'Le candidat A ne peut pas changer son identifiant');
select tests.doit_echouer($q$ insert into public.user_roles (user_id, role) values (auth.uid(), 'super_admin') $q$,
  'Le candidat A ne peut pas se donner le rôle super_admin');
select tests.doit_echouer($q$ select public.request_role_change(auth.uid(), 'admin', 'accorder', 'je veux être admin') $q$,
  'Le candidat A ne peut pas demander un rôle d''administration');
select tests.doit_echouer($q$ select * from public.audit_logs $q$ || ' where false; select 1/(select count(*) from public.audit_logs)',
  'Le candidat A ne lit aucune ligne du journal d''audit');
reset role;

\echo '--- 3. Inscription avec un rôle forcé dans les métadonnées'
do $$
begin
  if exists (select 1 from public.user_roles where user_id = '00000000-0000-0000-0000-0000000000c7' and role <> 'candidat') then
    raise exception 'un rôle sensible a été accordé depuis les métadonnées';
  end if;
  perform tests.ok('Un rôle demandé dans les métadonnées d''inscription est ignoré');
end $$;

\echo '--- 4. Candidature : création, soumission, protections'
select tests.connecter('00000000-0000-0000-0000-0000000000a1');
set role authenticated;
insert into public.applications (specialization, public_id) values ('reseau', 'ST-CAN-0000-000000-0');
do $$
declare a public.applications;
begin
  select * into a from public.applications;
  if a.public_id = 'ST-CAN-0000-000000-0' or not public.public_id_is_valid(a.public_id) then
    raise exception 'identifiant imposé par l''utilisateur : %', a.public_id;
  end if;
  perform tests.ok('Identifiant de candidature imposé par le serveur : ' || a.public_id);
end $$;
select tests.doit_echouer($q$ update public.applications set status = 'admise' $q$,
  'Le candidat ne peut pas se déclarer admis par une modification directe');
select tests.doit_echouer($q$ insert into public.applications (specialization, status) values ('securite', 'admise') $q$,
  'Le candidat ne peut pas créer une candidature déjà admise');
select tests.doit_echouer($q$ select public.set_application_status((select id from public.applications limit 1), 'admise', 'auto') $q$,
  'Le candidat ne peut pas s''admettre par la fonction de statut');
select public.set_application_status((select id from public.applications limit 1), 'soumise', 'Dossier complet');
reset role;
create table tests.cible as select id from public.applications;
grant select on tests.cible to authenticated;
set role authenticated;
select tests.ok('Le candidat soumet son dossier');
select tests.doit_echouer($q$ insert into public.applications (specialization) values ('reseau') $q$,
  'Une seule candidature active par spécialité');
do $$
begin
  if (select count(*) from public.application_status_history) <> 1 then raise exception 'historique non visible'; end if;
  perform tests.ok('Le candidat voit l''historique de sa candidature (transparence)');
end $$;
reset role;

select tests.connecter('00000000-0000-0000-0000-0000000000b2');
set role authenticated;
do $$
begin
  if (select count(*) from public.applications) <> 0 then raise exception 'B voit la candidature de A'; end if;
  if (select count(*) from public.application_status_history) <> 0 then raise exception 'B voit l''historique de A'; end if;
  perform tests.ok('Le candidat B ne voit ni la candidature ni l''historique de A');
end $$;
select tests.doit_echouer($q$ select public.set_application_status(
    (select id from tests.cible), 'retiree', 'sabotage') $q$,
  'Le candidat B ne peut pas retirer la candidature de A');
reset role;

\echo '--- 5. Évaluateur et décision finale'
select tests.connecter('00000000-0000-0000-0000-0000000000f6');
set role authenticated;
select public.set_application_status((select id from public.applications limit 1), 'preselectionnee', 'Profil cohérent');
select tests.ok('L''évaluateur fait avancer la candidature');
select tests.doit_echouer($q$ select public.set_application_status((select id from public.applications limit 1), 'admise', 'ok') $q$,
  'L''évaluateur ne peut pas prendre la décision finale');
reset role;
select tests.connecter('00000000-0000-0000-0000-0000000000d4');
set role authenticated;
select public.set_application_status((select id from public.applications limit 1), 'admise', 'Validation finale humaine');
select tests.ok('L''administrateur prend la décision finale');
reset role;

\echo '--- 6. Principe des quatre yeux sur les rôles'
select tests.connecter('00000000-0000-0000-0000-0000000000d4');
set role authenticated;
create temp table demande as
  select public.request_role_change('00000000-0000-0000-0000-0000000000b2', 'evaluateur', 'accorder', 'Ingénieur réseau confirmé, recruté comme évaluateur') as id;
select tests.ok('admin1 prépare la demande de rôle évaluateur pour B');
select tests.doit_echouer($q$ select public.decide_role_change((select id from demande), true) $q$,
  'admin1 ne peut pas approuver sa propre demande');
reset role;
grant select on demande to authenticated;
select tests.connecter('00000000-0000-0000-0000-0000000000d5');
set role authenticated;
select public.decide_role_change((select id from demande), true);
reset role;
do $$
begin
  if not exists (select 1 from public.user_roles where user_id = '00000000-0000-0000-0000-0000000000b2' and role = 'evaluateur') then
    raise exception 'le rôle n''a pas été accordé';
  end if;
  perform tests.ok('admin2 (super-administrateur) approuve : B devient évaluateur');
end $$;
select tests.connecter('00000000-0000-0000-0000-0000000000d5');
set role authenticated;
select tests.doit_echouer($q$ select public.decide_role_change((select id from demande), true) $q$,
  'Une demande déjà traitée ne peut pas être approuvée deux fois');
reset role;

\echo '--- 7. Entreprises'
select tests.connecter('00000000-0000-0000-0000-0000000000e3');
set role authenticated;
insert into public.companies (name, rccm, city) values ('Entreprise Démo SARL', 'CD/KNG/RCCM/00-B-00000', 'Kinshasa');
do $$
declare c public.companies;
begin
  select * into c from public.companies;
  if not public.public_id_is_valid(c.public_id) or c.verification <> 'en_attente' then
    raise exception 'entreprise mal créée';
  end if;
  perform tests.ok('L''entreprise est créée « en attente de vérification » : ' || c.public_id);
end $$;
select tests.doit_echouer($q$ update public.companies set verification = 'verifiee' $q$,
  'L''entreprise ne peut pas se déclarer vérifiée elle-même');
reset role;
select tests.connecter('00000000-0000-0000-0000-0000000000a1');
set role authenticated;
select tests.doit_echouer($q$ insert into public.companies (name) values ('Fausse entreprise') $q$,
  'Un compte candidat ne peut pas créer d''entreprise');
do $$
begin
  if (select count(*) from public.companies) <> 0 then raise exception 'A voit une entreprise dont il n''est pas membre'; end if;
  perform tests.ok('Le candidat ne voit pas les entreprises dont il n''est pas membre');
end $$;
reset role;
select tests.connecter('00000000-0000-0000-0000-0000000000d4');
set role authenticated;
update public.companies set verification = 'verifiee', verified_by = auth.uid(), verified_at = now();
select tests.ok('L''administration vérifie l''entreprise');
reset role;

\echo '--- 8. Journal d''audit'
select tests.connecter('00000000-0000-0000-0000-0000000000d4');
set role authenticated;
do $$
declare n int;
begin
  select count(*) into n from public.audit_logs;
  if n < 10 then raise exception 'journal incomplet : % lignes', n; end if;
  perform tests.ok('L''administration lit le journal d''audit : ' || n || ' actions tracées');
end $$;
reset role;
select tests.doit_echouer($q$ delete from public.audit_logs $q$,
  'Même le propriétaire de la base ne peut pas effacer le journal d''audit');
select tests.doit_echouer($q$ update public.audit_logs set action = 'falsifié' $q$,
  'Même le propriétaire de la base ne peut pas modifier le journal d''audit');

\echo '--- 9. Complétion du dossier'
select tests.connecter('00000000-0000-0000-0000-0000000000a1');
set role authenticated;
insert into public.candidate_profiles (user_id, specialization, level, years_experience, skills, languages)
values (auth.uid(), 'reseau', 'intermediaire', 6, '{VLAN,OSPF}', '{fr,en}');
do $$
declare p int := public.profile_completion(auth.uid());
begin
  if p <> 60 then raise exception 'complétion attendue 60, obtenue %', p; end if;
  perform tests.ok('Complétion du dossier calculée : ' || p || ' %');
  if public.profile_completion('00000000-0000-0000-0000-0000000000b2') is not null then
    raise exception 'A lit la complétion du dossier de B';
  end if;
  perform tests.ok('Le candidat A ne peut pas lire la complétion du dossier de B');
end $$;
select tests.doit_echouer($q$ update public.candidate_profiles set github_url = 'javascript:alert(1)' $q$,
  'Un lien GitHub piégé est refusé');
reset role;

\echo '=== Tous les tests sont passés ==='
