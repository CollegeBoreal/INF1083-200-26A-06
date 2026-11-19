# 4.Forms - ReactiveForms

## Description
Dans ce laboratoire, j'ai appris à utiliser les Reactive Forms avec Angular et NativeScript.

## Objectifs
- Créer un formulaire avec FormBuilder.
- Ajouter les champs Email et Username.
- Utiliser Validators.required pour vérifier les champs.
- Afficher les données du formulaire dans la console avec JSON.stringify().

## Fonctionnement
Le formulaire contient deux champs : Email et Username.
Le bouton Envoyer est activé lorsque les deux champs sont remplis.
Lorsque je clique sur le bouton, les données sont affichées dans la console.

## Captures d'écran
<img width="1029" height="715" alt="image" src="https://github.com/user-attachments/assets/e7d07252-1952-481d-b08b-aa598bfd37dc" />
Affichage du fichier home.component.html dans un projet NativeScript / Angular (B300157727), présentant un formulaire structuré avec ActionBar et StackLayout ([formGroup]="signUpForm"), les champs email (TextField) et username (TextField), ainsi qu'un bouton Envoyer lié à (tap)="onButtonTap()"
<img width="651" height="703" alt="image" src="https://github.com/user-attachments/assets/46706493-e06c-44d4-af02-f8bd08120c51" />
Aperçu de l'application « Reactive Forms » en cours d'exécution sur l'émulateur Android (emulator-5554) avec les champs remplis (test@gmail.com. et Rayan.) et le clavier affiché à l'écran, devant la fenêtre PowerShell ISE montrant le suivi de compilation et de synchronisation.
<img width="675" height="629" alt="image" src="https://github.com/user-attachments/assets/bff4f2ce-9da5-4356-ae2b-7817aae4f48d" />
Sortie console montrant la synchronisation réussie de l'application org.nativescript.B300157727 sur emulator-5554, la compilation incrémentale Webpack (webpack 5.112.2 compiled), ainsi que les objets JSON affichés dans la console lors des tests du formulaire (incluant {"email":"test@gmail.com","username":"Rayan"}).

