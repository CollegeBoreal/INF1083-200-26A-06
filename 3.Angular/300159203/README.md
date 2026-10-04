Compte Rendu de Laboratoire : INF1083 – Angular  
Matricule: 300159203  
1. Description du Projet et Objectifs
L'objectif de ce laboratoire était d'installer l'environnement de développement modernisé pour Angular, d'initialiser une application à base de composants autonomes (Standalone Components) et d'implémenter :

L'interpolation de données dynamiques (String Interpolation).

La gestion des événements utilisateur (Event Binding).

La liaison bidirectionnelle (Two-Way Data Binding) pour la gestion dynamique d'une liste.

L'intégration et la consommation d'une API REST externe via des requêtes HTTP.  

2. Étapes de Réalisation
Étape 1 : Préparation du répertoire et suivi Git
Création du dossier de travail : Un répertoire nommé 300159203 a été créé sous 3.Angular.
Initialisation du dépôt : Ajout du fichier d'ancrage images/.gitkeep, validation du commit ("Ajout de images") et synchronisation sur le dépôt GitHub distant (CollegeBoreal/INF1083-200-26A-06)
<img width="859" height="221" alt="Screenshot 2026-10-04 121721" src="https://github.com/user-attachments/assets/1becb5b0-1aee-494e-a47a-898a92e54341" />
<img width="861" height="409" alt="Screenshot 2026-10-04 121753" src="https://github.com/user-attachments/assets/3806e4e1-e529-461b-b6ce-53c471b6d487" />
Étape 2 : Vérification de l'environnement et installation de l'Angular CLI
Vérification des versions :Node.js : v24.21.0   npm : 11.19.0
<img width="662" height="74" alt="Screenshot 2026-10-04 121926" src="https://github.com/user-attachments/assets/89520e07-d31b-40fb-bf25-a6b101c37cdf" />  
Installation CLI : Installation globale du package @angular/cli.  
<img width="823" height="403" alt="Screenshot 2026-10-04 121855" src="https://github.com/user-attachments/assets/375b092f-18d4-4c5a-b84f-3ed4aca677fc" />
Étape 3 : Génération et premier lancement de l'application
Création du projet : Exécution de ng new B300159203 --routing --style=css pour générer la structure initiale
<img width="791" height="605" alt="Screenshot 2026-10-04 122210" src="https://github.com/user-attachments/assets/16dd6c5d-e946-4ce2-8f20-ff42580cc8fb" />
Vérification du serveur local : Exécution de ng serve, 
<img width="632" height="325" alt="Screenshot 2026-10-04 122525" src="https://github.com/user-attachments/assets/baac4bb4-5196-4c50-b83f-85162216e282" />
puis validation du rendu initial sur http://localhost:4200 affichant "Hello, B300159203".  
<img width="1275" height="730" alt="Screenshot 2026-10-04 122555" src="https://github.com/user-attachments/assets/07c14d2a-3847-49b2-8890-a866fde77f0f" />
Sauvegarde Git : Commit et push des fichiers générés ("Ajout du projet Angular B300159203").
<img width="905" height="518" alt="Screenshot 2026-10-04 122939" src="https://github.com/user-attachments/assets/b97024a4-d3a5-461a-b9c3-40ac1a39e171" />
Étape 4 : Développements des fonctionnalités
Composant autonome : Création du composant Bienvenue et configuration de son script dans src/app/bienvenue/bienvenue.ts
Variables d'état :Title/Header : "Bienvenue dans INF1083 session A26 SECTION 6".
Liste d'étudiants initiale : ["Riadh", "Bilel", "Hichem", "Oualid", "Rayan"]
<img width="1007" height="664" alt="Screenshot 2026-10-04 125301" src="https://github.com/user-attachments/assets/93a46c0d-dafd-49fb-8f45-aae1626729ef" />
3. Résultats et Validation
L'application a été compilée et exécutée avec succès via ng serve. L'interface sur http://localhost:4200 confirme le bon fonctionnement de tous les blocs :
Entête dynamique : Le titre personnalisé s'affiche correctement en haut de page.
Interactivité : Le bouton d'événement réagit aux clics.
Gestion d'état (Liste) : La liste d'étudiants s'affiche correctement avec la possibilité d'ajouter de nouveaux noms (ex: youcef) ou d'en supprimer.
Intégration API REST : Les données des 10 utilisateurs de test (ex: Leanne Graham, Ervin Howell, etc.) sont récupérées depuis le serveur distant et rendues dynamiquement dans le DOM
<img width="1199" height="581" alt="Screenshot 2026-10-04 124842" src="https://github.com/user-attachments/assets/26619e5d-271e-49af-ac7f-0520156dcf9c" />










