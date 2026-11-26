# 🌍 Travel Explorer — Laboratoire RxJS

**Collège Boréal — INF1083**  
**Étudiant :** Salhi Oualid  
**Matricule :** 300156534  
**Date :** 26 novembre 2026

## Objectif

L’objectif de ce laboratoire est de développer une application mobile avec NativeScript, Angular et RxJS permettant de découvrir des destinations, de rechercher des pays avec une API et de gérer une liste de favoris.

## Réalisation du laboratoire

### 1. Structure du projet

J’ai ouvert le projet b300156534 dans Visual Studio Code.

![Capture 1 — Structure du projet](images/Screenshot%202026-11-26%20100454.png)

### 2. Création du modèle Country

J’ai défini les propriétés du pays : nom, capitale, région, population, drapeau et monnaie.

![Capture 2 — Création du modèle Country](images/Screenshot%202026-11-26%20101158.png)

### 3. Création du service API

J’ai utilisé HttpClient et Observable avec les opérateurs map et catchError pour récupérer et transformer les données.

![Capture 3 — Création du service API](images/Screenshot%202026-11-26%20101401.png)

### 4. Configuration du module principal

J’ai ajouté NativeScriptHttpClientModule pour permettre les requêtes HTTP.

![Capture 4 — Configuration du module principal](images/Screenshot%202026-11-26%20101730.png)

### 5. Configuration du module de recherche

J’ai configuré NativeScriptFormsModule pour le formulaire de recherche.

![Capture 5 — Configuration du module de recherche](images/Screenshot%202026-11-26%20101840.png)

### 6. Logique de recherche

J’ai utilisé subscribe pour récupérer les résultats et gérer les erreurs et le chargement.

![Capture 6 — Logique de recherche](images/Screenshot%202026-11-26%20101950.png)

### 7. Interface de recherche

J’ai utilisé ListView et GridLayout pour afficher les informations des pays.

![Capture 7 — Interface de recherche](images/Screenshot%202026-11-26%20102220.png)

### 8. Liste des destinations

J’ai défini les destinations touristiques dans home.component.ts.

![Capture 8 — Liste des destinations](images/Screenshot%202026-11-26%20102338.png)

### 9. Interface d’accueil

J’ai créé une liste présentant les destinations, les villes et les attractions.

![Capture 9 — Interface d’accueil](images/Screenshot%202026-11-26%20102503.png)

### 10. Compilation Android

J’ai compilé et installé l’application sur l’émulateur Android avec ns run android.

![Capture 10 — Compilation Android](images/Screenshot%202026-11-26%20104814.png)

### 11. Test de la page d’accueil

J’ai vérifié l’affichage des destinations et de leurs drapeaux.

![Capture 11 — Test de la page d’accueil](images/Screenshot%202026-11-26%20104930.png)

### 12. Recherche du Japon

Après le remplacement de l’ancienne API devenue obsolète par countries.nexperts.nl, la recherche du Japon affiche Tokyo, la région, la population et la monnaie.

![Capture 12 — Recherche du Japon](images/Screenshot%202026-11-26%20111301.png)

### 13. Recherche du Canada

J’ai effectué une deuxième recherche et vérifié l’affichage des informations du Canada, dont Ottawa et la monnaie CAD.

![Capture 13 — Recherche du Canada](images/Screenshotcanada%202026-11-26%20111916.png)

### 14. Navigation par onglets

J’ai configuré la navigation avec TabView et les sorties de routage.

![Capture 14 — Navigation par onglets](images/Screenshot%202026-11-26%20112222.png)

### 15. Personnalisation de la navigation

J’ai vérifié les trois onglets Accueil, Favoris et Recherche après leur personnalisation.

![Capture 15 — Personnalisation de la navigation](images/Screenshot%202026-11-26%20113045.png)

### 16. Gestion des favoris

J’ai créé les méthodes ajouterFavori et supprimerFavori.

![Capture 16 — Gestion des favoris](images/Screenshot%202026-11-26%20113250.png)

### 17. Correction du tableau des favoris

J’ai précisé le type du tableau des favoris avec any[].

![Capture 17 — Correction du tableau des favoris](images/Screenshot%202026-11-26%20113453.png)

### 18. Interface des favoris

J’ai vérifié la liste des destinations disponibles et les boutons Ajouter.

![Capture 18 — Interface des favoris](images/Screenshot%202026-11-26%20113603.png)

### 19. Test d’ajout des favoris

J’ai ajouté la France et le Japon à mes destinations favorites.

![Capture 19 — Test d’ajout des favoris](images/Screenshot%202026-11-26%20113815.png)

### 20. Test de suppression

J’ai supprimé la France de mes favoris et vérifié que le Japon reste dans la liste.

![Capture 20 — Test de suppression](images/Screenshot%202026-11-26%20113900.png)

## Difficultés rencontrées et solutions

- L’ancienne API REST Countries ne répondait plus normalement. J’ai utilisé une autre adresse API et adapté le traitement des données.
- Les pages étaient blanches après la modification des onglets. J’ai corrigé les noms des sorties de routage pour les faire correspondre aux routes.
- La compilation a produit des avertissements Sass, mais l’installation Android a réussi.

## Conclusion

Ce laboratoire m’a permis de pratiquer les requêtes HTTP, les Observable et les opérateurs RxJS dans une application NativeScript Angular. Les tests sur l’émulateur ont confirmé le fonctionnement de l’accueil, de la recherche de pays et de l’ajout et de la suppression des favoris pendant l’utilisation de l’application.
