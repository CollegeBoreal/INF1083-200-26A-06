# Waypoint

> Ta nouvelle vie, une étape à la fois.

Application mobile pour les nouveaux arrivants au Canada (et bientôt dans d'autres pays) : un parcours personnel des démarches, dans le bon ordre, un coffre pour les documents et les bons endroits près de chez soi.

Construite avec **NativeScript 9 + Angular 22**, pour Android et iOS.

---

## Fonctionnalités

| Écran | Fichier | Rôle |
|---|---|---|
| Connexion | `src/app/pages/connexion.component.ts` | Créer un compte, se connecter ou continuer sans compte |
| Bienvenue | `src/app/pages/bienvenue.component.ts` | 3 questions : pays d'origine, province + ville, statut |
| Mon parcours | `src/app/pages/parcours.component.ts` | Étapes adaptées au profil, progression, prochaine étape |
| Une étape | `src/app/pages/etape.component.ts` | Pourquoi, documents à apporter, comment, « C'est fait » |
| Mon coffre | `src/app/pages/coffre.component.ts` | Photo des documents, alerte 6 mois avant l'expiration |
| Près de moi | `src/app/pages/pres-de-moi.component.ts` | Ouvre la carte sur les bons lieux, bouton 211 |
| Vidéos | `src/app/pages/videos.component.ts` | Vidéos TikTok et YouTube par étape |
| Partager | `src/app/pages/partage.component.ts` | Image de la progression à partager (TikTok, etc.) |
| Mon compte | `src/app/pages/compte.component.ts` | Synchronisation, déconnexion, refaire les questions |

- **Hors ligne** : le parcours est inclus dans l'app (`src/app/data/parcours-canada.ts`).
- **En ligne (facultatif)** : le profil et la progression sont sauvegardés dans Supabase.
- **Vie privée** : les documents du coffre ne quittent jamais le téléphone.

## Structure

```
src/
  app.css                  styles (couleurs, cartes, boutons, animations)
  fonts/                   polices Inter + Material Icons (à ajouter, voir plus bas)
  app/
    config.ts              URL et clé publique Supabase
    models.ts              types (profil, étape, document, vidéo)
    app.routes.ts          navigation entre les écrans
    data/                  parcours par pays (données, pas de code)
    services/              profil, parcours, coffre, connexion, synchronisation
    pages/                 un fichier par écran
    shared/                logo, barre de navigation, outils (carte, TikTok, YouTube, capture)
supabase/
  schema.sql               table "progression" + règles de sécurité (RLS)
App_Resources/             nom affiché, icônes, permissions Android / iOS
```

## Lancer l'app

```powershell
npm install
ns run android
```

Il faut un téléphone Android branché (débogage USB) ou un émulateur Android Studio. iOS : `ns run ios`, sur un Mac seulement.

Après un changement d'identifiant ou de nom de dossier, supprimer `platforms` (il est recréé automatiquement) :

```powershell
Remove-Item platforms -Recurse -Force -ErrorAction SilentlyContinue
```

## Configuration

### 1. Polices

Créer le dossier `src/fonts` et y mettre :

- `MaterialIcons-Regular.ttf` : icônes (github.com/google/material-design-icons, dossier `font`)
- Inter (fonts.google.com, « Download family », dossier `static`), renommés en :
  `Inter-Regular.ttf`, `Inter-SemiBold.ttf`, `Inter-Bold.ttf`, `Inter-ExtraBold.ttf`

Sans les icônes, des carrés s'affichent à la place. Sans Inter, la police du téléphone est utilisée.

### 2. Supabase (comptes en ligne)

1. Créer un projet gratuit sur supabase.com.
2. SQL Editor → coller `supabase/schema.sql` → Run.
3. Project Settings → API → copier « Project URL » et la clé « anon public » dans `src/app/config.ts`.
4. Pour tester : Authentication → Email → désactiver « Confirm email ».

Ne jamais mettre la clé `service_role` dans l'app.

### 3. Identifiant de l'app

Dans `nativescript.config.ts`, remplacer `org.nativescript.etape` par un identifiant unique, par exemple `com.tonnom.waypoint`. Il ne peut plus changer après la publication.

## Contenu

- **Étapes** : `src/app/data/parcours-canada.ts`. Relire chaque étape et vérifier chaque lien `source` sur le site officiel avant de publier. Les durées sont des estimations.
- **Vidéos** : dans chaque étape,
  ```ts
  videos: [
    { titre: 'Mon 1er compte au Canada', auteur: '@compte', url: 'https://www.tiktok.com/@compte/video/123', plateforme: 'tiktok' },
    { titre: 'Ouvrir un compte bancaire', auteur: 'Chaîne', url: 'https://www.youtube.com/watch?v=xxxx', plateforme: 'youtube' },
  ],
  ```
- **Nouveau pays** : copier `parcours-canada.ts` (ex. `parcours-france.ts`).

## Pour plus tard (v2)

- Connexion avec Google, et Share Kit officiel de TikTok (compte développeur + petit serveur).
- Chiffrement du coffre (aujourd'hui : dossier privé de l'app, pas encore chiffré).
- Notifications locales pour les dates d'expiration.
- Questions dans sa langue (assistant).

## Publier

- **Google Play** : compte Google Play Console, puis
  `ns build android --release --aab --key-store-path waypoint.jks --key-store-password *** --key-store-alias waypoint --key-store-alias-password ***`.
  Garder le fichier `.jks` en lieu sûr : sans lui, impossible de mettre l'app à jour.
- **App Store** : Mac + Xcode + compte Apple Developer, puis `ns build ios --release --for-device`.
- Les deux stores demandent une **politique de confidentialité** (page web) : expliquer que les documents restent sur le téléphone et que seule la progression est sauvegardée en ligne.
- Vérifier que le nom « Waypoint » est libre dans les deux stores.
