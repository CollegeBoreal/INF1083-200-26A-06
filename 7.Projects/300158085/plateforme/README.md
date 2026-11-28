# SankoTalent — Plateforme (serveur et documentation)

**SANKOVEYA Technologies** · Plateforme d'identification, d'évaluation, de formation et de mise en relation des talents informatiques en République démocratique du Congo.

Ce dossier fait partie du projet INF1083 de Kevin Mayele (300158085). Il prolonge l'application mobile [SankoTalent](../README.md) avec la partie serveur : base de données, sécurité et documentation de la plateforme complète.

> **Dossier public.** Il ne doit jamais contenir de clé secrète, de mot de passe ni de donnée réelle de candidat. Les secrets vont dans un fichier `.env`, exclu par `.gitignore`.

## État actuel

| Élément | État |
|---|---|
| Documentation complète (54 sections) | ✓ |
| Base de données : noyau P0 (rôles, profils, candidatures, entreprises, consentements, audit) | ✓ écrite et testée (36 tests) |
| Authentification Supabase | À configurer |
| Site web (Angular) | À venir |
| Application mobile | Version 1.3 dans le dossier `../sankotalent` ; sera reliée à cette plateforme |

Le détail est dans [docs/AUDIT_REPORT.md](docs/AUDIT_REPORT.md).

## Structure

```
plateforme/
├── docs/                    Documentation
├── supabase/
│   ├── migrations/          Schéma de la base, migration par migration
│   └── tests/               Tests de sécurité de la base
├── web/                     Site web (à venir)
├── .env.example             Modèle de configuration, sans secret
└── CHANGELOG.md
```

## Documentation

| Document | Contenu |
|---|---|
| [FUNCTIONAL_REQUIREMENTS.md](docs/FUNCTIONAL_REQUIREMENTS.md) | Les 54 sections : ce que la plateforme doit faire |
| [AUDIT_REPORT.md](docs/AUDIT_REPORT.md) | Ce qui existe, ce qui fonctionne, ce qui manque |
| [ROADMAP.md](docs/ROADMAP.md) | Calendrier jusqu'au lancement d'avril 2027 |
| [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) | Tables, règles d'accès et fonctions |
| [SECURITY.md](docs/SECURITY.md) | Mesures de sécurité et règles de développement |
| [TESTING.md](docs/TESTING.md) | Lancer et lire les tests |

Les autres documents prévus à la section 32 (API, moteur d'examen, surveillance, anti-triche, entretiens, laboratoires, confidentialité, déploiement) seront écrits avec les fonctionnalités qu'ils décrivent, pour toujours refléter le fonctionnement réel.

## Contacts

contact@sankoveya.com · business@sankoveya.com · support@sankoveya.com
