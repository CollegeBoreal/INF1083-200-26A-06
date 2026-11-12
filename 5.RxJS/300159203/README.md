# TP RxJS : application de musique (NativeScript + Angular)

**Étudiant :** 300159203
**Cours :** INF1083
**Projet :** `b300159203`

## Description

Application mobile NativeScript + Angular qui permet de :

- rechercher des chansons avec l'API iTunes Search (Observable RxJS)
- afficher les paroles d'une chanson avec l'API LRCLIB (deuxième Observable)
- parcourir des genres musicaux (Rap, Metal, Rock, Pop, Jazz, Électro, Reggae, Classique)
- sauvegarder des chansons en favoris, conservés sur l'appareil

Le TP original utilisait une API de pays et de capitales. Je l'ai adapté à la musique
en gardant la même structure : modèle, service avec RxJS, composant et template.

## Technologies et versions

- **Template de départ :** `@nativescript/template-tab-navigation-ng` (Angular, navigation par onglets)
- NativeScript 9 (`@nativescript/core` 9.1, plateforme Android 9.1)
- Angular 22
- Webpack 5
- `HttpClient` et RxJS (`Observable`, `pipe`, `map`, `catchError`, `timeout`, `subscribe`)
- Template Driven Forms (`ngModel`, `NativeScriptFormsModule`)
- `ApplicationSettings` de NativeScript (sauvegarde des favoris)
- Test sur émulateur Android

## APIs utilisées

| API | Usage | Clé requise |
|---|---|---|
| iTunes Search : https://itunes.apple.com/search | Recherche de chansons, pochettes | Non |
| LRCLIB : https://lrclib.net | Paroles | Non |

Remarques :

- Je n'utilise pas RapidAPI : ces deux APIs sont gratuites et sans clé.
- iTunes n'a pas de vraie recherche par genre. Les cartes de l'accueil lancent une
  recherche par mots-clés (par exemple « heavy metal »), donc les résultats sont approximatifs.
- LRCLIB ne connaît pas toutes les chansons : l'app affiche « Paroles introuvables » dans ce cas.
- J'avais d'abord essayé l'API `lyrics.ovh`, mais elle ne répondait pas (chargement infini).
  Je l'ai remplacée par LRCLIB, avec un `timeout` RxJS de 10 secondes.

## Création du projet

```bash
ns create b300159203 --template @nativescript/template-tab-navigation-ng
cd b300159203
code .
```

Le template crée trois onglets (Home, Browse, Search), le routage, un `data.service.ts` et une
page `item-detail`. Ces fichiers d'origine sont restés en place. Le reste a été ajouté par-dessus.

## Structure du code

| Fichier | Rôle |
|---|---|
| `src/main.ts` | Démarrage de l'app (+ import de `@angular/compiler`) |
| `src/app/app.module.ts` | Module racine (+ `NativeScriptHttpClientModule`) |
| `src/app/app.component.html` | Les trois onglets : Accueil, Favoris, Recherche |
| `src/app/shared/song.ts` | Modèle de données `Song` |
| `src/app/shared/apicall.service.ts` | Service RxJS : recherche, paroles, favoris |
| `src/app/shared/data.service.ts` | Service d'origine du template (non utilisé par mon code) |
| `src/app/search/search.module.ts` | Module Recherche (+ `NativeScriptFormsModule`) |
| `src/app/search/search-routing.module.ts` | Routes Recherche (`default`, `detail`) |
| `src/app/search/search.component.ts/.html` | Page Recherche |
| `src/app/search/song-detail.component.ts/.html` | Page Détail : pochette, paroles, favori, retour |
| `src/app/home/home.component.ts/.html` | Accueil : cartes de genres et liste de chansons |
| `src/app/home/home-routing.module.ts` | Routes Accueil (+ route `detail`) |
| `src/app/browse/browse.component.ts/.html` | Onglet Favoris |

## Étapes de réalisation

### 1. Structure du projet

Le projet NativeScript est dans le dossier `b300159203`.

<img width="637" height="763" alt="01-structure-projet" src="https://github.com/user-attachments/assets/d7002124-3b63-474e-aada-64d303d77722" />

### 2. Le modèle de données

`src/app/shared/song.ts` : la classe `Song` (id, title, artist, album, artwork).

<img width="636" height="392" alt="Screenshot 2026-11-07 152939" src="https://github.com/user-attachments/assets/807358bc-7f60-4f18-b706-17ed025fdbe6" />

### 3. Le service RxJS

`src/app/shared/apicall.service.ts` : `searchSongByName()` retourne un `Observable<Song[]>`.

- `get()` envoie la requête HTTP à l'API iTunes.
- `map` transforme la réponse de l'API en liste de `Song`.
- `catchError` gère les erreurs.

Le service contient aussi :

- `getLyrics()` : requête vers LRCLIB, avec `timeout(10000)`
- `getFavorites()`, `isFavorite()`, `toggleFavorite()` : favoris sauvegardés avec `ApplicationSettings`
- `selectedSong` : garde la chanson choisie pour la page Détail

<img width="1278" height="757" alt="Screenshot 2026-11-07 153103" src="https://github.com/user-attachments/assets/6273eed7-7587-4fa4-b5c4-47869ac3f728" />

### 4. Ajout du module HTTP

`NativeScriptHttpClientModule` dans `app.module.ts` permet d'utiliser `HttpClient`.

