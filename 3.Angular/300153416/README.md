pratique Angular :

Création du projet : Initialisation du projet Angular avec ng new B300153416.

Lancement du serveur : Exécution de la commande ng serve pour démarrer le serveur local.

Génération du composant : Création du composant d'accueil via ng generate component accueil.

Configuration racine (app.ts) : Déclaration de AccueilComponent dans le tableau imports du composant principal.

Nettoyage de app.html : Insertion de la balise <app-accueil></app-accueil> dans le gabarit principal.

Résolution des erreurs de chemin : Correction des extensions de fichiers et des imports dans la configuration TypeScript.

Correction de la boucle infinie : Suppression de la balise <app-accueil> à l'intérieur de accueil.html.

Mise en place des données (accueil.ts) : Définition des propriétés nomEtudiant, numeroEtudiant (300153416) et titre.

Implémentation de l'interpolation : Affichage des variables dans accueil.html avec la syntaxe {{ variable }}.

Gestion de l'affichage conditionnel : Ajout d'une variable booléenne et de la directive *ngIf pour masquer/afficher un message.

Gestion d'événement (Event Binding) : Création d'un bouton liant l'événement (click) à une fonction de bascule.

Affichage de listes (Rendering) : Utilisation de la directive *ngFor pour afficher le tableau des cours.

Importation des modules : Ajout de CommonModule dans accueil.ts pour activer les directives structurelles.

Validation sur le navigateur : Vérification du rendu visuel et du fonctionnement sur http://localhost:4200.

Finalisation du TP : Validation du fonctionnement global sans erreurs dans la console du navigateur.
