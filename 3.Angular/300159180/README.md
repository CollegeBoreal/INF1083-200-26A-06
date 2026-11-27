DOCUMENTATION TECHNIQUE
Projet Angular
B300159180
Application de gestion des étudiants
Documentation du développement, du fonctionnement,
des tests et des résultats avec captures d’écran
Environnement de développement : Visual Studio Code
Technologies : Angular, TypeScript, HTML et CSS
 
1. Introduction
Ce document présente la réalisation du projet Angular identifié par B300159180. L’objectif est de développer une application web simple qui affiche les informations du projet et permet de gérer une liste d’étudiants. La documentation explique l’organisation du projet, le rôle des principaux fichiers, le fonctionnement des fonctionnalités et les tests effectués dans le navigateur.
2. Objectifs de l’application
•	Afficher l’identifiant du projet B300159180.
•	Afficher un message de bienvenue et permettre de changer le nom affiché.
•	Gérer un état de connexion : connecté ou déconnecté.
•	Ajouter un étudiant à une liste.
•	Refuser une saisie vide et détecter les noms déjà présents.
•	Afficher le nombre total d’étudiants.
•	Modifier le nom d’un étudiant existant.
•	Supprimer un étudiant de la liste.
•	Afficher des messages pour informer l’utilisateur du résultat de ses actions.
3. Environnement et démarrage du projet
Le développement est effectué dans Visual Studio Code. Le projet Angular est ouvert dans le dossier B300159180. Le navigateur permet de tester l’application localement.
3.1 Fichiers principaux
Fichier	Rôle
src/app/app.ts	Contient la logique du composant : données, signaux et fonctions.
src/app/app.html	Contient la structure de la page et les éléments affichés.
src/app/app.css	Contient les règles de style de la page et des composants.
src/main.ts	Point d’entrée de l’application Angular.
angular.json	Configuration générale du projet Angular.
package.json	Décrit les dépendances et les scripts du projet.
3.2 Lancer l’application
Dans le terminal intégré de Visual Studio Code, se placer dans le dossier du projet puis lancer :
npm install
ng serve --open
La commande npm install installe les dépendances du projet lorsque cela est nécessaire. La commande ng serve --open démarre le serveur de développement Angular et ouvre normalement le navigateur à l’adresse http://localhost:4200. Si le serveur est déjà lancé, il n’est pas nécessaire de démarrer une deuxième instance.
4. Technologies et notions utilisées
Angular : Cadre de développement utilisé pour construire l’interface web et organiser l’application en composants.
TypeScript : Langage utilisé pour programmer la logique du composant, les variables et les fonctions.
HTML : Langage de balisage utilisé pour organiser les titres, champs, boutons et listes.
CSS : Langage de style utilisé pour gérer les couleurs, espacements, dimensions et présentation.
Signaux Angular (signal) : Mécanisme réactif utilisé dans le composant pour stocker des valeurs et mettre à jour l’affichage lorsqu’elles changent.
Événements et liaison de données : Permettent de relier les actions de l’utilisateur aux fonctions TypeScript et de présenter les valeurs dans le modèle.
5. Fonctionnement de l’application
5.1 Informations du projet et changement de nom
La première partie affiche l’identifiant B300159180, un message de bienvenue, ainsi que l’identifiant du projet. Le bouton « Changer le nom » déclenche la fonction associée dans le composant TypeScript et met à jour le nom affiché.
5.2 Gestion de la connexion
La section de connexion affiche un bouton permettant de changer l’état. Lorsque l’état est connecté, un message de bienvenue est présenté. Lorsque l’état est déconnecté, le texte de la page doit refléter ce nouvel état. Cette fonctionnalité illustre l’utilisation d’une valeur booléenne et d’un affichage conditionnel.
5.3 Liste des étudiants
La liste est gérée dans le composant TypeScript. Chaque étudiant est représenté par un nom. Le compteur indique le nombre d’éléments présents. Si la liste est vide, un message indique qu’aucun étudiant n’est enregistré.
5.4 Ajout d’un étudiant
L’utilisateur saisit un nom dans le champ puis clique sur « Ajouter un étudiant ». La fonction d’ajout récupère la valeur, retire les espaces inutiles avec trim(), puis vérifie que le champ n’est pas vide. Elle vérifie également si le nom existe déjà, sans tenir compte des différences entre majuscules et minuscules. Si le nom existe, l’ajout est refusé et un message d’erreur est affiché. Sinon, le nom est ajouté à la liste et le compteur est mis à jour.
5.5 Modification d’un étudiant
Le bouton « Modifier » permet de sélectionner un étudiant et de changer son nom. La modification doit être enregistrée pour remplacer l’ancien nom. Un message confirme la réussite de l’opération. La logique de modification utilise l’identification de l’étudiant sélectionné et met à jour la liste.
5.6 Suppression d’un étudiant
Le bouton « Supprimer » retire l’étudiant correspondant de la liste. La liste et le compteur sont automatiquement actualisés après la suppression.
5.7 Messages de validation
Les messages permettent de comprendre le résultat d’une action : saisie vide, étudiant déjà présent, ajout réussi, modification réussie ou suppression réussie. Ils rendent l’application plus claire pour l’utilisateur.
6. Rôle des fichiers du composant
6.1 app.ts — logique TypeScript
Ce fichier contient la classe du composant principal. Il importe notamment Component et signal depuis Angular. Les signaux stockent les valeurs utilisées par l’interface, par exemple le nom, l’état de connexion, la liste des étudiants, le texte saisi et le message à afficher.
Les fonctions du composant répondent aux actions des boutons. La fonction d’ajout valide le nom et met à jour la liste. La fonction de suppression filtre la liste pour retirer le nom choisi. La fonction de modification met à jour l’entrée sélectionnée.
6.2 app.html — structure HTML
Ce fichier décrit ce que l’utilisateur voit. Il contient les titres, les paragraphes, les champs de saisie et les boutons. Les expressions Angular affichent les valeurs du composant. Les directives de contrôle de flux, comme @if et @for lorsqu’elles sont utilisées, permettent d’afficher un contenu selon une condition et de parcourir la liste des étudiants.
6.3 app.css — présentation CSS
Ce fichier contrôle l’apparence de l’application. Les captures montrent une interface claire avec un fond pâle, un panneau blanc centré, des boutons orange, des champs arrondis et des zones grises pour séparer les étudiants. Les règles CSS améliorent la lisibilité et la cohérence de l’interface.
7. Captures d’écran et déroulement des tests
Les captures suivantes sont présentées dans l’ordre chronologique de leur envoi. Elles montrent les différents états de l’application pendant les essais : liste vide, ajout, détection de doublon, modification et affichage final.
1. Premier affichage et test d’un doublon
L’application est ouverte dans le navigateur à l’adresse localhost:4200. Le formulaire contient déjà le nom « ahmed ». En tentant de l’ajouter une deuxième fois, l’application affiche le message « Cet étudiant existe déjà. ». Ce test confirme le contrôle des doublons.
 
