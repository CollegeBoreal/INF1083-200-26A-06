# INF1083 — Introduction à Angular

**Étudiante :** Islem  
**Identifiant :** 300159195

## Projet

J'ai créé une application Angular dans le dossier `B300159195` et un composant `bienvenue`. Pour lancer le projet, ouvrir un terminal dans `B300159195`, exécuter `npm install` si nécessaire, puis `ng serve`. L'application est accessible sur `http://localhost:4200`.

## Travail réalisé

1. Installation de Node.js et d'Angular CLI, puis création et démarrage du projet.
2. Création du composant `bienvenue` et affichage du titre « Bienvenue dans INF1083 ».
3. Liaison des données entre TypeScript et HTML : affichage du nom, saisie d'un nom avec `ngModel` et message affiché après un clic.
4. Affichage de la liste initiale `Alice`, `Bob`, `Charlie` avec `*ngFor`.
5. Défi : ajout d'un étudiant depuis le formulaire et suppression d'un étudiant avec son bouton « Supprimer ».
6. Consommation d'une API REST avec `HttpClient` : requête GET à JSONPlaceholder et affichage des noms des utilisateurs reçus.

## Captures d'écran

Installation d'Angular CLI :

![Installation et vérification d'Angular CLI](images/00-installation-angular-cli.jpg)

Organisation du dossier avec `README.md` et `images` :

![Structure du dossier](images/01-structure-projet.jpg)

Ajout d'un étudiant :

![Étudiant ajouté à la liste](images/02-ajout-etudiant.jpg)

Suppression d'un étudiant :

![Boutons de suppression](images/03-boutons-suppression.jpg)
![Liste après suppression](images/04-suppression-etudiant.jpg)

Préparation de `HttpClient` et résultat de l'API REST :

![Code préparant le client HTTP](images/05-code-api-rest.jpg)
![Utilisateurs reçus depuis l'API](images/06-resultat-api-rest.jpg)
