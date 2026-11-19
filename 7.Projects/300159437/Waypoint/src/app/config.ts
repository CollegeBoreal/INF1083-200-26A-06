/*
 * Connexion à Supabase (base de données en ligne).
 * Remplace ces deux valeurs par celles de TON projet :
 * Supabase → Project Settings → API → "Project URL" et "anon public key".
 *
 * La clé "anon" peut être dans l'app : elle est publique par conception.
 * Ce qui protège les données, ce sont les règles RLS du fichier supabase/schema.sql.
 * Ne mets JAMAIS la clé "service_role" dans l'app.
 */
export const SUPABASE_URL = 'https://edqqmzmffpvlxnljmysm.supabase.co';
export const SUPABASE_ANON_KEY = 'COLLE_ICI_TA_CLE_ANON';

export function supabaseConfigure(): boolean {
  return !SUPABASE_URL.includes('TON-PROJET') && !SUPABASE_ANON_KEY.includes('COLLE_ICI');
}
