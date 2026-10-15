TP Native Script — Captures et descriptions
Nom:Bouzidi
Prénom :Ouahiba
Matricule : 300157606 | Projet : B300157606

Introduction

  Dans ce travail pratique, j’ai installé et vérifié les outils nécessaires à Native Script, testé une application sur un émulateur Android et préparé les fichiers du projet avec Git.

Capture 1 — Vérification de Node.js

<img width="467" height="180" alt="etape 1" src="https://github.com/user-attachments/assets/198f0252-05c0-4fcd-86c1-bb765258d635" />

J’ai vérifié la version de Node.js et confirmé que le programme est bien installé.


Capture 2 — Installation de Native Script

<img width="467" height="488" alt="etape2" src="https://github.com/user-attachments/assets/5334d04f-a992-41b4-b559-15b5e126f90f" />

J’ai vérifié npm puis installé Native Script avec npm.cmd. Cette commande évite le blocage des scripts PowerShell.


Capture 3 — Version de Native Script

<img width="460" height="107" alt="etape3" src="https://github.com/user-attachments/assets/eee522a2-fdcc-49df-85c9-9a793b4d0f79" />

J’ai utilisé ns.cmd --version pour confirmer que Native Script est installé et à jour.


Capture 4 — Version de npm

<img width="443" height="71" alt="etape4" src="https://github.com/user-attachments/assets/75c2943c-99f5-4b0d-8255-42e1a5795868" />

J’ai vérifié la version de npm avec la commande npm.cmd --version.


Capture 5 — Vérification de Java

<img width="455" height="148" alt="etape5" src="https://github.com/user-attachments/assets/b0441d00-7136-4e9f-bef3-38f1f3da9327" />

J’ai vérifié les versions de Java et du compilateur javac.


Capture 6 — Recherche du dossier JDK

<img width="454" height="204" alt="etape6" src="https://github.com/user-attachments/assets/cdd0a02a-7563-4c83-a73e-a120d234f025" />

J’ai affiché le dossier Eclipse Adoptium pour retrouver l’installation du JDK.


Capture 7 — Confirmation du JDK

<img width="473" height="152" alt="etape7" src="https://github.com/user-attachments/assets/7ae45328-bf40-438c-b1b7-7ec85d5d6906" />

J’ai confirmé que Java et javac fonctionnent correctement.


Capture 8 — Première configuration JAVA_HOME

<img width="460" height="76" alt="etape8" src="https://github.com/user-attachments/assets/30cde343-082a-4d93-88e7-60b95a2f0b98" />

J’ai renseigné la variable JAVA_HOME dans PowerShell.


Capture 9 — Recherche de java.exe

<img width="452" height="214" alt="etape9" src="https://github.com/user-attachments/assets/b20c087c-2afc-424a-8041-6e859f7c57fa" />

J’ai recherché le fichier java.exe dans le dossier du JDK.


Capture 10 — Configuration du chemin Java

<img width="448" height="202" alt="etape10" src="https://github.com/user-attachments/assets/0871cad4-0755-4175-ad8a-63f0209079c9" />

J’ai corrigé JAVA_HOME et ajouté le dossier bin de Java au PATH de PowerShell.


Capture 11 — Vérification du SDK Android

<img width="468" height="73" alt="etape 11" src="https://github.com/user-attachments/assets/c396eeab-e7b1-4fbe-ac54-ff695df693cf" />

J’ai utilisé Test-Path pour confirmer la présence du SDK Android.


Capture 12 — Diagnostic Native Script

<img width="472" height="291" alt="etape12" src="https://github.com/user-attachments/assets/3d8713e5-e60a-4008-94d1-8a1da18c575c" />

J’ai vérifié la configuration de Native Script et d’Android. Le diagnostic ne signale aucun problème.


Capture 13 — Premier lancement de l’application

<img width="414" height="493" alt="etape 13" src="https://github.com/user-attachments/assets/9c3de3ab-1b8d-4b9b-a518-df2af79d5a36" />

J’ai lancé mon application Native Script dans l’émulateur Android.


Capture 14 — Informations de l’émulateur

<img width="717" height="419" alt="etape 14" src="https://github.com/user-attachments/assets/a656553c-179f-4461-89c8-45f49d885ab2" />

J’ai consulté les informations affichées lors du démarrage de l’émulateur.


Capture 15 — Informations de l’émulateur (suite)

<img width="227" height="398" alt="etape15 (2)" src="https://github.com/user-attachments/assets/e3e59057-0e9e-464a-9b79-15bc59a29344" />

