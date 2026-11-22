# Assistant IA de Waypoint

L'onglet **Assistant** permet de poser des questions sur l'installation au Canada. L'assistant connaît le profil de la personne et les étapes qu'il lui reste.

## Comment ça marche

```
App (onglet Assistant)
   │  question + profil + étapes   (jeton de l'utilisateur connecté)
   ▼
Supabase · fonction « assistant »   ← la clé Gemini est cachée ici
   │
   ▼
Gemini (Google) → réponse → app
```

- **La clé de l'IA n'est jamais dans l'app.** Elle est gardée dans les secrets de Supabase.
- **Seuls les comptes connectés** peuvent utiliser l'assistant. Ça évite que n'importe qui utilise ta clé.
- **La conversation reste sur le téléphone.** Elle n'est pas enregistrée dans la base de données.

## Fichiers

| Fichier | Rôle |
|---|---|
| `supabase/functions/assistant/index.ts` | Fonction serveur : vérifie l'utilisateur, ajoute les consignes et appelle Gemini |
| `src/app/services/assistant.service.ts` | Envoie la question et garde la conversation sur le téléphone |
| `src/app/pages/assistant.component.ts` | L'écran de chat |
| `src/app/shared/barre-nav.component.ts` | Le 4e onglet « Assistant » |
| `src/app/pages/parcours.component.ts` | La carte « Une question ? » sur Mon parcours |

## Mise en ligne (à faire une seule fois)

### 1. Obtenir une clé Gemini (gratuit)

1. Va sur https://aistudio.google.com/apikey et connecte-toi avec un compte Google.
2. Clique sur **Create API key**, puis copie la clé (elle commence par `AIza…`).
3. Ne la mets jamais dans l'app et ne la publie jamais sur GitHub.

### 2. Installer la fonction sur Supabase

Dans le terminal de VS Code, à la racine du dossier `Waypoint` :

```bash
npx supabase@latest login
npx supabase@latest functions deploy assistant --project-ref edqqmzmffpvlxnljmysm --use-api
npx supabase@latest secrets set GEMINI_API_KEY=COLLE_TA_CLE_ICI --project-ref edqqmzmffpvlxnljmysm
```

- La 1re commande ouvre le navigateur pour te connecter à Supabase.
- La 2e envoie la fonction sur ton serveur.
- La 3e enregistre ta clé Gemini sur le serveur.

### 3. Tester

```bash
ns run android
```

Connecte-toi dans l'app, ouvre l'onglet **Assistant**, puis touche une suggestion.

## Changer de modèle d'IA (facultatif)

Par défaut, la fonction utilise `gemini-3.5-flash`. Pour en changer :

```bash
npx supabase@latest secrets set GEMINI_MODEL=gemini-3.5-flash-lite --project-ref edqqmzmffpvlxnljmysm
```

## Messages d'erreur fréquents

| Message dans l'app | Cause | Solution |
|---|---|---|
| « L'assistant n'est pas encore installé sur le serveur » | La fonction n'est pas déployée | Refaire l'étape 2, 2e commande |
| « … secret GEMINI_API_KEY manquant » | Clé non enregistrée | Refaire l'étape 2, 3e commande |
| « Connecte-toi pour utiliser l'assistant » | Pas connecté, ou session expirée | Se reconnecter dans l'app |
| « … beaucoup de questions » | Limite gratuite de Gemini atteinte | Attendre une minute |

Pour voir les erreurs détaillées : Supabase → **Edge Functions** → **assistant** → **Logs**.

## Vie privée (important avant la publication)

Avec l'offre **gratuite** de Gemini, Google peut utiliser les questions pour améliorer ses produits. Il faut donc :

- l'écrire dans la politique de confidentialité de l'app (Play Store et App Store la demandent) ;
- garder l'avertissement de l'écran : « Ne partage jamais ton NAS, ton numéro de passeport ou tes infos bancaires ».

Avec l'offre payante de Gemini, les questions ne sont pas utilisées par Google.

## Langue et voix

- **Premier lancement :** l'écran `pages/langue.component.ts` propose 10 langues : français, anglais, espagnol, arabe, chinois, portugais, ukrainien, tagalog, hindi et persan.
- **Dès qu'on choisit une langue,** l'assistant se présente à voix haute dans cette langue.
- **À chaque ouverture suivante,** l'assistant salue sur « Mon parcours » et dit combien d'étapes il reste. La voix se coupe dans Mon compte → Voix de l'assistant.
- **Dans le chat,** l'IA répond dans la langue choisie, et le bouton « Écouter » lit chaque réponse à voix haute.
- **La voix vient du téléphone** (`shared/voix.ts`) : elle est gratuite, ne demande aucun plugin et marche sans Internet. Si une langue n'est pas installée sur le téléphone (souvent le persan ou le tagalog), le texte s'affiche quand même. Pour ajouter la voix sur Android : Paramètres → Synthèse vocale → Installer les données vocales.
- **Pour ajouter une langue :** ajoute un bloc dans `data/langues.ts`.
- **Après une modification de la fonction serveur,** redéploie-la :
  `npx supabase@latest functions deploy assistant --project-ref edqqmzmffpvlxnljmysm --use-api`
