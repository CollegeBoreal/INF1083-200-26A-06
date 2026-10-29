Ce laboratoire a pour objectif de découvrir Angular et de créer une application Web à partir de composants. Les exercices réalisés illustrent l'affichage de données, la gestion des événements, les directives Angular, la récupération de données depuis une API REST et la gestion d'une liste d'étudiants.
Le premier composant affiche le message « Bienvenue INF1083 », un texte de présentation et le matricule de l'étudiant. L'interpolation Angular ({{ titre }}) permet d'afficher dans le HTML une valeur définie dans le composant TypeScript.
<img width="1911" height="980" alt="image" src="https://github.com/user-attachments/assets/dd576a59-e318-4031-a2ba-054332689c8c" />
La directive *ngIf permet d'afficher conditionnellement le texte « Connecté ». La directive *ngFor permet de parcourir une liste et d'afficher les noms Alice, Bob et Charlie
<img width="1305" height="952" alt="image" src="https://github.com/user-attachments/assets/ad22e082-8ec8-40d5-bb83-edb8e7dd6997" />
L'application présente des données provenant du composant, notamment le titre, le matricule et le nom « Prof ». Un bouton « Cliquez-moi » déclenche une fonction TypeScript qui affiche le message « Bonjour ! » lors du clic
<img width="958" height="918" alt="image" src="https://github.com/user-attachments/assets/a17b06ba-cd17-4976-847b-d26610be88bb" />
Une interface permet de saisir le nom d'un étudiant, de l'ajouter à une liste et de supprimer un étudiant existant. La liste initiale utilise des prénoms turcs : Mehmet, Emre, Ahmet, Ayşe, Elif et Zeynep. La capture montre également l'ajout du nom « azedinne ».

Fonctionnalités mises en œuvre :

Saisie du nom dans un champ texte ;

Ajout du nom avec le bouton « Ajouter » ;

Affichage dynamique de la liste ;

Suppression d'un élément avec le bouton « Supprimer ».
<img width="843" height="892" alt="image" src="https://github.com/user-attachments/assets/387160e6-049f-4c43-8bb9-75ec46736c71" />
Le terminal PowerShell affiche plusieurs messages « Application bundle generation complete », confirmant la compilation du projet Angular pendant les tests. Le serveur de développement recharge également l'application lorsque des fichiers sont modifiés.
<img width="680" height="1049" alt="image" src="https://github.com/user-attachments/assets/d5e54c28-9de0-4c3a-88b2-5d9e366ffdcb" />
Ce laboratoire m'a permis de découvrir la structure d'une application Angular, de créer et d'utiliser un composant, d'afficher des variables dans une page HTML, de gérer des événements, d'utiliser les directives ngIf et ngFor, de consommer une API REST et de manipuler une liste d'étudiants de façon interactive.
