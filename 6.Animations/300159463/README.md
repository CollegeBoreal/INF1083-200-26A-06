# TP 6 – Animations avec NativeScript Angular

**Matricule : 300159463**

## Objectif du TP

L'objectif de ce travail pratique est de découvrir et de mettre en pratique les deux types d'animations dans NativeScript Angular : les animations déclaratives et les animations impératives.

## 1. Animation déclarative

### 1.1. Modification du fichier home.component.html

J'ai ajouté un bouton NativeScript avec la classe `background` pour appliquer une animation CSS.

![Modification HTML](images/Capture%20d’écran%202026-11-26%20100821.png)

### 1.2. Création du fichier home.component.scss

J'ai créé une animation avec `@keyframes` permettant de changer la couleur du bouton du rouge au vert pendant deux secondes.

![Animation CSS](images/Capture%20d’écran%202026-11-26%20102522.png)

### 1.3. Configuration du fichier home.component.ts

J'ai ajouté la propriété `styleUrls` pour associer le fichier SCSS au composant Home. L'erreur de syntaxe visible pendant cette étape a ensuite été corrigée.

![Configuration Home](images/Capture%20d’écran%202026-11-26%20102734.png)

## 2. Animation impérative

### 2.1. Modification du fichier browse.component.html

J'ai créé une zone d'animation contenant une image cible et un bouton Animate pour déclencher l'animation.

![Interface Browse](images/Capture%20d’écran%202026-11-26%20102925.png)

### 2.2. Importation de la classe View

J'ai importé la classe `View` depuis NativeScript pour pouvoir animer les éléments graphiques de l'application.

![Importation View](images/Capture%20d’écran%202026-11-26%20103153.png)

### 2.3. Création de la méthode animate()

J'ai programmé une succession d'animations en TypeScript :

- Modification de l'opacité.
- Déplacement de l'image.
- Retour à la position initiale.
- Agrandissement de l'image.
- Retour à la taille initiale.
- Rotation de l'image.

![Méthode animate](images/Capture%20d’écran%202026-11-26%20103334%281%29.png)

## 3. Exécution de l'application sur Android

### 3.1. Menu de navigation

Le menu latéral permet de naviguer entre les différentes pages de l'application.

![Menu de navigation](images/Capture%20d’écran%202026-11-26%20110744.png)

### 3.2. Résultat de l'animation déclarative

Sur la page Home, le bouton change de couleur du rouge au vert pendant deux secondes.

![Résultat Home](images/Capture%20d’écran%202026-11-26%20110756.png)

### 3.3. Interface de l'animation impérative

Sur la page Browse, le bouton Animate permet de déclencher la méthode d'animation programmée en TypeScript. La zone bleue est affichée, mais l'image cible n'est pas visible sur cette capture.

![Résultat Browse](images/Capture%20d’écran%202026-11-26%20111232%281%29.png)

## 4. Technologies utilisées

- NativeScript
- Angular
- TypeScript
- HTML
- SCSS
- Android Studio
- Visual Studio Code
- Git et GitHub

## Conclusion

Ce travail pratique m'a permis de comprendre la différence entre les animations déclaratives et les animations impératives dans NativeScript Angular.

J'ai appris à créer des animations avec CSS et TypeScript, à exécuter une application sur un émulateur Android et à publier mon projet sur GitHub.
