Rapport de laboratoire 

1. Informations générales

Laboratoire : NativeScript – Forms
Numéro étudiant : B300147891
Nom du projet : B300147891-Forms
Environnement : Visual Studio Code, PowerShell, Android Studio et NativeScript

2. Objectif du laboratoire

L’objectif de ce laboratoire était de créer un formulaire d’inscription avec NativeScript et Angular.

Le formulaire devait permettre à un utilisateur de saisir ses informations, de vérifier leur validité et d’afficher un message selon le résultat de l’inscription.

3. Réalisation du travail

J’ai commencé par créer mon projet NativeScript avec la commande suivante :

ns create B300147891-Forms --template @nativescript/template-blank-ng

Ensuite, j’ai ouvert le projet dans Visual Studio Code pour modifier les fichiers home.component.html et home.component.ts.

<img width="1043" height="1092" alt="Capture d&#39;écran 2026-11-12 103950" src="https://github.com/user-attachments/assets/7d65ff70-f78b-4bb8-ba4b-3316fc088d21" />


J’ai créé un formulaire contenant les éléments suivants :

Un champ pour l’adresse email.
Un champ pour le nom d’utilisateur.
Un champ pour le mot de passe.
Un champ pour confirmer le mot de passe.
Un bouton Show/Hide pour afficher ou masquer le mot de passe.
Un bouton SIGN UP pour valider l’inscription.
Un bouton RESET pour réinitialiser le formulaire.
Un message indiquant si l’inscription a réussi ou échoué.
J’ai utilisé ReactiveFormsModule et NativeScriptFormsModule pour gérer le formulaire.

<img width="992" height="578" alt="Capture d&#39;écran 2026-11-12 115335" src="https://github.com/user-attachments/assets/0cbcd223-ba4c-4b52-94a2-a53446153be9" />


4. Validation des données

J’ai ajouté plusieurs vérifications pour éviter que l’utilisateur envoie des informations incorrectes.

<img width="632" height="935" alt="Capture d&#39;écran 2026-11-12 120906" src="https://github.com/user-attachments/assets/ed4d466c-193c-499c-b319-a09f561d61b7" />


Le formulaire vérifie que :

Tous les champs obligatoires sont remplis.
L’adresse email possède un format valide.
Le mot de passe contient au moins six caractères.
Le mot de passe et sa confirmation sont identiques.
Lorsque les informations sont incorrectes, un message d’erreur apparaît en rouge.

Lorsque les informations sont correctes, le message suivant apparaît en vert :

Account created successfully!

<img width="670" height="928" alt="Capture d&#39;écran 2026-11-12 121005" src="https://github.com/user-attachments/assets/e494ef53-c3bc-4558-9159-9d48a61feadf" />


5. Tests effectués

Test 1 : fonctionnement du formulaire

J’ai lancé l’application sur l’émulateur Android avec la commande :

ns run android

L’application s’est ouverte et les champs du formulaire étaient visibles.

J’ai saisi une adresse email et un nom d’utilisateur pour vérifier le fonctionnement des champs.

Test 2 : vérification de la console

J’ai cliqué sur le bouton SIGN UP pour vérifier si les informations étaient récupérées.

Le résultat suivant s’est affiché dans PowerShell :

{"email":"amad@gmail.com","username":"Amadou"}

<img width="796" height="162" alt="image" src="https://github.com/user-attachments/assets/30ebe439-9c85-40cd-9176-95ee2c9d04c8" />


Ce test a confirmé que l’application pouvait récupérer et afficher les données du formulaire.

Test 3 : adresse email incorrecte

J’ai saisi une adresse email sans le caractère @.

Après avoir cliqué sur SIGN UP, le message suivant est apparu :

Please complete all fields correctly.

Le formulaire a donc refusé l’inscription avec une adresse email invalide.

Test 4 : inscription réussie

J’ai corrigé l’adresse email et rempli les autres champs avec des informations valides.

Après avoir cliqué sur SIGN UP, le message suivant est apparu :

Account created successfully!

Ce test a confirmé que la validation du formulaire fonctionnait correctement.

6. Difficultés rencontrées

Pendant ce laboratoire, j’ai rencontré plusieurs difficultés.

Première difficulté : configuration du SDK Android

Au début, NativeScript ne reconnaissait pas le SDK Android installé sur mon ordinateur.

J’ai utilisé PowerShell pour vérifier les versions Android disponibles et les Build-Tools.

Ensuite, j’ai configuré temporairement la variable d’environnement ANDROID_HOME pour indiquer à NativeScript l’emplacement du SDK.

Après cette correction, la commande ns doctor android n’affichait plus d’erreur.

Deuxième difficulté : démarrage de l’émulateur

L’émulateur Android affichait des messages indiquant que Pixel Launcher ne répondait pas.

J’ai attendu que l’émulateur termine son démarrage et que l’application soit chargée.

Troisième difficulté : erreur Angular NG01203

Au premier lancement, une erreur apparaissait à cause de l’utilisation de formControlName avec les champs TextField.

Pour résoudre ce problème, j’ai ajouté NativeScriptFormsModule dans les imports du composant Angular.

Après cette modification, le formulaire s’est affiché correctement.

7. Résultat obtenu

À la fin du laboratoire, j’ai réussi à créer un formulaire d’inscription fonctionnel avec NativeScript et Angular.

Les champs sont visibles et les informations saisies sont vérifiées.

J’ai également confirmé que l’application affiche un message d’erreur lorsque l’adresse email est incorrecte et un message de réussite lorsque les informations sont valides.


<img width="567" height="838" alt="Capture d&#39;écran 2026-11-12 120759" src="https://github.com/user-attachments/assets/d9bc1173-623b-4961-adba-3baa4c4353b2" />


8. Conclusion

Ce laboratoire m’a permis de mieux comprendre l’utilisation des formulaires réactifs avec Angular et NativeScript.

J’ai appris à créer des champs de saisie, à utiliser des validateurs, à gérer les boutons et à afficher des messages selon les informations fournies.

J’ai aussi appris à vérifier la configuration du SDK Android et à résoudre certaines erreurs rencontrées pendant l’exécution de l’application.

Malgré les difficultés, j’ai réussi à faire fonctionner mon formulaire sur l’émulateur Android.


