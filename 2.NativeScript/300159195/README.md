# INF1083 — Introduction à Angular

*Étudiante :* Islem  
*Identifiant :* 300159195  
*Projet :* B300159195

## Objectif

L’objectif de ce laboratoire est de créer une application Angular et de mettre en pratique les composants, la liaison des données entre TypeScript et HTML, l’affichage de listes, les événements et la consommation d’une API REST.

## Réalisation

### 01. Vérification de Node.js et installation d’Angular CLI

J’ai commencé par vérifier les versions de Node.js et de npm dans PowerShell :

bash
node --version
npm --version


Au départ, la commande ng version n’était pas reconnue : Angular CLI n’était pas encore installé. Je l’ai installé globalement, puis j’ai relancé la vérification :

bash
npm install -g @angular/cli
ng version


Le terminal a ensuite affiché la version d’Angular CLI, ce qui confirme que l’installation a réussi.

<img width="1536" height="1152" alt="WhatsApp Image 2026-10-01 at 1 06 27 PM" src="https://github.com/user-attachments/assets/8015973c-0783-447f-a9c2-eb5536580fd2" />

### 02. Création et lancement du projet

J’ai créé une application Angular nommée B300159195, puis je suis entré dans son dossier pour démarrer le serveur de développement :

bash
ng new B300159195
cd B300159195
ng serve


J’ai choisi le routage et le format CSS lors de la création. Une fois le serveur lancé, j’ai ouvert http://localhost:4200 dans le navigateur pour vérifier que l’application fonctionne.

### 03. Organisation des fichiers

Le dossier 300159195 contient :

- B300159195 : le code de l’application Angular ;
- images : les captures d’écran du travail ;
- README.md : la documentation du laboratoire.

Dans le projet Angular, les fichiers src/app/app.ts et src/app/app.html contiennent respectivement la logique TypeScript et l’interface HTML.

<img width="1536" height="1152" alt="WhatsApp Image 2026-10-01 at 1 03 20 PM" src="https://github.com/user-attachments/assets/f2bb34c2-2f74-4dcf-a9de-bcf206feb264" />

### 04. Création du composant

J’ai généré le composant bienvenue avec Angular CLI :

bash
ng generate component bienvenue


Cette commande a créé les fichiers du composant dans src/app/bienvenue. J’ai intégré ce composant à l’application pour afficher le titre « Bienvenue dans INF1083 ».

### 05. Liaison des données et événements

Dans app.ts, j’ai défini le nom Islem. Je l’affiche dans app.html avec l’interpolation {{ nom }} pour obtenir un message de bienvenue personnalisé.

J’ai aussi ajouté un champ de saisie lié à une variable TypeScript avec ngModel. Lorsque la valeur du champ change, la variable est mise à jour. Le bouton *Afficher le message* déclenche une méthode lors du clic et affiche le message prévu.

### 06. Affichage de la liste des étudiants

J’ai créé dans TypeScript une liste contenant initialement Alice, Bob et Charlie. Dans le HTML, *ngFor parcourt ce tableau et crée un élément de liste pour chaque étudiant.

J’ai ensuite ajouté un champ *Nom de l’étudiant* et un bouton *Ajouter*. La méthode d’ajout lit le nom saisi, enlève les espaces au début et à la fin, vérifie qu’il n’est pas vide, puis l’ajoute au tableau. Après l’ajout, le champ est vidé. La capture montre l’étudiant HICHEM ajouté à la liste.

<img width="1152" height="1536" alt="WhatsApp4 Image 2026-10-01 at 12 15 00 PM" src="https://github.com/user-attachments/assets/c063c664-83fa-49eb-8f2e-eba21b34d571" />

### 07. Suppression d’un étudiant

J’ai placé un bouton *Supprimer* à côté de chaque nom. Lorsque je clique sur un bouton, l’index de l’étudiant est transmis à la méthode supprimerEtudiant(). La méthode utilise splice(index, 1) pour retirer uniquement cet étudiant du tableau. La liste affichée se met alors à jour.

*Placer ici la photo « Suppression d’un étudiant » déjà présente dans ton README.*

La capture suivante montre le code TypeScript des méthodes d’ajout et de suppression.

<img width="1152" height="1536" alt="WhatsApp1 Image 2026-10-01 at 12 15 00 PM" src="https://github.com/user-attachments/assets/e25151c9-6e1c-415b-9002-79aa6e611c78" />

### 08. Consommation d’une API REST

J’ai utilisé HttpClient pour envoyer une requête GET à l’API de démonstration JSONPlaceholder :

text
https://jsonplaceholder.typicode.com/users


La réponse contient des utilisateurs avec leurs informations. J’enregistre ces données dans une variable de l’application, puis j’affiche leurs noms dans une liste HTML. J’ai aussi prévu l’affichage d’une erreur dans la console si la requête échoue.

La capture montre les noms reçus de l’API sous le titre « Utilisateurs de l’API REST ».

<img width="1536" height="1152" alt="WhatsApp2 Image 2026-10-01 at 12 15 00 PM" src="https://github.com/user-attachments/assets/e4f94d08-f9f0-440f-8bf1-12df22d91146" />

## Résultat

L’application affiche un message de bienvenue personnalisé, permet d’ajouter et de supprimer des étudiants dans une liste, et présente des utilisateurs récupérés depuis une API REST. J’ai vérifié ces fonctions dans le navigateur à l’adresse http://localhost:4200.

## Conclusion

Ce laboratoire m’a permis de découvrir la structure d’un projet Angular et d’utiliser Angular CLI pour créer le projet et un composant. J’ai pratiqué la liaison entre TypeScript et HTML avec l’interpolation et ngModel, la gestion des clics et d’une liste dynamique, ainsi que l’utilisation de HttpClient pour afficher des données externes.
