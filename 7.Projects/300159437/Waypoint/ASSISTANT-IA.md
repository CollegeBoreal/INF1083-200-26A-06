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

## Langue, voix et traduction (tout est en ligne)

Waypoint fonctionne **en ligne seulement** : il faut un compte et Internet. Sans Internet, l'écran « Pas de connexion Internet » s'affiche.

1. **Première ouverture :** on choisit sa langue parmi 10 (français, anglais, espagnol, arabe, chinois, portugais, ukrainien, tagalog, hindi, persan).
2. **L'assistant se présente** avec une **voix d'IA** (Gemini), générée par la fonction serveur (mode `voix`).
3. **« Continuer »** fait traduire **toute l'app** par l'IA (mode `traduire`) : écrans, boutons, messages et contenu des étapes. Une barre montre la progression. Les traductions sont gardées sur le téléphone, donc c'est immédiat les fois suivantes.
4. **À chaque ouverture,** l'assistant salue à voix haute sur « Mon parcours ». On peut couper la voix dans Mon compte → Voix de l'assistant.
5. **Dans le chat,** l'IA répond dans la langue choisie, et « Écouter » lit la réponse avec la voix d'IA.

### Fichiers

| Fichier | Rôle |
|---|---|
| `src/app/i18n/i18n.ts` | `tr('texte en français')` renvoie le texte dans la langue choisie |
| `src/app/i18n/textes-ui.ts` | La liste des textes à traduire. **Si tu ajoutes un texte avec `t('…')`, ajoute-le ici.** |
| `src/app/services/traduction.service.ts` | Fait traduire en ligne ce qui manque |
| `src/app/shared/voix.ts` | Demande la voix d'IA au serveur et la joue (chaque phrase est gardée après la 1re fois) |
| `src/app/pages/langue.component.ts` | Le choix de la langue |
| `src/app/pages/hors-ligne.component.ts` | L'écran « Pas de connexion Internet » |

### Après cette mise à jour

Redéploie la fonction serveur, qui a 2 nouveaux modes (`voix` et `traduire`) :

```bash
npx supabase@latest functions deploy assistant --project-ref edqqmzmffpvlxnljmysm --use-api
```

### Réglages facultatifs (secrets Supabase)

- `GEMINI_TTS_MODEL` : modèle de voix (par défaut `gemini-3.1-flash-tts-preview`)
- `GEMINI_VOICE` : nom de la voix (par défaut `Kore` ; autres voix : `Puck`, `Charon`, `Aoede`…)

### Limites de l'offre gratuite

Gemini limite le nombre de demandes par minute et par jour, surtout pour la voix. Si la limite est atteinte, la voix ne joue pas, mais le texte s'affiche quand même. Pour une démonstration devant un public, ouvre l'app une fois avant : la voix d'accueil et les traductions seront déjà gardées sur le téléphone.
