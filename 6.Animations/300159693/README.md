# Rapport final – TP Animations

**Cours :** INF1083 – Développement  
**Travail :** TP 6 – Animations  
**Étudiant :** 300159693  
**Projet :** NativeScript avec Angular  
**Dépôt GitHub :** INF1083-200-26A-06

## 1. Introduction

Dans ce travail pratique, j’ai réalisé un projet avec NativeScript et Angular afin de mettre en place et de tester différentes animations dans une application mobile.

L’objectif était de comprendre comment appliquer des animations à des éléments de l’interface et de vérifier leur fonctionnement dans un émulateur Android.

## 2. Réalisation du projet

J’ai créé un projet NativeScript avec Angular en utilisant le modèle Drawer Navigation.

J’ai ensuite travaillé sur les différentes pages de l’application.

### 2.1 Animation déclarative

Dans la page Home, j’ai réalisé une animation qui permet de modifier progressivement la couleur d’arrière-plan d’un bouton.

- Couleur de départ : rouge.
- Couleur d’arrivée : vert.
- Durée : 2 secondes.
- L’animation conserve son état final.

### 2.2 Animation impérative

Dans la page Browse, j’ai ajouté une animation à une image.

J’ai utilisé plusieurs propriétés :

- Opacité.
- Translation.
- Agrandissement et réduction (scale).
- Rotation.

L’animation est déclenchée en appuyant sur un bouton.

## 3. Tests et vérification
<img width="479" height="158" alt="Capture d&#39;écran 2026-11-17 194310" src="https://github.com/user-attachments/assets/7341894d-06e5-474a-bbd3-f9dd0067a485" />


J’ai lancé le projet dans l’émulateur Android afin de vérifier le fonctionnement des animations.

J’ai également vérifié que l’animation de l’image se terminait correctement. Le message « Animation finished » apparaissait dans la console.
<img width="290" height="505" alt="Capture d&#39;écran 2026-11-17 194232" src="https://github.com/user-attachments/assets/2cfe746a-c1ae-4270-9502-455aa65de22c" />


## 4. Organisation des fichiers

J’ai organisé le travail dans le dépôt GitHub selon la structure suivante :

- `6.Animations/`
  - `300159693/`
    - `README.md`
    - `b300159693/` : fichiers du projet NativeScript.


