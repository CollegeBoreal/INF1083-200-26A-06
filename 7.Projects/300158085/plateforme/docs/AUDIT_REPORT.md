# Rapport d'audit — SankoTalent

**Date :** 27 novembre 2026
**Périmètre :** application mobile SankoTalent v1.3 (NativeScript), dépôt de données `kevinmayele/sankotalent-data`, dossier `plateforme/` (migration 0001).

Règle appliquée : une fonctionnalité n'est déclarée **TERMINÉ** que si son fonctionnement a été vérifié (capture d'écran sur le simulateur ou test automatisé).

## 1. Tableau de l'existant

| Fonctionnalité | État actuel | Élément manquant | Priorité | Action nécessaire |
|---|---|---|---|---|
| Application mobile à 4 onglets | TERMINÉ | — | — | Conserver ; brancher sur l'API |
| Liste des talents en ligne (cache, hors connexion, actualisation, date) | TERMINÉ | API sécurisée | P0 | Remplacer `talents.json` par l'API pour les données réelles |
| Six spécialités avec filtre (mobile) | TERMINÉ | Spécialités configurables | P0 | Lire la table `specializations` |
| Fiche talent, carte, courriel | TERMINÉ | — | — | Conserver |
| Bilinguisme français / anglais | TERMINÉ | — | — | Conserver |
| Thème sombre « terminal » | TERMINÉ (mobile) | Version web | P1 | Reprendre dans le site |
| Catalogue de formations | PARTIELLEMENT TERMINÉ | `formations.json` non publié | P2 | Publier, puis passer à la base |
| Inscription aux formations | SIMULATION UNIQUEMENT | Enregistrement serveur | P0 | Brancher sur la base |
| Candidature de formateur | À TESTER | Test à l'écran ; enregistrement serveur | P1 | Tester, puis brancher |
| Profil Mon profil (caméra, galerie, position) | PARTIELLEMENT TERMINÉ | Dossier enregistré sur le serveur | P0 | Utiliser `candidate_profiles` |
| Version Android | À TESTER | SDK Android non installé | P2 | Tester sur un émulateur |
| Rôles et permissions (9 rôles) | TERMINÉ (base de données) | Interface | P0 | Écrans de connexion et d'administration |
| Identifiants automatiques avec chiffre de contrôle | TERMINÉ (base de données) | Affichage | P0 | Afficher dans les profils et les documents |
| Changement de rôle avec double approbation | TERMINÉ (base de données) | Interface d'administration | P0 | Écran des demandes en attente |
| Candidatures et historique des statuts | TERMINÉ (base de données) | Interface | P0 | Tableau de bord du candidat |
| Vérification des entreprises | TERMINÉ (base de données) | Interface | P0 | Écran de vérification |
| Journal d'audit non modifiable | TERMINÉ (base de données) | Consultation | P0 | Écran d'administration |
| Consentements | TERMINÉ (base de données) | Textes juridiques | P0 | Rédiger les politiques, faire valider |
| Authentification (courriel, MFA) | NON IMPLÉMENTÉ | Projet Supabase | P0 | Créer le projet et configurer |
| Moteur d'examen | NON IMPLÉMENTÉ | Tout | P0 | Migration 0002 |
| Navigateur sécurisé, surveillance, incidents | NON IMPLÉMENTÉ | Tout | P1 | Après le moteur d'examen |
| Paiements (simulation) | NON IMPLÉMENTÉ | Tout | P1 | Migration dédiée, mode simulation |
| Assistant IA, tickets, notifications | NON IMPLÉMENTÉ | Tout | P1 | Après l'authentification |
| Site web | NON IMPLÉMENTÉ | Tout | P0 | Angular, après l'authentification |

« TERMINÉ (base de données) » signifie : tables, règles d'accès et fonctions écrites et vérifiées par 36 tests automatisés sur PostgreSQL 16 (voir [TESTING.md](TESTING.md)). Aucune interface n'utilise encore ces fonctions.

## 2. Risques de sécurité

| Risque | Gravité | État |
|---|---|---|
| Dépôt de l'école (CollegeBoreal) public, qui contient la plateforme | Élevée si un secret ou une donnée réelle y était ajouté | À surveiller à chaque publication : `.env` exclu par `.gitignore`, vérification `git status` avant chaque commit |
| `sankotalent-data` public | Faible (données fictives) | À surveiller : n'y publier aucune donnée réelle |
| Inscriptions stockées en clair sur le téléphone | Faible en démonstration | À corriger quand l'API existera |
| Clés Supabase | Élevée si publiées | Fichier `.env` exclu par `.gitignore` ; seul `.env.example` est publié |

## 3. Avancement vérifiable

Sur une trentaine de domaines fonctionnels décrits dans [FUNCTIONAL_REQUIREMENTS.md](FUNCTIONAL_REQUIREMENTS.md) :

- l'application mobile (section 26) est terminée à environ 80 % ;
- le socle de données P0 (rôles, profils, candidatures, entreprises, audit, consentements) est écrit et testé, sans interface ;
- l'avancement global de la plateforme est estimé à **environ 8 %**.
