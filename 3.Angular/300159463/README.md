
1. Présentation du laboratoire
Ce laboratoire présente les bases du framework Angular. Le travail consiste à préparer l’environnement, créer une application Angular, développer un composant Accueil et tester plusieurs mécanismes essentiels du framework.
Les captures d’écran suivantes sont présentées dans l’ordre chronologique du travail réalisé.


2. Résumé des fonctionnalités réalisées
•	Vérification de Node.js, npm et Angular CLI.
•	Création et lancement du projet Angular B300159463.
•	Création et affichage du composant Accueil.
•	Data binding avec « Bienvenue INF1083 ».
•	Événement click avec saluer().
•	Affichage conditionnel de « Connecté ».
•	Boucle Angular pour afficher une liste.
•	Style CSS appliqué au titre.
•	Routage vers le composant Accueil.
•	API REST JSONPlaceholder avec HttpClient.

Étape 1 — Préparation du dossier de travail
Vérification du répertoire de l’étudiant et de la structure de travail avant la création de la nouvelle application Angular


<img width="1020" height="532" alt="image" src="https://github.com/user-attachments/assets/4ae774c7-b4d1-4ef3-a5d1-b8187bfb3343" />
Figure 1 — Préparation du dossier de travail



Étape 2 — Vérification de l’environnement Angular
Vérification des versions installées de Node.js, npm et Angular CLI. L’environnement est prêt pour le développement Angular.

<img width="1020" height="507" alt="image" src="https://github.com/user-attachments/assets/d7fc90fd-4728-4c06-be82-d0f12fa3ae78" />
Figure 2 — Vérification de l’environnement Angular

Étape 3 — Création du projet Angular
Création du projet B300159463 avec la commande « ng new B300159463 ». Le projet est configuré avec CSS et les fichiers Angular sont générés automatiquement.

<img width="1020" height="559" alt="image" src="https://github.com/user-attachments/assets/195f97ef-e041-4ef4-84a3-a54c23ed6786" />
Figure 3 — Création du projet Angular

Étape 4 — Démarrage du serveur de développement
Exécution de « ng serve ». Angular compile l’application et démarre le serveur local sur http://localhost:4200/.

<img width="1020" height="555" alt="image" src="https://github.com/user-attachments/assets/e924a97c-61bb-4e76-8ed6-370eae39ddd8" />
Figure 4 — Démarrage du serveur de développement


Étape 5 — Premier affichage du composant Accueil
Premier résultat dans le navigateur : le composant Accueil affiche le titre « Bienvenue INF1083 ».

<img width="1020" height="505" alt="image" src="https://github.com/user-attachments/assets/87c9d40c-b53d-4ec9-9c54-7885275c1ed9" />
Figure 5 — Premier affichage du composant Accueil

Étape 6 — Ajout du bouton d’événement
Ajout du bouton « Cliquez-moi » afin de démontrer l’event binding Angular avec l’événement (click).
<img width="1020" height="505" alt="image" src="https://github.com/user-attachments/assets/13c9410c-0a7d-41a3-b394-da29924b2cee" />
Figure 6 — Ajout du bouton d’événement


Étape 7 — Test de l’événement click
Après un clic sur le bouton, la méthode saluer() est exécutée et une boîte de dialogue affiche « Bonjour ! ».
<img width="1020" height="527" alt="image" src="https://github.com/user-attachments/assets/f730dafd-da0d-4563-9cab-0f21817b951a" />
Figure 7 — Test de l’événement click

 

 Étape 8 — Ajout d’une condition
Utilisation d’une condition Angular pour afficher le texte « Connecté » lorsque la variable connecte est vraie.

<img width="1020" height="512" alt="image" src="https://github.com/user-attachments/assets/73a1b2cf-3622-4d48-b640-68a64c9578d1" />
Figure 8 — Ajout d’une condition

Étape 9 — Affichage d’une liste
Utilisation d’une boucle Angular pour parcourir et afficher une liste de noms : matoub, idir et mellal.

<img width="1020" height="516" alt="image" src="https://github.com/user-attachments/assets/79fd9f06-5c88-47a2-aba0-b2a2393495e7" />
Figure 9 — Affichage d’une liste


 


Étape 10 — Application du style CSS
Application d’un style CSS au titre principal. Le texte « Bienvenue INF1083 » est maintenant affiché en bleu.

<img width="1020" height="518" alt="image" src="https://github.com/user-attachments/assets/3046543d-7603-4923-be52-ccd21b76cd0a" />
Figure 10 — Application du style CSS




Étape 11 — Consommation d’une API REST
Utilisation de HttpClient pour récupérer les utilisateurs de JSONPlaceholder. Les données reçues sont affichées sous « Utilisateurs de l’API ».

<img width="1020" height="515" alt="image" src="https://github.com/user-attachments/assets/1406e41c-4ef6-4a29-823a-6e5e8a3da114" />
Figure 11 — Consommation d’une API REST


3. Résultat final
L’application finale fonctionne sur localhost:4200. Elle affiche le titre « Bienvenue INF1083 » en bleu, un bouton qui déclenche « Bonjour ! », l’état « Connecté », une liste de noms et les utilisateurs récupérés depuis l’API REST JSONPlaceholder.
4. Conclusion
Ce laboratoire a permis de mettre en pratique les notions fondamentales d’Angular : création d’un projet, composants, interpolation, event binding, affichage conditionnel, boucles, routage, styles CSS et communication HTTP avec une API REST. Le projet B300159463 répond aux principaux objectifs du laboratoire d’introduction à Angular.
