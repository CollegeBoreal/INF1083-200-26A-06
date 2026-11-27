# Sécurité

## Mesures en place (vérifiées par les tests)

- Sécurité par ligne (RLS) activée sur toutes les tables : les règles d'accès s'appliquent même à un appel direct de la base.
- Rôles lus uniquement sur le serveur (`has_role`), jamais transmis par l'application ; aucun rôle sensible attribué à l'inscription.
- Principe des quatre yeux pour les rôles : préparation par un administrateur, approbation par un autre super-administrateur.
- Statuts de candidature modifiables uniquement par une fonction contrôlée ; décision finale réservée à l'administration.
- Identifiants publics attribués par le serveur, non modifiables.
- Journal d'audit en ajout seulement, protégé contre toute modification ou suppression.
- Liens externes validés (GitHub, LinkedIn, portfolio en `https://` uniquement).
- Secrets exclus du dépôt (`.gitignore`) ; seul `.env.example`, sans valeur réelle, est publié.

## Règles pour les développeurs

1. Ne jamais publier de clé, de mot de passe, de donnée de candidat ou de résultat confidentiel.
2. La clé `SUPABASE_SERVICE_ROLE_KEY` ne quitte jamais le serveur : ni dans l'application mobile, ni dans le site.
3. Toute nouvelle table active la sécurité par ligne et reçoit des tests d'isolement avant d'être utilisée.
4. Toute action sensible écrit dans le journal d'audit.
5. Les tests de sécurité doivent passer avant chaque publication.

## Signaler une faille

Écrire à support@sankoveya.com avec l'objet « Sécurité ». Ne pas publier la faille avant sa correction.
