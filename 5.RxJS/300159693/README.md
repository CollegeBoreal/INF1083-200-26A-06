# RAPPORT FINAL – LABORATOIRE 5 : RxJS

**Cours :** INF1083 – Développement  
**Nom et prénom :** Mekaouche Mazigh  
**Numéro étudiant :** 300159693  
**Projet :** B300159693  
**Laboratoire :** 5.RxJS  
**Date :** 17 novembre 2026

---

## 1. Introduction

Dans ce laboratoire, j'ai réalisé une application mobile avec NativeScript et Angular afin de comprendre le fonctionnement de RxJS et des Observables.

L'objectif principal était de développer une fonctionnalité permettant de rechercher un pays à partir de sa capitale, de récupérer les informations depuis une API et d'afficher les résultats dans une liste.

## 2. Création du projet

J'ai commencé par récupérer le dépôt GitHub du cours INF1083-200-26A-06.

Ensuite, j'ai créé mon répertoire personnel avec mon numéro étudiant 300159693 dans le dossier 5.RxJS.

J'ai créé le projet NativeScript Angular nommé :

`B300159693`

J'ai utilisé le modèle Tab Navigation afin de disposer de plusieurs onglets dans l'application.

## 3. Technologies utilisées

Les technologies utilisées dans ce laboratoire sont :

- NativeScript 9.
- Angular 22.
- RxJS 7.8.2.
- TypeScript.
- HttpClient.
- Template Driven Forms.
- Visual Studio Code.
- Android Emulator.

## 4. Création du modèle Country
<img width="956" height="509" alt="Capture d&#39;écran 2026-11-17 183436" src="https://github.com/user-attachments/assets/7e3d9e90-1d10-4563-a82d-f1b7b7af4234" />


J'ai créé le fichier `country.ts` dans le dossier `src/app/shared`.

Ce modèle contient trois propriétés :

- `id` : identifiant du pays.
- `name` : nom du pays.
- `capital` : capitale du pays.

Ce modèle permet d'organiser les données récupérées depuis l'API.

## 5. Création du service API
<img width="295" height="503" alt="Capture d&#39;écran 2026-11-17 183949" src="https://github.com/user-attachments/assets/6948c892-25c0-44e3-9ea5-88dc36cd7038" />


J'ai créé le fichier `apicall.service.ts`.

Ce service utilise HttpClient pour envoyer une requête HTTP vers l'API :

`https://countries.nexperts.nl/capital/`

J'ai utilisé plusieurs fonctionnalités de RxJS :

- **Observable :** permet de recevoir les données de manière asynchrone.
- **map :** permet de transformer les données reçues.
- **catchError :** permet de gérer les erreurs de communication avec l
