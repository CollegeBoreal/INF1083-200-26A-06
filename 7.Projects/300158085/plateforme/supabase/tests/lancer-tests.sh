#!/usr/bin/env bash
# Lance les migrations et les tests de sécurité sur une base PostgreSQL de TEST vide.
# La connexion se règle avec les variables habituelles : PGHOST, PGPORT, PGUSER, PGPASSWORD.
# Exemple : PGHOST=localhost PGPORT=5432 PGUSER=postgres ./supabase/tests/lancer-tests.sh
# La base « st_test » est supprimée puis recréée : n'utilisez JAMAIS un serveur de production.
set -euo pipefail
DIR="$(cd "$(dirname "$0")/.." && pwd)"
psql -d postgres -q -c "drop database if exists st_test" -c "create database st_test" 2>/dev/null
psql -d st_test -q -v ON_ERROR_STOP=1 -f "$DIR/tests/00_stub_auth_supabase.sql"
for f in "$DIR"/migrations/*.sql; do psql -d st_test -q -v ON_ERROR_STOP=1 -f "$f"; done
psql -d st_test -q -v ON_ERROR_STOP=1 -f "$DIR/tests/01_tests_noyau.sql" 2>&1 \
  | sed 's/^psql:[^ ]* NOTICE:  //' | grep -E '^(OK|--- |===)|ERROR|ÉCHEC'
