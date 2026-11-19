# INF1083 — TP 6 : Animations avec NativeScript et Angular

## Informations générales

| Élément | Information |
|---|---|
| Étudiant | Riadh Sahraoui |
| Numéro étudiant | 300159203 |
| Cours | INF1083 |
| Travail pratique | TP 6 — Animations |
| Framework | NativeScript |
| Framework JavaScript | Angular |
| Langage | TypeScript |
| Plateforme cible | Android |

---

# 1. Présentation du projet

Ce travail pratique consiste à développer une application mobile avec NativeScript et Angular afin de découvrir et de mettre en pratique différents types d'animations.

L'application comprend deux pages principales :

- **Home :** présente une animation déclarative réalisée avec SCSS.
- **Browse :** présente une animation impérative réalisée avec TypeScript et déclenchée par une interaction de l'utilisateur.

L'objectif est de comprendre comment créer des animations, modifier les propriétés visuelles des éléments et rendre une application mobile plus interactive.

# 2. Environnement de développement

Les outils et technologies utilisés pour réaliser ce travail sont :

| Outil / Technologie | Utilisation |
|---|---|
| NativeScript | Développement de l'application mobile |
| Angular | Structure et gestion des composants |
| TypeScript | Programmation et logique des animations |
| HTML | Structure des interfaces |
| SCSS | Mise en forme et animations déclaratives |
| Node.js | Environnement d'exécution JavaScript |
| npm | Gestion des dépendances |
| NativeScript CLI | Création et exécution du projet |
| Android SDK | Outils de développement Android |
| Android Emulator | Test de l'application sur un appareil virtuel |
| Visual Studio Code | Édition du code source |
| PowerShell | Exécution des commandes |

### Versions utilisées

- Node.js : v24.21.0
- npm : 11.19.0
- NativeScript CLI : 9.1.1
- Émulateur Android : Pixel_6

# 3. Création du projet

Le projet a été créé à l'aide du template NativeScript Drawer Navigation avec Angular.

La commande utilisée :

```powershell
ns create b300159203 --template @nativescript/template-drawer-navigation-ng
```

Ce template fournit une structure de départ comprenant :

- Une navigation avec menu latéral (Drawer Navigation).
- Une page Home.
- Une page Browse.
- Une structure basée sur Angular.
- Les fichiers nécessaires au développement d'une application NativeScript.

Le projet initial a ensuite été personnalisé pour réaliser les animations demandées.

## Structure du projet

```text
INF1083-200-26A-06/
│
└── 6.Animations/
    │
    └── 300159203/
        │
        ├── README.md
        ├── images/
        │
        └── b300159203/
            │
            ├── src/
            │   └── app/
            │       ├── home/
            │       │   ├── home.component.html
            │       │   ├── home.component.ts
            │       │   └── home.component.scss
            │       │
            │       ├── browse/
            │       │   ├── browse.component.html
            │       │   ├── browse.component.ts
            │       │   └── browse.component.scss
            │       │
            │       ├── app-routing.module.ts
            │       └── app.component.html
            │
            ├── package.json
            └── autres fichiers du projet
```

# 4. Navigation de l'application

L'application utilise le système de navigation latérale fourni par le template NativeScript Drawer Navigation.

Le menu permet de naviguer entre les deux pages principales :

- **Home :** animation déclarative.
- **Browse :** animation impérative.

Le bouton de menu est associé à une méthode TypeScript permettant d'ouvrir le menu latéral.

La navigation entre les pages est gérée à l'aide d'Angular et des modules de routage du projet.

### Capture d'écran — Navigation

<img width="333" height="725" alt="Screenshot 2026-11-19 110042" src="https://github.com/user-attachments/assets/333cd5bd-08c5-4891-b1eb-e6c5999db2bb" />


# 5. Première partie — Animation déclarative (Home)

## 5.1 Présentation

La page Home présente une interface personnalisée avec un thème sombre, des titres, une description et un bouton affichant le numéro étudiant.

Une animation déclarative a été ajoutée au bouton à l'aide de SCSS.

L'animation modifie progressivement la couleur de fond du bouton :

- Couleur initiale : violet (`#7C3AED`).
- Couleur finale : bleu (`#2563EB`).
- Durée : 2 secondes.

## 5.2 Fonctionnement technique

L'animation est définie dans le fichier :

`src/app/home/home.component.scss`

Elle utilise les propriétés suivantes :

| Propriété | Rôle |
|---|---|
| `@keyframes` | Définit les étapes de l'animation |
| `animation-name` | Indique le nom de l'animation |
| `animation-duration` | Définit la durée |
| `animation-fill-mode` | Conserve l'état final de l'animation |

