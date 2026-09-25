# Application NativeScript - Légendes du Football
<img width="333" height="709" alt="Screenshot 2026-09-25 150203" src="https://github.com/user-attachments/assets/611bfe7b-80e9-403f-b1b2-8767c1457d54" />
Rapport de Projet : Première Application Mobile NativeScript Angular

Ce projet documente la création, la configuration de l'environnement, la résolution des erreurs de dépendances et le déploiement sur émulateur Android de ma première application mobile développée avec NativeScript et Angular.

Vérification des Prérequis et de l'Environnement

Avant le lancement du projet, plusieurs vérifications de l'environnement de développement ont été effectuées dans l'invite de commande PowerShell :
<img width="677" height="260" alt="1" src="https://github.com/user-attachments/assets/4b5e5abc-79b5-4349-8eaa-06f8e59a3fff" />
Accès au dossier : Navigation dans le répertoire du projet avec la commande cd .\2.NativeScript\ puis vérification des fichiers présents avec ls.   Génération de l'application : Lancement de la commande ns create B300159203 pour créer le projet sous mon matricule.   Choix des options : Sélection du framework Angular et du modèle de départ Hello World.   
<img width="626" height="757" alt="Screenshot 2026-09-24 110241" src="https://github.com/user-attachments/assets/3ad41c9e-7681-4c6a-8f6e-4329e85acc00" />

Exécution et déploiement de l'applicationAprès 
avoir démarré l'émulateur Android, j'ai lancé la compilation et la synchronisation de l'application avec la commande :PowerShellns run android
Pendant cette étape, une erreur de typage TypeScript est survenue dans person-detail.component.html, que j'ai corrigée dans le composant Angular.   
L'application a ensuite été compilée avec succès via Gradle :PlaintextProject successfully built.
Successfully installed on device with identifier 'emulator-5554'.
Successfully synced application org.nativescript.B300159203 on device emulator-5554.
Résultat finalL'application NativeScript Angular présentant la liste des légendes du football (Best Football Players Ever) s'exécute et fonctionne parfaitement sur l'émulateur Android.  

<details><summary>🪵 Logs d'exécution et vérification de l'environnement</summary>

```bash
ns doctor
✔ Getting environment information 
✔ Javac is installed and is configured properly.
✔ The Java Development Kit (JDK) is installed and is configured properly.
✔ Xcode is installed and is configured properly.
✔ CocoaPods are installed.
ns run android
Searching for devices...
Preparing project...
Webpack compilation complete. Watching for file changes.
Project successfully prepared (android)
Building project...
Gradle build...
Project successfully built.

Installing on device...
Successfully installed on device.
Restarting application on device...
 Angular is running in development mode.
 NativeScript debugger has opened inspector socket.
Successfully synced application on device.
