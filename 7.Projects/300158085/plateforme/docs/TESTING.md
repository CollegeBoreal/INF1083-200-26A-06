# Tests

## Tests de sécurité de la base de données

Le fichier `supabase/tests/01_tests_noyau.sql` contient **36 tests**. La plupart simulent une attaque et vérifient qu'elle est bloquée.

| Groupe | Ce qui est vérifié |
|---|---|
| Identifiants | Format `ST-XXX-AAAA-NNNNNN-C`, chiffre de contrôle, détection d'une faute de frappe, identifiant imposé par le serveur |
| Isolement | Un candidat ne voit ni le profil, ni la candidature, ni l'historique, ni la complétion du dossier d'un autre |
| Élévation de privilèges | Impossible de se donner un rôle, même par les métadonnées d'inscription ; impossible de demander un rôle d'administration sans l'être |
| Candidatures | Impossible de se déclarer admis ; une seule candidature active par spécialité ; seul l'administrateur prend la décision finale |
| Quatre yeux | L'auteur d'une demande de rôle ne peut pas l'approuver ; une demande traitée ne peut pas l'être deux fois |
| Entreprises | Une entreprise ne peut pas se déclarer vérifiée ; un candidat ne peut pas créer d'entreprise |
| Audit | Le journal ne peut être ni modifié ni effacé, même par le propriétaire de la base |
| Validation | Un lien GitHub piégé (`javascript:`) est refusé |

### Lancer les tests

Il faut un serveur PostgreSQL de test (version 15 ou plus), **jamais celui de production**. Sur Mac : `brew install postgresql@16`, puis `brew services start postgresql@16`.

```bash
PGHOST=localhost PGPORT=5432 PGUSER=$(whoami) ./supabase/tests/lancer-tests.sh
```

La dernière ligne doit être `=== Tous les tests sont passés ===`.

### Résultat de référence

Le 27 novembre 2026, sur PostgreSQL 16.15 : **36 tests réussis sur 36.**
