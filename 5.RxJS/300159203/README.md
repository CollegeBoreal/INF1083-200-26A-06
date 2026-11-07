# TP RxJS : application de musique (NativeScript + Angular)

**Étudiant :** 300159203

## Description

Application mobile NativeScript + Angular qui permet de rechercher des chansons
avec l'API iTunes Search, d'afficher leurs paroles (API LRCLIB), de parcourir
des genres musicaux et de sauvegarder des favoris.

Le TP original utilisait une API de pays et de capitales. Je l'ai adapté à la
musique en gardant la même structure : modèle, service avec RxJS, composant et template.

## Technologies

- NativeScript + Angular
- `HttpClient` et RxJS (`Observable`, `map`, `catchError`, `timeout`)
- Template Driven Forms (`ngModel`)
- API iTunes Search : https://itunes.apple.com/search
- API LRCLIB (paroles) : https://lrclib.net

## 1. Structure du projet

Le projet NativeScript est dans le dossier `b300159203`.

<img width="637" height="763" alt="01-structure-projet" src="https://github.com/user-attachments/assets/d7002124-3b63-474e-aada-64d303d77722" />


## 2. Le modèle de données

La classe `Song` décrit une chanson : id, titre, artiste, album et pochette.

<img width="636" height="392" alt="Screenshot 2026-11-07 152939" src="https://github.com/user-attachments/assets/807358bc-7f60-4f18-b706-17ed025fdbe6" />


## 3. Le service RxJS

`searchSongByName()` retourne un `Observable<Song[]>` :

- `get()` envoie la requête HTTP à l'API iTunes.
- `map` transforme la réponse de l'API en liste de `Song`.
- `catchError` gère les erreurs.

Le service contient aussi `getLyrics()` (avec `timeout`) et la gestion des favoris.

<img width="1278" height="757" alt="Screenshot 2026-11-07 153103" src="https://github.com/user-attachments/assets/6273eed7-7587-4fa4-b5c4-47869ac3f728" />


## 4. Ajout du module HTTP

`NativeScriptHttpClientModule` dans `app.module.ts` permet d'utiliser `HttpClient`.

<img width="1280" height="360" alt="Screenshot 2026-11-07 153302" src="https://github.com/user-attachments/assets/46bfcad3-bb33-44f6-8f54-46ba04f76106" />


## 5. Activation des formulaires

`NativeScriptFormsModule` dans `search.module.ts` permet d'utiliser `[(ngModel)]`.

<img width="1280" height="343" alt="Screenshot 2026-11-07 153402" src="https://github.com/user-attachments/assets/a09a498f-8e19-4eff-9b92-4bb7ad24e1b5" />


## 6. Le composant Recherche

Le composant s'abonne à l'Observable avec `subscribe()` et reçoit les chansons
dans `next`, ou l'erreur dans `error`.

<img width="1280" height="742" alt="Screenshot 2026-11-07 153453" src="https://github.com/user-attachments/assets/4fd25f87-bea0-49bc-88d3-e1e49750689d" />


## 7. Le template Recherche

- `[(ngModel)]="term"` lie le champ texte à la propriété `term`.
- `(tap)="searchSong()"` lance la recherche.
- `ListView` affiche les résultats.

<img width="1266" height="713" alt="Screenshot 2026-11-07 153553" src="https://github.com/user-attachments/assets/20204710-d0c8-41fa-a381-e6730ac819ab" />


## 8. Correction de l'erreur JIT

Avec Angular 22, l'app restait blanche. La ligne `import '@angular/compiler'`
au début de `main.ts` règle le problème.

<img width="1280" height="443" alt="Screenshot 2026-11-07 153631" src="https://github.com/user-attachments/assets/ae1caa9b-0c29-46c8-9d72-7ff6f7fa8098" />


## 9. L'application

### Accueil : genres

<img width="344" height="721" alt="Screenshot 2026-11-07 153820" src="https://github.com/user-attachments/assets/042ec752-d92a-4449-bf1c-da43b63a22ed" />


Un appui sur un genre lance une recherche RxJS et affiche les chansons.

<img width="335" height="716" alt="Screenshot 2026-11-07 153917" src="https://github.com/user-attachments/assets/70051242-3e15-470c-9030-d53a28437286" />


### Recherche

<img width="337" height="721" alt="Screenshot 2026-11-07 153954" src="https://github.com/user-attachments/assets/663200b8-371c-4d0c-bf03-cb7b6528f1ab" />


<img width="334" height="716" alt="Screenshot 2026-11-07 154041" src="https://github.com/user-attachments/assets/b8f334fe-f9e5-4a0c-af94-3aa936a07588" />


### Détail et paroles

Un appui sur une chanson ouvre la page Détail. Les paroles sont chargées
avec une deuxième requête RxJS.

<img width="340" height="722" alt="Screenshot 2026-11-07 154239" src="https://github.com/user-attachments/assets/5e54bb0a-b8a8-465a-85ee-fd1043a0f37d" />


### Favoris

Le bouton ♡ ajoute la chanson aux favoris, sauvegardés sur l'appareil.


<img width="340" height="722" alt="Screenshot 2026-11-07 154254" src="https://github.com/user-attachments/assets/6798ec98-01b2-447f-845b-3c9456625b63" />


## Lancer le projet

```bash
cd b300159203
npm install
ns run android
```

## Difficultés rencontrées

- Fichier `webpack.config.js` manquant : généré avec `npx @nativescript/webpack init`.
- Erreur JIT d'Angular : corrigée avec `import '@angular/compiler'` dans `main.ts`.
- Composants Angular « standalone » par défaut : ajout de `standalone: false`.
