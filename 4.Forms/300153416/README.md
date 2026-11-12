Laboratoire sur les Formulaires Réactifs dans NativeScript

Ce travail pratique (TP) s'inscrit dans le cadre du cours de développement mobile et vise à explorer l'utilisation des formulaires réactifs (Reactive Forms) avec Angular dans une application NativeScript.

Objectifs du TP

Compréhension des Layouts : Apprendre à structurer les interfaces mobiles en utilisant des conteneurs de mise en page adaptés, notamment le StackLayout.

Gestion des Formulaires Réactifs : Maîtriser l'utilisation du module ReactiveFormsModule d'Angular pour gérer les saisies utilisateur de manière structurée et sécurisée.

Étapes de Réalisation

Configuration de l'interface (home.component.html) : L'interface utilisateur est construite en remplaçant les éléments par défaut par un conteneur principal StackLayout relié au groupe de formulaires [formGroup]="signUpForm". Elle contient deux champs de texte (TextField) pour l'e-mail et le nom d'utilisateur, ainsi qu'un bouton de soumission (Button) déclenchant l'action de validation (onButtonTap()).

Logique du Composant (home.component.ts) : Dans le code TypeScript, le service FormBuilder est injecté via le constructeur pour initialiser le formulaire dans la méthode ngOnInit. Le formulaire utilise des validateurs (Validators.required) pour s'assurer que les champs obligatoires ne sont pas vides :
this.signUpForm = this.formBuilder.group({
email: ["", Validators.required],
username: ["", Validators.required],
});

Résultat Attendu
L'exercice a pour but final de capturer les données saisies par l'utilisateur (le courriel et le nom d'utilisateur) et de les afficher sous forme de chaîne JSON dans la console de l'application lors de l'appui sur le bouton de validation (onButtonTap).
<img width="2040" height="1536" alt="7" src="https://github.com/user-attachments/assets/373c81fc-0b2c-4b6d-9577-31ee83106935" />
<img width="2040" height="1536" alt="77" src="https://github.com/user-attachments/assets/b01db452-6fb3-4fce-8a7c-40fe9c442019" />
<img width="2040" height="1536" alt="777" src="https://github.com/user-attachments/assets/0a0edd33-9817-4b51-92c2-45c1a409102f" />
<img width="2040" height="1536" alt="7777" src="https://github.com/user-attachments/assets/2fa7ed19-f05b-4dcd-bac0-2d32ea2c57f7" />




