Laboratoire Forms — Angular ReactiveForms

Étudiant : Laziz Youcef

Matricule : 300160424

Projet : Forms

1. Objectif
   
L'objectif de ce laboratoire est de créer un formulaire simple avec NativeScript et Angular ReactiveForms. Le formulaire contient deux champs : Email et Username.

2. Création du formulaire
   
J'ai créé le formulaire dans le fichier home.component.html. J'ai ajouté deux champs de texte et un bouton sign up.

<img width="855" height="639" alt="image" src="https://github.com/user-attachments/assets/7bbeeed2-1969-4dea-9200-ed9b2ef8084c" />

Capture 1 — Code du formulaire dans home.component.html
 
3. Programmation avec Angular
   
Dans le fichier home.component.ts, j'ai utilisé FormGroup, FormBuilder et Validators.required pour gérer les deux champs. Quand je clique sur le bouton, les valeurs sont affichées dans la console.

<img width="855" height="625" alt="image" src="https://github.com/user-attachments/assets/74460267-1e5d-4100-85e7-adeeec39ca86" />

Capture 2 — Code Angular dans home.component.ts
 
4. Test sur l’émulateur Android
   
J'ai lancé l'application dans l'émulateur Android. J'ai saisi une adresse courriel et un nom d'utilisateur, puis j'ai cliqué sur sign up. Les informations sont apparues dans la console et la compilation s'est terminée avec succès.

<img width="870" height="622" alt="image" src="https://github.com/user-attachments/assets/92beb0dc-e8c5-40dc-a995-5f163c757e3f" />

Capture 3 — Formulaire sur Android et résultat dans la console
 
5. Résultat
   
Le formulaire s'affiche correctement sur l'émulateur. Les deux champs fonctionnent et le bouton permet de récupérer les valeurs saisies. Les captures ne montrent pas de message de validation à l'écran.

7. Conclusion
   
Ce laboratoire m'a permis de comprendre comment créer un formulaire avec NativeScript et Angular ReactiveForms. J'ai appris à relier les champs au code TypeScript et à vérifier les résultats dans la console.