J’ai observé les paramètres techniques de l’émulateur Android.

Capture 16 — Test du bouton TAP

<img width="267" height="497" alt="etape16 (2)" src="https://github.com/user-attachments/assets/a884b12a-f39a-4a9c-9fee-0ca3bfd2e950" />

J’ai appuyé sur le bouton TAP et obtenu le message de réussite dans l’application.

Capture 17 — Écran d’accueil Android

<img width="451" height="136" alt="etape17 (2) - Copie" src="https://github.com/user-attachments/assets/f04ec40f-fa84-4ddd-ba18-fe2f4646bb83" />

J’ai vérifié que l’émulateur revient correctement à son écran d’accueil.


Capture 18 — Vérification des nouveaux fichiers Git

<img width="470" height="128" alt="etape18 (2)" src="https://github.com/user-attachments/assets/19d38cfb-8808-45a2-9e04-a13bd9255c46" />

J’ai utilisé git status --short pour repérer les fichiers non encore suivis par Git.


Capture 19 — Vérification des fichiers ignorés

<img width="468" height="413" alt="etape19 (2)" src="https://github.com/user-attachments/assets/824808da-136f-402a-bd9b-8b4019d15524" />

J’ai utilisé git check-ignore pour vérifier que node_modules est ignoré.


Capture 20 — Fichiers préparés pour Git

<img width="433" height="430" alt="etape20 (2)" src="https://github.com/user-attachments/assets/872477f8-d0c5-4edd-934d-e6a81e0b3753" />

J’ai vérifié la liste des nouveaux fichiers préparés pour le commit.


Capture 21 — Liste des fichiers du projet

<img width="452" height="347" alt="etape21 (2)" src="https://github.com/user-attachments/assets/2d3dea37-7130-404a-a730-8e85193fe5c0" />

J’ai affiché les fichiers de l’application native Script , notamment les ressources iOS et les fichiers de configuration.


Capture 22 — Liste des fichiers indexés

<img width="451" height="257" alt="etape22 (2)" src="https://github.com/user-attachments/assets/6bf21a1a-a970-4b5d-bb53-0fb28976f8b2" />

J’ai utilisé git diff --cached --name-only pour afficher les fichiers prêts à être enregistrés.


Capture 23 — Première tentative de commit

<img width="445" height="195" alt="etape23" src="https://github.com/user-attachments/assets/8ed94f18-2a2e-4c2f-b560-16b248956c94" />

J’ai essayé de créer un commit, mais Git a demandé mon nom et mon adresse courriel.

Capture 24 — Configuration de mon identité Git

<img width="407" height="101" alt="etape24" src="https://github.com/user-attachments/assets/3e5a3248-4400-4175-99ab-34e8e7ce5812" />

J’ai configuré mon nom et mon adresse courriel, puis vérifié les valeurs enregistrées.


Capture 25 — Vérification du commit local

<img width="462" height="340" alt="etape25" src="https://github.com/user-attachments/assets/55ed1331-e21e-4936-ae4a-2063e407e00a" />

J’ai utilisé git status. Le dépôt est propre et un commit local reste à envoyer vers GitHub.


Capture 26 — Structure du dossier de travail

<img width="743" height="500" alt="etape26" src="https://github.com/user-attachments/assets/1d7c18dc-a5e0-41bf-8d9e-a286efd35f79" />

J’ai utilisé dir pour vérifier le projet B300157606, le dossier images et le fichier README.md.


Capture 27 — Diagnostic Android

<img width="475" height="313" alt="etape27" src="https://github.com/user-attachments/assets/8bc9de6c-8511-4259-bd3f-122c57cd7ff5" />

J’ai exécuté ns.cmd doctor android. Aucun problème de configuration n’a été détecté.


Capture 28 — Compilation et synchronisation

<img width="473" height="271" alt="etape28" src="https://github.com/user-attachments/assets/87b990ac-b9bc-47ab-896d-4bd7fd7a4f01" />

J’ai vérifié que la compilation a réussi et que l’application a été synchronisée avec l’émulateur.

Capture 29 — Vérification du fichier README.md

J’ai ouvert README.md avec Notepad et vérifié qu’il est présent dans mon dossier de travail.


Conclusion:

  Ce TP m’a permis de configurer mon environnement NativeScript, de lancer et tester une application Android et de préparer les fichiers pour Git. Le commit local est créé, mais son envoi sur GitHub doit encore être confirmé.
