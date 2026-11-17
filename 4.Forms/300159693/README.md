# Rapport final – Laboratoire 4.Forms
## INF1083 – Développement avec NativeScript et Angular

**Nom et prénom :** Mekaouche Mazigh  
**Numéro étudiant :** 300159693  
**Laboratoire :** 4.Forms – ReactiveForms  
**Date :** 17 novembre 2026

---

### 1. Introduction

Dans ce laboratoire, j'ai travaillé avec NativeScript et Angular afin de comprendre le fonctionnement des formulaires (Forms) et des différents éléments de mise en page (Layout).

L'objectif principal était de créer un formulaire ReactiveForms contenant deux champs : Email et Username. J'ai également configuré un bouton permettant d'afficher les informations saisies dans la console.

### 2. Création du projet

J'ai commencé par récupérer le dépôt GitHub du cours INF1083-200-26A-06.

Ensuite, j'ai créé mon répertoire personnel avec mon numéro étudiant 300159693 dans le dossier 4.Forms.

J'ai créé le projet NativeScript Angular suivant :

`B300159693`

J'ai également conservé le fichier README.md et le répertoire images demandés dans les consignes.

### 3. Configuration du formulaire ReactiveForms

J'ai travaillé dans les fichiers suivants :

- `src/app/home/home.component.ts`
- `src/app/home/home.component.html`

Dans le fichier TypeScript, j'ai configuré les éléments suivants :

- FormBuilder : pour construire le formulaire.
- FormGroup : pour regrouper les champs.
- Validators.required : pour rendre les champs obligatoires.
- ReactiveFormsModule : pour utiliser les formulaires réactifs d'Angular.
- NativeScriptFormsModule : pour assurer la liaison avec les champs NativeScript.

J'ai créé deux contrôles :

- email
- username

### 4. Création de l'interface

Dans le fichier HTML, j'ai créé une interface contenant :

1. Un champ Email.
2. Un champ Username.
3. Un bouton Sign Up.

J'ai utilisé les éléments StackLayout, TextField et Button de NativeScript.

### 5. Configuration du bouton

J'ai ajouté la méthode `onButtonTap()` dans le composant HomeComponent.

Cette méthode permet de récupérer les informations du formulaire et de les afficher dans la console au format JSON.
![Uploading Capture d'écran 2026-11-17 174109.png…]()


Code utilisé :

```typescript
onButtonTap() {
  console.log(JSON.stringify(this.signUpForm.value));
}
```

### 6. Test et vérification

J'ai lancé mon application sur l'émulateur Android Pixel 9a avec la commande :

```powershell
ns run android
```

Après la compilation, j'ai testé le formulaire avec les informations suivantes :

- Email : test@gmail.com
- Username : Mazigh
<img width="286" height="494" alt="Capture d&#39;écran 2026-11-17 174516" src="https://github.com/user-attachments/assets/8b612346-77a3-45dc-b6f2-fe12c604e514" />

Après avoir cliqué sur le bouton Sign Up, j'ai obtenu le résultat suivant dans la console :

```json
{
  "email": "test@gmail.com",
  "username": "Mazigh"
}
```
<img width="698" height="155" alt="Capture d&#39;écran 2026-11-17 174747" src="https://github.com/user-attachments/assets/9dbf12f2-8a81-48b3-a60b-c49d1210158d" />


Ce résultat confirme que les deux champs fonctionnent correctement et que les données sont récupérées par le formulaire ReactiveForms.



### 8. Conclusion

Ce laboratoire m'a permis de mieux comprendre le fonctionnement des formulaires ReactiveForms avec Angular et NativeScript.

J'ai appris à utiliser FormBuilder, FormGroup et Validators pour créer un formulaire, à récupérer les informations saisies et à les afficher dans la console.

J'ai également appris à tester une application sur un émulateur Android et à publier mon travail sur GitHub avec Git.

Le résultat final correspond à l'objectif demandé dans ce laboratoire : afficher le courriel et le nom d'utilisateur dans la console après avoir cliqué sur le bouton Sign Up.
