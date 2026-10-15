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
Vérification du répertoire de l’étudiant et de la structure de travail avant la création de la nouvelle application Angular.
 
Figure 1 — Préparation du dossier de travail

 Étape 2 — Vérification de l’environnement Angular
Vérification des versions installées de Node.js, npm et Angular CLI. L’environnement est prêt pour le développement Angular.
 
Figure 2 — Vérification de l’environnement Angular

 Étape 3 — Création du projet Angular
Création du projet B300159463 avec la commande « ng new B300159463 ». Le projet est configuré avec CSS et les fichiers Angular sont générés automatiquement.
 
Figure 3 — Création du projet Angular

 Étape 4 — Démarrage du serveur de développement
Exécution de « ng serve ». Angular compile l’application et démarre le serveur local sur http://localhost:4200/.
 
Figure 4 — Démarrage du serveur de développement

 Étape 5 — Premier affichage du composant Accueil
Premier résultat dans le navigateur : le composant Accueil affiche le titre « Bienvenue INF1083 ».
 
Figure 5 — Premier affichage du composant Accueil

 Étape 6 — Ajout du bouton d’événement
Ajout du bouton « Cliquez-moi » afin de démontrer l’event binding Angular avec l’événement (click).
 
Figure 6 — Ajout du bouton d’événement

 Étape 7 — Test de l’événement click
Après un clic sur le bouton, la méthode saluer() est exécutée et une boîte de dialogue affiche « Bonjour ! ».
 
Figure 7 — Test de l’événement click

 Étape 8 — Ajout d’une condition
Utilisation d’une condition Angular pour afficher le texte « Connecté » lorsque la variable connecte est vraie.
 
Figure 8 — Ajout d’une condition

 Étape 9 — Affichage d’une liste
Utilisation d’une boucle Angular pour parcourir et afficher une liste de noms : matoub, idir et mellal.
 
Figure 9 — Affichage d’une liste

 Étape 10 — Application du style CSS
Application d’un style CSS au titre principal. Le texte « Bienvenue INF1083 » est maintenant affiché en bleu.
 
Figure 10 — Application du style CSS

 Étape 11 — Consommation d’une API REST
Utilisation de HttpClient pour récupérer les utilisateurs de JSONPlaceholder. Les données reçues sont affichées sous « Utilisateurs de l’API ».
 
Figure 11 — Consommation d’une API REST

 3. Résultat final
L’application finale fonctionne sur localhost:4200. Elle affiche le titre « Bienvenue INF1083 » en bleu, un bouton qui déclenche « Bonjour ! », l’état « Connecté », une liste de noms et les utilisateurs récupérés depuis l’API REST JSONPlaceholder.
4. Conclusion
Ce laboratoire a permis de mettre en pratique les notions fondamentales d’Angular : création d’un projet, composants, interpolation, event binding, affichage conditionnel, boucles, routage, styles CSS et communication HTTP avec une API REST. Le projet B300159463 répond aux principaux objectifs du laboratoire d’introduction à Angular.

