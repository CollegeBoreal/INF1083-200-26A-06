Laboratoire RxJS — Drapeaux du monde

Étudiant : Gaya Mahroug
Matricule : 300157423
Cours : INF1083
Projet : RxJS

1. Objectif

L’objectif de ce laboratoire est d’utiliser HttpClient et RxJS dans une application NativeScript Angular pour rechercher un pays et afficher son drapeau en couleurs.

2. Création du projet

J’ai créé un projet NativeScript Angular avec une navigation par onglets.

ns create b300157423 --template @nativescript/template-tab-navigation-ng

3. Modèle de données

J’ai créé le modèle Country avec trois propriétés : code représente le code du pays, name représente son nom et flag contient l’adresse de l’image du drapeau.
<img width="960" height="540" alt="Capture d’écran 2026-11-05 131814" src="https://github.com/user-attachments/assets/c8ef1173-7034-418d-8837-ba5516f114c4" />
4. Récupération des données avec RxJS

J’ai créé le service ApicallService pour récupérer les données de FlagCDN avec HttpClient. Le service retourne un Observable contenant une liste de pays. L’opérateur map transforme les données reçues pour obtenir le code, le nom et l’adresse du drapeau.

5. Recherche d’un pays

J’ai utilisé ngModel pour récupérer le nom saisi dans le champ. Lorsque j’appuie sur Rechercher, l’application filtre la liste. Les résultats sont affichés avec ListView et les drapeaux avec le composant Image.
<img width="267" height="445" alt="Capture d’écran 2026-11-05 131645" src="https://github.com/user-attachments/assets/e98b1f95-2105-44df-9d01-ee9cd4a70601" />


6. Commandes PowerShell

J’ai utilisé PowerShell pour créer des fichiers et adapter les composants pendant le développement. Cette capture montre une étape intermédiaire du travail, avec l’ancien exemple des capitales et les commandes de copie.
<img width="959" height="540" alt="Capture d’écran 2026-11-05 131734" src="https://github.com/user-attachments/assets/2bdded3c-4d0c-42d6-b798-d24f856c5d0d" />
7. Exécution de l’application

Dans le dossier b300157423, j’ai lancé cette commande :

ns run android

L’application a été exécutée dans l’émulateur Android. La recherche de Madagascar affiche son nom et son drapeau.

8. Résultat

Ce laboratoire m’a permis de pratiquer HttpClient, les observables RxJS et l’opérateur map. J’ai aussi appris à rechercher un pays et à afficher son drapeau en couleurs dans NativeScript.

9. Sources

https://flagcdn.com/

https://flagpedia.net/download/api
