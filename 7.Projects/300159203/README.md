# 🎵 RSlyricsBox

**Étudiant :** 300159203
**Cours :** INF1083
**Projet mobile :** application NativeScript + Angular (Android)
**Dossier du projet :** `b300159203`

---

## 📝 Résumé du projet

**RSlyricsBox** est une application mobile de musique. Elle permet de :

- **explorer** la musique par genres (Rap, Metal, Rock, Pop, Jazz, Électro, Reggae, Classique)
- **rechercher** une chanson ou un artiste
- **lire les paroles** d'une chanson
- **écouter un extrait de 30 secondes**
- **sauvegarder** ses chansons préférées dans une liste de favoris

Les chansons, les pochettes et les extraits audio viennent de l'API iTunes Search. Les paroles
viennent de l'API LRCLIB. Les deux sont gratuites et sans clé.

Cette application est une évolution du TP RxJS : le service qui appelle les API est le même, et
j'y ai ajouté les genres, les paroles, l'extrait audio, les favoris et les animations.

## 🏷️ Nom de l'application

**RSlyricsBox**, affiché dans la barre de titre de la page d'accueil.

Le nom technique du projet (`b300159203`, identifiant `org.nativescript.b300159203`) vient de
mon numéro étudiant.

---

## 🎨 Design

L'application a 3 onglets en bas de l'écran, et une page de détail qui s'ouvre quand on touche
une chanson.

```
┌─────────────────────────────┐
│  RSlyricsBox                │   Accueil : grille de genres
│  Explorer par genre         │   → toucher un genre : liste de chansons
│  [ Rap  ] [ Metal ]         │   → toucher une chanson : Détail
│  [ Rock ] [ Pop   ]         │
│  ...                        │
├─────────────────────────────┤
│ Accueil │ Favoris │ Recherche│
└─────────────────────────────┘
```



---

## 📱 Les pages de l'application

L'application a **3 onglets** et **1 page de détail**, soit 4 pages au total.

### 1. Accueil (onglet 1)

La grille de genres. Un appui sur un genre affiche une liste de chansons de ce genre, avec un
bouton « Genres » pour revenir. Un appui sur une chanson ouvre la page Détail.

<img width="338" height="719" alt="Screenshot 2026-11-20 033350" src="https://github.com/user-attachments/assets/0f8c0e8c-e529-4333-98cd-258b84c8bd61" />


### 2. Recherche (onglet 3)

Un champ texte et un bouton. Le texte tapé est lié à la propriété `term` avec `[(ngModel)]`, et
la recherche est faite par un Observable RxJS. Les résultats s'affichent avec la pochette, le
titre, l'artiste et l'album.

<img width="338" height="721" alt="Screenshot 2026-11-20 034818" src="https://github.com/user-attachments/assets/3fa3a52c-5fbe-42ee-a88a-3849f73d9f76" />


### 3. Détail d'une chanson

Ouverte depuis l'Accueil, la Recherche ou les Favoris. Elle affiche la grande pochette, le
titre, l'artiste, l'album, le bouton **▶ Écouter l'extrait**, le bouton **♡ Ajouter aux
favoris** et les **paroles** (deuxième requête RxJS).

<img width="328" height="724" alt="Screenshot 2026-11-20 034849" src="https://github.com/user-attachments/assets/98be8f34-4078-4042-8ea0-573de9fc48b0" />


### 4. Favoris (onglet 2)

La liste des chansons ajoutées en favoris. Elles sont sauvegardées sur l'appareil avec
`ApplicationSettings`, donc elles restent après la fermeture de l'application. Un appui sur le
❤ rouge retire une chanson, et un appui sur la chanson ouvre la page Détail.

<img width="329" height="722" alt="Screenshot 2026-11-20 034918" src="https://github.com/user-attachments/assets/f1f10888-d808-4d5a-bc41-98701211033f" />


---

## ✨ Animations

Les animations utilisent l'API `view.animate()` de NativeScript. Elles n'ont pas besoin de plugin.

| Animation | Où | Effet |
|---|---|---|
| Apparition des genres | Accueil | Les 8 cartes montent l'une après l'autre avec un fondu |
| Transition entre onglets | Accueil, Favoris, Recherche | Effet visible quand on change d'onglet |
| Pochette | Détail | Zoom et fondu à l'ouverture |
| Titre, artiste, album | Détail | Glissement vers le haut avec un fondu |
| Bouton favori | Détail | Petite pulsation quand on l'appuie |

<img width="692" height="1452" alt="Recording 2026-11-20 033539" src="https://github.com/user-attachments/assets/23b8b50f-9eec-4f7a-bb48-fabdf57bd0e0" />


<img width="692" height="1450" alt="Recording 2026-11-20 033807" src="https://github.com/user-attachments/assets/340f82de-8bd2-4b67-82d3-fc94309e81f7" />



<img width="680" height="1442" alt="Recording 2026-11-20 034234" src="https://github.com/user-attachments/assets/54d66b86-dc25-4126-bd45-40ca7ec0c9c4" />


---

## 🔊 Extrait audio (plugin)

Le bouton **▶ Écouter l'extrait (30 s)** de la page Détail joue l'extrait fourni par iTunes
(`previewUrl`), avec le plugin `@nativescript-community/audio`. Un second appui met l'extrait
en pause (**⏸ Pause**).

<img width="678" height="1452" alt="Recording 2026-11-20 034523" src="https://github.com/user-attachments/assets/b7ed5585-4462-4272-9ba9-c3e153593354" />