Figure 1 — 1. Premier affichage et test d’un doublon.
2. Liste vide au démarrage
La section « Liste des étudiants » affiche un compteur à 0 et le message « Aucun étudiant dans la liste. ». Le champ de saisie et le bouton permettent de commencer à ajouter des étudiants.
 
Figure 2 — 2. Liste vide au démarrage.
3. Ajout de plusieurs étudiants
Après les ajouts, le compteur indique 2. Les noms « ahmed » et « sara » apparaissent dans la liste et un message confirme l’ajout avec succès.
 
Figure 3 — 3. Ajout de plusieurs étudiants.
4. Modification des noms
Les commandes « Modifier » et « Supprimer » sont visibles à côté de chaque étudiant. Les noms affichés sont devenus « ahmed belai » et « sara belai ». Cette étape montre la fonction de modification.
 
Figure 4 — 4. Modification des noms.
5. Présentation des étudiants sous forme de cartes
Chaque étudiant est affiché dans une zone distincte avec ses boutons d’action. Le compteur reste à 2 et l’interface est organisée pour faciliter la lecture.
 
Figure 5 — 5. Présentation des étudiants sous forme de cartes.
6. Ajout et modification d’un troisième étudiant
Le compteur indique 3. Le message « Étudiant modifié avec succès. » est visible et la liste contient « ahmed belai », « sara » et « amine blai ». Les boutons permettent toujours de modifier ou supprimer chaque entrée.
 
Figure 6 — 6. Ajout et modification d’un troisième étudiant.
7. Vérification de l’interface finale
La dernière capture montre la liste de trois étudiants, le compteur, le champ d’ajout et les deux actions disponibles pour chaque étudiant. Elle sert de vérification visuelle du résultat final.
 
Figure 7 — 7. Vérification de l’interface finale.
8. Tableau des tests fonctionnels
Fonction testée	Manipulation	Résultat attendu / observé
Liste vide	Ouvrir l’application sans étudiant dans la liste.	Le compteur indique 0 et un message indique que la liste est vide.
Ajout	Saisir un nom puis cliquer sur Ajouter.	Le nom apparaît et le compteur augmente.
Doublon	Saisir un nom déjà présent.	L’application affiche « Cet étudiant existe déjà. » et ne crée pas de doublon.
Modification	Cliquer sur Modifier et changer le nom.	Le nouveau nom est affiché et un message de confirmation apparaît.
Suppression	Cliquer sur Supprimer pour un étudiant.	L’étudiant disparaît et le compteur diminue.
Connexion	Cliquer sur le bouton de changement d’état.	Le message reflète l’état courant de connexion.
9. Résultat obtenu
Les captures confirment le fonctionnement des principales opérations de gestion des étudiants. La liste peut afficher plusieurs noms, le compteur suit le nombre d’étudiants, le doublon est détecté et les actions Modifier et Supprimer sont présentées à côté de chaque étudiant. L’interface affiche également les sections d’accueil et de gestion de connexion.
Remarque : les captures fournies démontrent les états affichés dans le navigateur. Elles ne permettent pas, à elles seules, de confirmer le contenu complet de chaque fichier source ni le comportement après fermeture complète du navigateur.
10. Conclusion
La réalisation de ce projet a permis de pratiquer les bases du développement avec Angular. Le travail relie la logique TypeScript, la structure HTML et la présentation CSS. Il met en pratique les signaux, la gestion des événements, les conditions d’affichage, la validation des saisies et la manipulation d’une liste. Les tests réalisés dans le navigateur permettent de vérifier les principales fonctionnalités de l’application.