Le nom de l'animation créée est `bgAnimation`.

Le bouton utilise directement cette animation dans son style SCSS.

## 5.3 Résultat

Lors de l'affichage de la page Home, le bouton passe progressivement du violet au bleu.

### Captures d'écran

**Capture — Page Home**

<img width="332" height="717" alt="Screenshot 2026-11-19 110028" src="https://github.com/user-attachments/assets/77b98006-f5a6-4382-b3ad-e36b4f66e1da" />

**Capture — Code de l'animation déclarative**

# 6. Deuxième partie — Animation impérative (Browse)

## 6.1 Présentation

La page Browse présente une interface personnalisée avec une étoile au centre de l'écran et un bouton intitulé **START ANIMATION**.

Contrairement à la première animation, celle-ci est déclenchée par une interaction de l'utilisateur.

Lorsque l'utilisateur appuie sur le bouton, une animation est exécutée sur l'étoile.

## 6.2 Fonctionnement technique

L'animation est programmée dans le fichier :

`src/app/browse/browse.component.ts`

La méthode utilisée est :

`animate(view: View): void`

Elle reçoit l'élément à animer et utilise la méthode NativeScript `view.animate()`.

Les différentes étapes sont exécutées dans l'ordre grâce aux promesses `.then()`.

Les transformations réalisées sont :

1. **Opacité :** l'étoile devient progressivement transparente (`opacity: 0.2`).
2. **Retour de l'opacité :** l'étoile redevient complètement visible (`opacity: 1`).
3. **Agrandissement :** l'étoile augmente de taille (`scale: 2`).
4. **Retour à la taille initiale :** l'étoile retrouve sa taille normale (`scale: 1`).
5. **Rotation :** l'étoile effectue une rotation de 360 degrés.
6. **Retour à la position initiale :** l'étoile revient à sa rotation de départ.

La méthode utilise également un bloc `.catch()` pour intercepter les éventuelles erreurs pendant l'exécution de l'animation.

## 6.3 Déclenchement de l'animation

Dans le fichier `browse.component.html`, le bouton utilise l'événement tactile `(tap)`.

Cet événement appelle la méthode `animate()` et lui transmet l'élément à animer.

L'utilisateur peut donc lancer l'animation directement depuis l'interface.

## 6.4 Résultat

Après avoir appuyé sur le bouton START ANIMATION, l'étoile change d'opacité, s'agrandit et effectue une rotation avant de revenir à son état initial.

### Captures d'écran

**Capture — Page Browse**

<img width="329" height="716" alt="Screenshot 2026-11-19 110107" src="https://github.com/user-attachments/assets/b1869f47-39cc-493c-803b-67cf08a91dc6" />


**Capture — Étoile pendant l'animation**

<img width="338" height="721" alt="Screenshot 2026-11-19 110133" src="https://github.com/user-attachments/assets/dba9bd9b-194d-4665-a976-27231840f856" />




# 7. Exécution de l'application

L'application a été exécutée sur un émulateur Android à l'aide de NativeScript CLI.

Les étapes utilisées pour lancer le projet sont les suivantes.

### 7.1 Accéder au dossier du projet

```powershell
cd b300159203
```

### 7.2 Installer les dépendances

```powershell
npm install
```

### 7.3 Lancer l'application sur Android

```powershell
ns run android
```

L'application peut ensuite être utilisée sur l'émulateur Android.

# 8. Tests et vérifications

Les vérifications suivantes ont été effectuées :

- Affichage correct de la page Home.
- Fonctionnement de l'animation déclarative du bouton.
- Affichage correct de la page Browse.
- Fonctionnement du bouton START ANIMATION.
- Modification de l'opacité de l'étoile.
- Agrandissement et réduction de l'étoile.
- Rotation de l'étoile.
- Navigation entre les différentes pages.

# 9. Conclusion

Ce travail pratique m'a permis de découvrir et de mettre en pratique les animations dans une application mobile développée avec NativeScript et Angular.

J'ai appris à utiliser deux approches différentes :

- Les animations déclaratives avec SCSS et les règles `@keyframes`.
- Les animations impératives avec TypeScript et la méthode `animate()` de NativeScript.

J'ai également pratiqué la gestion des événements tactiles, la navigation entre les composants Angular et l'exécution d'une application sur un émulateur Android.

Ce projet m'a permis de mieux comprendre comment rendre une interface mobile plus interactive et dynamique.

---

**Fin du TP 6 — Animations**

**Riadh Sahraoui — 300159203**
