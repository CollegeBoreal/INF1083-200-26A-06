# Rapport de laboratoire — TP 4.Forms

**Cours :** INF1083-200 — Développement d'applications  
**Établissement :** Collège Boréal  
**Étudiant :** Hammiche Billal  
**Numéro étudiant :** 300159887  
**Projet :** B300159887  
**Date :** 12 novembre 2026  
**Technologies :** NativeScript, Angular, TypeScript, Android et GitHub

---

## 1. Introduction

Dans le cadre du cours INF1083-200 — Développement d'applications, ce laboratoire consiste à développer un formulaire interactif à l'aide de NativeScript Angular.

Le travail porte sur l'utilisation des formulaires réactifs (*ReactiveForms*) d'Angular afin de récupérer les informations saisies par un utilisateur et de les afficher dans la console de développement.

L'application a été créée, configurée et exécutée sur un émulateur Android.

## 2. Objectifs du laboratoire

Les objectifs principaux sont :

- Créer une application NativeScript Angular.
- Utiliser les formulaires réactifs avec `FormBuilder`, `FormGroup` et `Validators`.
- Créer deux champs de saisie : Email et Username.
- Ajouter un bouton permettant de récupérer les données.
- Afficher les informations saisies dans la console.
- Vérifier le fonctionnement sur un émulateur Android.
- Publier le projet sur GitHub.

## 3. Environnement de développement

| Outil | Utilisation |
|---|---|
| Visual Studio Code | Édition du code source |
| NativeScript | Développement de l'application mobile |
| Angular | Gestion des composants et des formulaires |
| TypeScript | Programmation de la logique |
| Android Emulator | Exécution et vérification |
| PowerShell | Exécution des commandes |
| Git et GitHub | Gestion et publication du projet |

## 4. Réalisation du laboratoire

### Étape 1 — Création du projet

Le projet a été créé avec le modèle Angular de NativeScript.

**Commande utilisée :**

`ns create B300159887 --template @nativescript/template-blank-ng`

Cette commande génère la structure de base de l'application, notamment les dossiers `src`, `App_Resources` et les fichiers de configuration.

**Résultat :** le terminal a confirmé la création du projet `B300159887`.

### Étape 2 — Création de l'interface utilisateur

Le fichier `home.component.html` a été modifié pour créer un formulaire comprenant deux champs et un bouton.

Le composant `StackLayout` organise les éléments verticalement.

Le champ Email permet la saisie d'une adresse courriel et le champ Username permet la saisie d'un nom d'utilisateur.

Le bouton `sign up` déclenche la méthode `onButtonTap()`.

<img width="499" height="615" alt="Capture d’écran 2026-11-12 105636" src="https://github.com/user-attachments/assets/ca54b783-f497-40f3-b954-b584e99c57ad" />

### Étape 3 — Configuration du formulaire réactif

Le fichier `home.component.ts` contient la logique du formulaire.

Les éléments utilisés sont :

- `FormBuilder` : création du formulaire.
- `FormGroup` : regroupement des champs.
- `Validators.required` : déclaration des champs obligatoires.
- `ngOnInit()` : initialisation du formulaire.
- `onButtonTap()` : récupération et affichage des valeurs.

Le formulaire a été initialisé avec deux propriétés, `email` et `username`.

La méthode `onButtonTap()` utilise `console.log()` et `JSON.stringify()` pour afficher les valeurs dans la console.

### Étape 4 — Exécution sur Android

L'application a été exécutée avec la commande :

`ns run android`

NativeScript a compilé et installé l'application sur l'émulateur Android.

Le terminal a confirmé la synchronisation de l'application sur l'appareil virtuel `emulator-5554`.

**Résultat :** l'application s'est ouverte correctement et les éléments du formulaire étaient visibles.

### Étape 5 — Test du formulaire

Pour vérifier le fonctionnement, les informations suivantes ont été saisies :

| Champ | Valeur testée |
|---|---|
| Email | billal@gmail.com |
| Username | billal |

Après avoir appuyé sur le bouton `sign up`, les valeurs ont été affichées dans le terminal :

`{"email":"billal@gmail.com","username":"billal"}`

<img width="411" height="602" alt="Capture d’écran 2026-11-12 110232" src="https://github.com/user-attachments/assets/60f7da7b-e6e0-4dd0-a8aa-3607071ec80f" />
<img width="965" height="229" alt="Capture d’écran 2026-11-12 110241" src="https://github.com/user-attachments/assets/b2254427-0cc7-4796-9b6c-f2c2b59942ef" />




**Résultat :** le test est réussi. Les deux valeurs ont été récupérées et affichées correctement.

## 5. Publication sur GitHub

Le projet a été ajouté au dépôt du cours dans le répertoire suivant :

`INF1083-200-26A-06/4.Forms/300159887/B300159887`

Les commandes Git utilisées pour la publication initiale sont :

`git add -- "4.Forms/300159887/B300159887"`

`git commit -m "Ajout du travail 4.Forms Hammiche Billal 300159887"`

`git pull --rebase origin main`

`git push origin main`

La présence du dossier et des fichiers sur GitHub a été vérifiée.

<img width="411" height="602" alt="Capture d’écran 2026-11-12 110232" src="https://github.com/user-attachments/assets/951ed6df-14b1-4b0c-865d-c8ec944ede84" />

## 6. Difficultés rencontrées

Pendant l'exécution, l'émulateur Android a temporairement affiché un message indiquant que Pixel Launcher ne répondait pas.

La compilation NativeScript était également en cours, ce qui a prolongé le temps de démarrage.

Après l'attente et la fin de la compilation, l'application a démarré normalement.

Les tests ont ensuite été réalisés avec succès.

## 7. Résultats et vérification

| Critère | Résultat |
|---|---|
| Création du projet NativeScript Angular | Réussi |
| Affichage du formulaire | Réussi |
| Champ Email | Fonctionnel |
| Champ Username | Fonctionnel |
| Bouton sign up | Fonctionnel |
| Affichage des valeurs dans la console | Réussi |
| Exécution sur Android | Réussi |
| Publication initiale sur GitHub | Réussie |

## 8. Conclusion

Ce laboratoire m'a permis de mettre en pratique la création et l'utilisation d'un formulaire réactif avec NativeScript Angular.

J'ai appris à configurer un formulaire avec `FormBuilder` et `FormGroup`, à récupérer les informations saisies et à afficher les résultats dans la console.

Les tests effectués sur l'émulateur Android confirment que l'application répond à l'objectif principal du travail demandé.

Ce laboratoire m'a également permis de renforcer mes compétences en développement mobile, en TypeScript et en gestion de projets avec GitHub.
