# 4. Forms — Formulaire NativeScript et Angular

*Étudiant :* Islem Touadjni  
*Projet :* B300159195  
*Cours :* INF1083

## Résultat final

<img width="945" height="2048" alt="4 Capture d’écran 2026-10-15 113623 png" src="https://github.com/user-attachments/assets/cda2ea40-aaa9-476a-bb48-d6ccd0848257" />

## Présentation du travail

Dans ce travail, j'ai réalisé une application mobile avec NativeScript et Angular. J'ai créé un formulaire d'inscription contenant deux champs obligatoires : une adresse courriel et un nom d'utilisateur.

L'utilisateur remplit les champs, puis appuie sur le bouton « Créer mon compte ». L'application vérifie que les deux champs sont remplis. Si le formulaire est valide, elle affiche un message de confirmation sur le téléphone et les valeurs saisies dans la console PowerShell.

Le projet utilise Angular Reactive Forms pour gérer les champs et leur validation. J'ai également ajouté une mise en forme avec CSS pour améliorer la présentation de l'application.

## Création et exécution du projet

J'ai créé le projet NativeScript avec le modèle Angular :

powershell
ns create B300159195 --template @nativescript/template-blank-ng


J'ai ensuite ouvert le projet dans VS Code pour modifier la page principale. Pour tester l'application sur mon téléphone Android connecté à l'ordinateur, j'ai utilisé :

powershell
ns run android


## Réalisation de l'interface

Dans src/app/home/home.component.html, j'ai créé la structure de la page avec un titre, une présentation du projet et une carte contenant le formulaire.

Les deux champs TextField utilisent formControlName="email" et formControlName="username" pour être liés au formulaire réactif. Le bouton appelle la méthode onButtonTap() lors d'un appui. Un élément Label permet d'afficher le message de validation ou de confirmation.

<img width="1920" height="1126" alt="1 Capture d’écran 2026-10-15 113623" src="https://github.com/user-attachments/assets/541dc07f-3603-4404-b931-8fb28ae670d8" />

J'ai défini l'apparence dans src/app/home/home.component.css : couleurs, cartes, espaces, champs de saisie et bouton. Le résultat est une interface plus lisible sur le téléphone.

## Gestion et validation du formulaire

Dans src/app/home/home.component.ts, j'ai créé le formulaire avec
FormBuilder et FormGroup. Les champs email et username utilisent
Validators.required : ils doivent être remplis avant l'envoi.

J'ai aussi importé ReactiveFormsModule et NativeScriptFormsModule
pour relier les champs de l'interface au formulaire.

<img width="1920" height="852" alt="2 Capture d’écran 2026-10-15 113928" src="https://github.com/user-attachments/assets/b6f00747-a106-449d-ba53-182510948803" />

Dans la méthode onButtonTap() :

- Si un champ est vide, l'application affiche « Veuillez remplir les deux champs. ».
- Si les deux champs sont remplis, elle affiche leurs valeurs dans PowerShell et présente un message de confirmation sur le téléphone.
## Vérification sur Android

Au démarrage, l'application affiche les deux champs vides et le bouton « Créer mon compte ».

<img width="945" height="2048" alt="3 Capture d’écran 2026-10-15 113623 png" src="https://github.com/user-attachments/assets/b00386de-b922-4e06-ae2d-81608387c24f" />


J'ai ensuite rempli les champs et appuyé sur le bouton. Le message « Formulaire envoyé avec succès ! » est apparu, comme le montre la figure 1 au début du README.

Enfin, j'ai vérifié dans PowerShell que les valeurs des champs email et username étaient affichées au format JSON.

<img width="992" height="70" alt="5 Capture d’écran 2026-10-15 123053" src="https://github.com/user-attachments/assets/786fe890-1c11-4be9-bb29-73093dbb0cbc" />

## Conclusion

J'ai créé et testé un formulaire réactif NativeScript et Angular sur un téléphone Android. Les champs obligatoires sont vérifiés, un message indique le résultat dans l'application et les valeurs saisies apparaissent dans la console
