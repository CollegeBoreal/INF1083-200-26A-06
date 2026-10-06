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

### Création du premier composant
J’ai créé un composant appelé welcome avec la commande :ng g c welcome
Angular a créé les fichiers nécessaires pour le composant.J’ai ensuite créé une variable dans welcome.ts :titre = 'Bienvenue INF1083';
 Dans welcome.html, j’ai utilisé :<h1>{{ titre }}</h1>
 L’application affiche :Bienvenue INF1083
Cela m’a permis de comprendre le fonctionnement d'un composant Angular et du Data Binding.

