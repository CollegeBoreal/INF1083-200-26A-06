# Schéma de la base de données

Base PostgreSQL hébergée par Supabase. Toutes les tables ont la sécurité par ligne (RLS) activée : un utilisateur ne voit que ce que les règles l'autorisent à voir, même s'il appelle la base directement.

## Migration 0001 — Noyau (`supabase/migrations/20261127000100_noyau.sql`)

| Table | Rôle | Qui lit | Qui écrit |
|---|---|---|---|
| `profiles` | Profil de chaque compte, identifiant public `ST-…` | La personne ; l'administration | La personne (sauf identifiant et type de compte) ; création automatique à l'inscription |
| `user_roles` | Rôles attribués | La personne ; l'administration | Uniquement la fonction `decide_role_change` |
| `role_change_requests` | Demandes de changement de rôle | L'administration | `request_role_change` puis `decide_role_change` (deux personnes différentes) |
| `specializations` | Les 7 spécialités, couleurs, noms bilingues | Tout le monde | L'administration |
| `companies` | Entreprises, RCCM, statut de vérification | Les membres ; l'administration | Un compte entreprise ; la vérification par l'administration seulement |
| `company_members` | Personnes rattachées à une entreprise | Les membres ; l'administration | Automatique à la création |
| `candidate_profiles` | Dossier du candidat (spécialité, niveau, compétences, liens) | Le candidat ; l'administration ; les évaluateurs | Le candidat |
| `applications` | Candidatures, identifiant `ST-CAN-…` | Le candidat ; l'administration ; les évaluateurs | Le candidat crée un brouillon ; les statuts changent par `set_application_status` |
| `application_status_history` | Historique de chaque changement de statut | Le candidat concerné ; le personnel | Automatique |
| `consent_records` | Consentements datés et versionnés | La personne ; l'administration | La personne (ajout seulement) |
| `audit_logs` | Journal d'audit | L'administration | Les fonctions du serveur ; **impossible à modifier ou à supprimer** |
| `public_id_counters` | Compteurs des identifiants par préfixe et par année | Personne | La fonction `next_public_id` |

### Préfixes des identifiants

`TAL` talent, `REC` représentant d'entreprise, `ENT` entreprise, `APP` apprenant, `FOR` formateur, `CAN` candidature. D'autres préfixes viendront avec les migrations suivantes (`DEM` demande de service, `PAY` document de paie, `TKT` ticket).

### Fonctions principales

| Fonction | Rôle |
|---|---|
| `has_role(role)`, `is_admin()` | Vérifier un rôle côté serveur |
| `request_role_change(...)` | Préparer un changement de rôle (administrateur) |
| `decide_role_change(id, approuver)` | Approuver ou refuser (un autre super-administrateur) |
| `set_application_status(id, statut, commentaire)` | Seul moyen de changer le statut d'une candidature ; trace l'historique et l'audit |
| `profile_completion(utilisateur)` | Pourcentage de complétion du dossier |
| `public_id_is_valid(id)` | Vérifier un identifiant dicté au téléphone |

## Migrations prévues

| Migration | Contenu | Priorité |
|---|---|---|
| 0002 | Moteur d'examen : banque de questions, examens, tentatives, réponses, correction côté serveur | P0 |
| 0003 | Documents privés (CV, diplômes) et stockage | P0 |
| 0004 | Surveillance et incidents, contestations | P1 |
| 0005 | Demandes d'entreprise, devis, jalons, paiements en simulation, journal comptable | P1 |
| 0006 | Formations, sessions, présences, notes, examens blancs | P1 |
| 0007 | Avis, badges, tickets, notifications | P1 et P2 |
