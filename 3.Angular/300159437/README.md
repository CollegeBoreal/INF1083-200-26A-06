# NF1083 - Laboratoire Angular
Ce laboratoire a été réalisé dans le cadre du cours INF1083 afin de découvrir et mettre en pratique les concepts fondamentaux du framework Angular. Les objectifs du laboratoire étaient de comprendre le rôle d'Angular dans le développement d'applications web modernes, installer Angular CLI, créer une application Angular, comprendre le fonctionnement des composants, utiliser le Data Binding, créer des interfaces interactives et explorer la consommation d'API REST.

Angular est un framework développé par Google permettant de construire des applications web dynamiques similaires à Netflix, Gmail, Microsoft 365 ou encore Azure. Contrairement aux sites web traditionnels, ces applications ne rechargent pas entièrement la page lors des interactions avec l'utilisateur. Angular repose sur une architecture modulaire composée notamment de composants, services, routes, formulaires et API REST.

Dans ce projet, une application Angular a été créée à l'aide des commandes suivantes :

ng new B300159437
cd B300159437
ng serve
Le projet a été exécuté localement à l'adresse :
<img src="images/Screenshot%202026-10-15%20111217.png" width="40%">
http://localhost:4200
L'application développée démontre plusieurs fonctionnalités importantes d'Angular. Tout d'abord, un composant affiche un message de bienvenue grâce à l'interpolation :

Bienvenue INF1083
Cette fonctionnalité utilise le Data Binding pour lier les données TypeScript à l'interface HTML. Une variable contenant le texte « Prof » est également affichée dynamiquement dans l'application.

La gestion des événements a été implémentée à l'aide d'un bouton intitulé « Cliquez-moi ». Lors d'un clic, une fonction du composant est exécutée grâce à l'Event Binding avec l'événement (click).


<img src="images/Screenshot%202026-10-15%20111328.png" width="40%">



L'application utilise également une directive conditionnelle *ngIf permettant d'afficher l'état « Connecté » lorsque la condition est vraie. Cette technique est couramment utilisée pour gérer l'affichage dynamique selon l'état d'un utilisateur ou d'une application.

Une liste dynamique d'utilisateurs a été créée à l'aide de la directive *ngFor. La liste affiche les éléments suivants :

Alice
Bob
Charlie
Cette fonctionnalité permet de générer automatiquement du contenu HTML à partir des données contenues dans un tableau TypeScript.

Au cours du laboratoire, la structure d'un projet Angular a également été explorée, notamment les fichiers principaux :

src/
├── app/
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
├── assets/
├── index.html
└── main.ts
Les technologies utilisées dans ce projet sont Angular, TypeScript, HTML, CSS, Node.js et Angular CLI.

Ce laboratoire a permis d'acquérir une compréhension pratique des composantes essentielles d'Angular, notamment les composants réutilisables, le Data Binding, l'Event Binding, les directives structurelles (*ngIf et *ngFor), ainsi que le fonctionnement du serveur de développement Angular. Ces notions constituent la base du développement d'applications web modernes et serviront de fondation pour les futurs projets impliquant le routage, les formulaires et la consommation d'API REST.