---

## 🧩 Templates utilisés

| Template | Usage |
|---|---|
| `@nativescript/template-tab-navigation-ng` | Template de départ : NativeScript + Angular avec navigation par onglets |

Création du projet :

```bash
ns create b300159203 --template @nativescript/template-tab-navigation-ng
```

Ce template fournit les 3 onglets, le routage Angular et un service de données d'exemple
(`data.service.ts`). J'ai gardé les onglets et leur routage, et remplacé le contenu des pages.

## 🔌 Plugins utilisés

| Plugin | Usage | Installation |
|---|---|---|
| `@nativescript-community/audio` | Lire l'extrait audio de 30 secondes | `ns plugin add @nativescript-community/audio` |

Le plugin est disponible sur le marché NativeScript : https://market.nativescript.org

<img width="646" height="541" alt="Screenshot 2026-11-20 035035" src="https://github.com/user-attachments/assets/8ed7e782-03b2-49ca-8966-ac395c75d118" />


**Modules du cœur de NativeScript utilisés (sans plugin) :**

- `ApplicationSettings` : sauvegarde des favoris
- `view.animate()` : animations
- `NativeScriptHttpClientModule` : requêtes HTTP
- `NativeScriptFormsModule` : formulaires (`ngModel`)

---

## 🛠️ Technologies

- NativeScript 9 (`@nativescript/core` 9.1, plateforme Android 9.1)
- Angular 22, Webpack 5
- RxJS : `Observable`, `pipe`, `map`, `catchError`, `timeout`, `subscribe`
- API iTunes Search : https://itunes.apple.com/search
- API LRCLIB (paroles) : https://lrclib.net
- Testé sur émulateur Android

## 🌐 APIs

| API | Usage | Clé |
|---|---|---|
| iTunes Search | Chansons, pochettes, extraits audio | Non |
| LRCLIB | Paroles | Non |

Limites connues :

- iTunes n'a pas de recherche par genre : les cartes de l'Accueil lancent une recherche par
  mots-clés (par exemple « heavy metal »), donc les résultats sont approximatifs.
- LRCLIB ne connaît pas toutes les chansons : l'application affiche alors « Paroles introuvables ».
- Les extraits durent 30 secondes, c'est la limite fixée par iTunes.
- L'application n'a été testée que sur Android.

---

## 🗂️ Structure du code

| Fichier | Rôle |
|---|---|
| `src/main.ts` | Démarrage de l'application |
| `src/app/app.component.html` | Les 3 onglets : Accueil, Favoris, Recherche |
| `src/app/shared/song.ts` | Modèle de données `Song` |
| `src/app/shared/apicall.service.ts` | Service RxJS : recherche, paroles, favoris |
| `src/app/home/` | Page Accueil : genres et liste de chansons |
| `src/app/search/search.component.*` | Page Recherche |
| `src/app/search/song-detail.component.*` | Page Détail : paroles, extrait audio, favori, animations |
| `src/app/browse/` | Page Favoris |

## 🔁 RxJS dans le projet

Le service retourne des `Observable` que les composants lisent avec `subscribe()` :

```typescript
searchSongByName(term: string): Observable<Song[]> {
  return this.httpClient
    .get<any>('https://itunes.apple.com/search?entity=song&limit=20&term=' + encodeURIComponent(term))
    .pipe(
      map((data: any) => data.results.map((s: any) => ({ /* ... */ } as Song))),
      catchError(() => throwError(() => 'Song not found!'))
    );
}
```

- `map` transforme la réponse de l'API en liste de `Song`.
- `catchError` gère les erreurs.
- `timeout(10000)` limite l'attente des paroles à 10 secondes.

---

## ▶️ Lancer le projet

Prérequis : Node.js, NativeScript CLI (`npm install -g nativescript`), Android Studio avec un
émulateur démarré (ou un téléphone en mode débogage USB), et une connexion internet.

```bash
cd b300159203
npm install
ns run android
```

Après l'installation d'un plugin natif, il faut relancer `ns run android` (un simple
rechargement ne suffit pas).

## 🧯 Difficultés rencontrées et solutions

| Problème | Solution |
|---|---|
| Écran blanc : « JIT compiler not available » (Angular 22) | `import '@angular/compiler'` en première ligne de `main.ts` |
| `Component is standalone, and cannot be declared in an NgModule` | `standalone: false` dans `@Component` |
| Clic sur une chanson sans effet avec `(itemTap)` | `(tap)` sur chaque ligne et navigation vers `['../detail']` |
| La page Détail devait servir à plusieurs onglets | Composant `standalone: true` et une route `detail` dans le routage de chaque onglet |
| Favoris non cliquables | Ajout de la route `detail` et de `openSong()` dans l'onglet Favoris |
| `Argument of type 'Event' is not assignable to 'EventData'` | Paramètre typé `any` dans les méthodes liées à `(loaded)` |
| Cartes animées toutes en même temps (index à `-1`) | Passer le genre à la méthode et retrouver son index avec `indexOf` |
| Paroles : chargement infini avec `lyrics.ovh` | Remplacement par LRCLIB et `timeout(10000)` |
| Les warnings Sass dans le terminal | Sans effet : ils viennent du thème NativeScript |

## 📁 Fichiers non versionnés

Le `.gitignore` exclut `node_modules/`, `platforms/` et `hooks/`. Ces dossiers sont recréés par
`npm install` et `ns run android`.
