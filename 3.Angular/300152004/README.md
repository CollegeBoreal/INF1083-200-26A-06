# Créer une application Angular
# 300152004

Étape 1 Créer le projet
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/3.Angular/300152004/images/01_creation_projet_ng_new.png?raw=true" />
Depuis mon répertoire INF1083-200-26A-06\3.Angular\300152004, j'ai lancé la commande ng new B300152004. L'assistant m'a posé plusieurs questions : le format de feuilles de style (CSS), l'activation du SSR/SSG (No) et les outils d'IA à intégrer (None).
Une erreur est apparue : « A merge conflicted on path "/B300152004/angular.json" ». Le dossier B300152004 existait déjà dans le répertoire (visible avec dir), ce qui a bloqué la création.

Étape 2 Corriger l'erreur et régénérer le projet
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/3.Angular/300152004/images/02_recreation_propre_projet.png?raw=true" />
Pour corriger le conflit, je suis remonté d'un niveau (cd ..), j'ai supprimé l'ancien dossier avec Remove-Item -Recurse -Force .\B300152004, puis j'ai relancé ng new B300152004 avec les mêmes réponses (CSS, No, None).
Cette fois, Angular a créé tous les fichiers du projet : angular.json, package.json, tsconfig.json, le dossier src/ avec main.ts, index.html, styles.css, ainsi que le dossier src/app/ (app.ts, app.html, app.css, app.config.ts, app.routes.ts).

Étape 3 Lancer le serveur et générer le premier composant
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/3.Angular/300152004/images/03_serveur_et_composant_accueil.png?raw=true" />
Je suis entré dans le projet (cd B300152004) et j'ai démarré le serveur avec ng serve. J'ai refusé le partage des données d'utilisation (No). Le build s'est terminé avec succès et l'application est disponible sur http://localhost:4200/.
J'ai ensuite créé mon premier composant avec ng g c accueil. Angular a généré quatre fichiers dans src/app/accueil/ : .spec.ts, .ts, .css et .html.

Étape 4 Développer avec le serveur en mode surveillance
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/3.Angular/300152004/images/04_rechargement_automatique_watch.png?raw=true" />
Après avoir ouvert le projet dans VS Code (code .), j'ai relancé ng serve. Le mode watch permet à Angular de recompiler automatiquement à chaque modification : la taille de main.js passe de 3.88 kB à 4.12, 4.14, puis 4.39 kB, ce qui montre que j'ai ajouté du code (titre, bouton, directives, etc.). Les messages « Component update sent to client(s) » et « Page reload sent to client(s) » confirment que le navigateur se met à jour en direct.

Étape 5 Ajouter d'autres composants pour la navigation
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/3.Angular/300152004/images/06_composants_utilisateurs_contact.png?raw=true" />
En me replaçant dans le dossier du projet, j'ai généré deux nouveaux composants : ng g c utilisateurs et ng g c contact. Chacun contient ses fichiers .ts, .html, .css et .spec.ts. Ces composants serviront de pages dans le routage (Accueil, Utilisateurs, Contact).

Étape 6 Vérifier le rendu de l'application sur localhost:4200
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/3.Angular/300152004/images/07_resultat_final_navigateur.png?raw=true" />
La page affiche tous les concepts vus dans le cours :
• Menu de navigation (routage) : liens Accueil, Utilisateurs et Contact
• Titre avec data binding : « Bienvenue INF1083 » en bleu (style CSS color: blue)
• Affichage d'une variable : « Étudiant : Daniel »
• Événement : bouton « Cliquez-moi » ((click))
• Directive conditionnelle : « Utilisateur connecté ✅ » (@if / ngIf)
• Directive de liste : « Liste des étudiants » (Daniel, Alice, Bob, Charlie) avec ngFor
• Consommation d'API REST : section « Utilisateurs de l'API » (titre affiché, mais la liste est encore vide : la requête HttpClient vers jsonplaceholder.typicode.com/users reste à vérifier)



