# 300160006

## Présentation du projet Angular – INF1083

Dans le cadre du cours INF1083, j’ai réalisé une petite application web avec Angular. L’objectif était de découvrir les bases d’Angular et de comprendre comment créer une interface web moderne.
Pendant ce travail, j’ai appris à créer un projet Angular, à utiliser les composants, à afficher des données, à gérer les événements, à utiliser des directives, à récupérer des données avec une API REST, à utiliser le routage et à ajouter du style CSS avec visual code.

### Création du projet Angular

J’ai commencé par créer mon projet Angular avec la commande :ng new B300160006
Lors de la création du projet, j’ai choisi :le routage : Yes, les feuilles de style : CSS
Ensuite, je suis entrée dans le répertoire du projet et j’ai lancé l’application avec :ng serve
L’application était accessible avec :http://localhost:4200/
Cela m’a permis de vérifier que mon projet Angular fonctionnait correctement.

![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/6ea6da179cad05d8209ae0f075ca14114b144c5e/3.Angular/300160006/images/Screenshot%202026-10-03%20195003.png)
![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/0982f7fc023cbc743899db9b830e9b409f268c71/3.Angular/300160006/images/Screenshot%202026-10-03%20200211.png)
![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/bec65ee35d182530b9fcebb557057e99d47e2886/3.Angular/300160006/images/Screenshot%202026-10-03%20201004.png)

### Composant, Data Binding, événements et directives
J’ai ensuite créé un composant appelé welcome avec la commande ng g c welcome. Dans ce composant, j’ai créé une variable titre contenant « Bienvenue INF1083 » et je l’ai affichée dans le fichier HTML avec {{ titre }}. Cela m’a permis de comprendre le Data Binding, qui permet de connecter les données du fichier TypeScript à l’interface HTML. J’ai ensuite ajouté une variable nom contenant « Bienvenue dans votre application Mai ! » et je l’ai également affichée dans la page. Après cela, j’ai ajouté un bouton avec (click)="saluer()". Lorsque l’utilisateur clique sur le bouton, la fonction saluer() affiche une fenêtre avec le message « Bonjour ! ». J’ai ensuite utilisé la directive ngIf avec la variable connecte = true afin d’afficher le message « Vous êtes connecté ! ». Finalement, j’ai créé une liste contenant les étudiants « Alice », « Bob » et « Charlie » et j’ai utilisé la directive ngFor pour afficher chaque étudiant dans la page. Ces étapes m’ont permis de comprendre comment Angular peut afficher des données dynamiques, réagir aux actions de l’utilisateur et afficher du contenu selon certaines conditions.
![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/02877339b7b20c09013dba68a20d7f5eabada3ab/3.Angular/300160006/images/Screenshot%202026-10-03%20211445.png)

### Consommation d’une API REST

J’ai ensuite appris à utiliser une API REST avec Angular. J’ai importé HttpClient afin de permettre à l’application de communiquer avec une API externe. J’ai utilisé l’API https://jsonplaceholder.typicode.com/users pour récupérer une liste d’utilisateurs. Les données reçues sont enregistrées dans une variable appelée utilisateurs, puis affichées dans la page avec ngFor.

![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/2ae9d67f0722f4633a31fed60caff8d44bc96e5c/3.Angular/300160006/images/Screenshot%202026-10-05%20194101.png)

### Routage

J’ai également découvert le système de routage d’Angular. Dans le fichier app.routes.ts, j’ai associé la route principale au composant Welcome. Cela permet à Angular de savoir quel composant doit être affiché lorsque l’utilisateur accède à la page principale.

![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/71a9d6c209d7e0bf262d129ffa0484faa8e76e43/3.Angular/300160006/images/Screenshot%202026-10-05%20202211.png)


### Style CSS

Pour améliorer l’apparence de mon application, j’ai utilisé le fichier welcome.css. J’ai modifié le titre pour le mettre en bleu , j’ai augmenté la taille du texte et j’ai amélioré l’apparence du bouton avec du padding et un curseur.

![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/d3f380137e526626b7e38c57586dfda118d5670d/3.Angular/300160006/images/Screenshot%202026-10-05%20194728.png)

L’état final de mon projet est une application Angular permettant de gérer des étudiants, des professeurs, des cours et des utilisateurs. L’utilisateur peut naviguer entre les différentes sections à l’aide d’icônes, ajouter et supprimer des étudiants, rechercher des étudiants, des professeurs, des cours et des utilisateurs. Les utilisateurs sont récupérés à partir d’une API REST. L’application utilise Angular, TypeScript, HTML et CSS et offre une interface simple, fonctionnelle et facile à utiliser.
![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/b9730ad29407552f676fffe0b558dfcb7e5938de/3.Angular/300160006/images/image.png)


## Conclusion

Ce travail m’a permis de mieux comprendre les bases d’Angular et le fonctionnement d’une application web moderne. J’ai appris à créer un composant, à utiliser le Data Binding, les événements, les directives, les API REST, le routage et le CSS. Cette activité m’a donné une première expérience pratique avec Angular et une bonne base pour continuer à apprendre le développement web.