<img width="1280" height="360" alt="Screenshot 2026-11-07 153302" src="https://github.com/user-attachments/assets/46bfcad3-bb33-44f6-8f54-46ba04f76106" />

### 5. Activation des formulaires

`NativeScriptFormsModule` dans `search.module.ts` permet d'utiliser `[(ngModel)]`.

<img width="1280" height="343" alt="Screenshot 2026-11-07 153402" src="https://github.com/user-attachments/assets/a09a498f-8e19-4eff-9b92-4bb7ad24e1b5" />

### 6. Le composant Recherche

Le composant s'abonne à l'Observable avec `subscribe()` : les chansons arrivent dans `next`,
l'erreur dans `error`. Il gère aussi l'indicateur de chargement et les messages
(« Aucun résultat », « Erreur »).

<img width="1280" height="742" alt="Screenshot 2026-11-07 153453" src="https://github.com/user-attachments/assets/4fd25f87-bea0-49bc-88d3-e1e49750689d" />

### 7. Le template Recherche

- `[(ngModel)]="term"` lie le champ texte à la propriété `term`.
- `(tap)="searchSong()"` lance la recherche.
- `ListView` avec `[items]="songs"` affiche les résultats.
- `(tap)="openSong(song)"` sur chaque ligne ouvre la page Détail.

<img width="1266" height="713" alt="Screenshot 2026-11-07 153553" src="https://github.com/user-attachments/assets/20204710-d0c8-41fa-a381-e6730ac819ab" />

### 8. Correction de l'erreur JIT

Avec Angular 22, l'app restait blanche. La ligne `import '@angular/compiler'` au début
de `main.ts` règle le problème.

<img width="1280" height="443" alt="Screenshot 2026-11-07 153631" src="https://github.com/user-attachments/assets/ae1caa9b-0c29-46c8-9d72-7ff6f7fa8098" />

## L'application

### Accueil : genres

La grille de genres.

<img width="344" height="721" alt="Screenshot 2026-11-07 153820" src="https://github.com/user-attachments/assets/042ec752-d92a-4449-bf1c-da43b63a22ed" />

Un appui sur un genre lance une recherche RxJS et affiche les chansons.
Un appui sur une chanson ouvre la page Détail.

<img width="335" height="716" alt="Screenshot 2026-11-07 153917" src="https://github.com/user-attachments/assets/70051242-3e15-470c-9030-d53a28437286" />

### Recherche

Avant la recherche : le champ, le bouton et le message d'accueil.

<img width="337" height="721" alt="Screenshot 2026-11-07 153954" src="https://github.com/user-attachments/assets/663200b8-371c-4d0c-bf03-cb7b6528f1ab" />

Résultats pour « jul » : la liste reçue de l'API iTunes.

<img width="334" height="716" alt="Screenshot 2026-11-07 154041" src="https://github.com/user-attachments/assets/b8f334fe-f9e5-4a0c-af94-3aa936a07588" />

### Détail et paroles

Un appui sur une chanson ouvre la page Détail : grande pochette, titre, artiste, album,
bouton favori et paroles (deuxième requête RxJS). Le bouton « ← Retour » revient à la liste.
Cette page est un composant standalone, partagé entre l'onglet Recherche et l'onglet Accueil.

<img width="340" height="722" alt="Screenshot 2026-11-07 154239" src="https://github.com/user-attachments/assets/5e54bb0a-b8a8-465a-85ee-fd1043a0f37d" />

### Favoris

Le bouton ♡ de la page Détail ajoute la chanson aux favoris. L'onglet Favoris les affiche,
et le ❤ rouge d'une ligne la retire. Les favoris restent après la fermeture de l'app.

<img width="340" height="722" alt="Screenshot 2026-11-07 154254" src="https://github.com/user-attachments/assets/6798ec98-01b2-447f-845b-3c9456625b63" />

## Lancer le projet

Prérequis : Node.js, NativeScript CLI (`npm install -g nativescript`), Android Studio avec un
émulateur démarré (ou un téléphone en mode débogage USB), et une connexion internet.

```bash
cd b300159203
npm install
ns run android
```

## Difficultés rencontrées et solutions

| Problème | Solution |
|---|---|
| `webpack.config.js does not exist` au premier lancement | `npx @nativescript/webpack init` |
| Écran blanc : « JIT compiler not available » (Angular 22) | `import '@angular/compiler'` en première ligne de `main.ts` |
| `SearchComponent is standalone, and cannot be declared in an NgModule` | Ajout de `standalone: false` dans `@Component` |
| Clic sur une chanson sans effet avec `(itemTap)` | `(tap)` sur chaque ligne et navigation `['../detail']` |
| Paroles : chargement infini avec `lyrics.ovh` | Remplacement par LRCLIB et ajout de `timeout(10000)` |
| Page Détail partagée entre Recherche et Accueil | Composant `standalone: true` et route `detail` dans chaque routage |
| Bouton retour absent de la page Détail | Bouton « ← Retour » dans la page, avec `router.back({ relativeTo })` |
| Les warnings Sass dans le terminal | Sans effet : ils viennent du thème NativeScript |

## Fichiers non versionnés

Le `.gitignore` exclut `node_modules/`, `platforms/` et `hooks/`. Ces dossiers sont recréés
par `npm install` et `ns run android`.
