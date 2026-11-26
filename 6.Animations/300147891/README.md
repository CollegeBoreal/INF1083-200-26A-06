# 🤡 Laboratoire 6 – Animations

## Informations générales

- **Cours :** INF1083
- **Établissement :** Collège Boréal
- **Numéro étudiant :** 300147891
- **Projet :** b300147891-animations

## 1. Objectif du laboratoire

L'objectif de ce laboratoire est de comprendre et de mettre
en pratique deux types d'animations dans une application
mobile NativeScript avec Angular :

- Animation déclarative (CSS).
- Animation impérative (TypeScript).

## 2. Création du projet

J'ai créé un projet NativeScript avec un menu de navigation
latéral en utilisant les commandes suivantes :

```powershell
ns create b300147891-animations --template @nativescript/template-drawer-navigation-ng
cd b300147891-animations
code .
```
<img width="1892" height="561" alt="Capture d&#39;écran 2026-11-26 092114" src="https://github.com/user-attachments/assets/451a54ef-fa04-4d35-8a6e-08380ae68409" />

## 3. Animation déclarative (CSS)

Dans le composant Home, j'ai remplacé le Label par un bouton
et créé le fichier home.component.scss.

### Code SCSS

```scss
@keyframes bgAnimation {
    from { background-color: red; }
    to { background-color: green; }
}

.background {
    animation-name: bgAnimation;
    animation-duration: 2s;
    animation-fill-mode: forwards;
}
```

J'ai ensuite relié le fichier SCSS au composant Home
en ajoutant la propriété suivante :

```typescript
styleUrls: ['./home.component.scss']
```

### Résultat obtenu

Le bouton change de couleur du rouge au vert pendant
deux secondes et conserve sa couleur finale.

![Animation <img width="480" height="911" alt="Capture d&#39;écran 2026-11-26 095650" src="https://github.com/user-attachments/assets/31f0b0f6-bf3a-44f7-846e-b431891d691e" />
s/home.png)

## 4. Animation impérative (TypeScript)

Dans le composant Browse, j'ai ajouté une image et un bouton
Animate permettant de déclencher une série d'animations.

### Types d'animations

| Animation | Description |
|---|---|
| Opacity | Disparition et réapparition du logo |
| Translate | Déplacement du logo |
| Scale | Agrandissement et réduction du logo |
| Rotate | Rotation du logo |

Chaque animation dure 300 millisecondes.

La méthode then() permet d'enchaîner les animations
et catch() permet de gérer les erreurs.

### Interface de l'application

![Interface Browse] <img width="475" height="912" alt="Capture d&#39;écran 2026-11-26 095935" src="https://github.com/user-attachments/assets/1cd80640-f6e0-41d2-aa6b-c0e3e57714aa" />


### Agrandissement du logo

![Animation Scale]<img width="256" height="593" alt="Capture d&#39;écran 2026-11-26 101617" src="https://github.com/user-attachments/assets/146f3284-56c6-46d1-a09b-dca1a4a488c5" />


### Vérification dans le terminal

À la fin de la séquence, le message Animation finished
s'affiche dans le terminal.

![Confirmation] <img width="871" height="217" alt="Capture d&#39;écran 2026-11-26 101124" src="https://github.com/user-attachments/assets/c6e0635e-1b5b-48e6-9446-d318ec2819e4" />


## 5. Difficultés rencontrées et solutions

### Problème de configuration Android SDK

NativeScript ne détectait pas le SDK Android.

J'ai configuré les variables d'environnement dans PowerShell :

```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:Path += ";$env:ANDROID_HOME\platform-tools"
```

### Erreur TypeScript TS2345

Angular considérait la référence cible comme un HTMLElement
au lieu d'un objet View de NativeScript.

J'ai corrigé cette erreur en utilisant $any() dans le template.

```html
<Button text="Animate"
        (tap)="animate($any(cible))"
        class="btn btn-primary btn-active">
</Button>
```

### Problème d'affichage de l'image

L'image res://icon ne s'affichait pas.

Après avoir vérifié les ressources Android dans
App_Resources/Android/src/main/res/drawable-mdpi,
j'ai trouvé le fichier logo.png.

J'ai donc remplacé res://icon par res://logo.

## 6. Principaux fichiers modifiés

| Fichier | Rôle |
|---|---|
| home.component.html | Création du bouton |
| home.component.scss | Animation CSS |
| home.component.ts | Liaison du fichier SCSS |
| browse.component.html | Interface de l'animation |
| browse.component.ts | Programmation des animations |

## 7. Installation et exécution

Le code source est disponible dans ce dépôt.

### Prérequis

- Node.js et npm
- NativeScript CLI
- Android Studio et Android SDK
- JDK
- Émulateur Android

### Installation des dépendances

Depuis le dossier contenant package.json :

```powershell
npm install
```

### Vérification de l'environnement

```powershell
ns doctor android
```

### Exécution de l'application

```powershell
ns run android
```

## 8. Résultats des tests

| Test | Résultat |
|---|---|
| Démarrage de l'application | Réussi |
| Animation CSS | Réussi |
| Affichage du logo | Réussi |
| Animation impérative | Réussi |
| Message Animation finished | Réussi |

## 9. Conclusion

Ce laboratoire m'a permis de comprendre la différence
entre une animation déclarative et une animation impérative.

J'ai appris à utiliser les animations CSS, à enchaîner
plusieurs animations avec TypeScript et à résoudre des
problèmes de compilation et d'affichage.

L'application a été compilée et testée avec succès
sur un émulateur Android.
