# Laboratoire — Forms

**Cours :** INF1083 — Développement d'applications natives
**Étudiant :** Amadou Sow
**Numéro d'étudiant :** 300159672
**Projet :** B300159672
**Environnement :** macOS, Visual Studio Code, simulateur iOS

## 1. Objectif du laboratoire

L'objectif de ce laboratoire est de comprendre les layouts et les formulaires d'Angular avec NativeScript.

J'ai créé un formulaire d'inscription avec les Reactive Forms. Il contient deux champs, Email et Username, et un bouton « sign up » qui affiche les valeurs saisies dans la console.

## 2. Création du projet

J'ai créé mon dossier `300159672` dans `4.Forms`, avec le fichier `README.md` et le dossier `images`, puis le projet NativeScript avec le modèle `blank-ng` :

```bash
cd ~/Developer/INF1083-200-26A-06/4.Forms/300159672
ns create B300159672 --template @nativescript/template-blank-ng
cd B300159672
```

<img width="752" height="871" alt="Capture d’écran 2026-11-19 à 11 22 39" src="https://github.com/user-attachments/assets/0b44dbd3-7477-497d-93b4-8413a28ece94" />


## 3. Réalisation du formulaire

J'ai remplacé le `GridLayout` de `home.component.html` par un `StackLayout` contenant le formulaire :

```html
<StackLayout [formGroup]="signUpForm">
    <TextField formControlName="email" hint="Email" keyboardType="email"></TextField>
    <TextField formControlName="username" hint="Username"></TextField>
    <Button text="sign up" (tap)="onButtonTap()"></Button>
</StackLayout>
```

- `StackLayout` place les éléments les uns sous les autres ;
- `TextField` permet de saisir le courriel et le nom d'utilisateur ;
- `formGroup` relie l'interface au formulaire Angular ;
- `formControlName` relie chaque champ à son contrôle ;
- `(tap)` appelle la méthode `onButtonTap()` quand on touche le bouton.

Dans `home.component.ts`, j'ai configuré le formulaire avec `FormBuilder`, `FormGroup` et `Validators.required` :

```typescript
signUpForm: FormGroup;

constructor(private formBuilder: FormBuilder) { }

ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
        email: ["", Validators.required],
        username: ["", Validators.required],
    });
}

onButtonTap() {
    console.log(JSON.stringify(this.signUpForm.value));
}
```

## 4. Fonctionnement des Reactive Forms

- `FormBuilder` crée le formulaire ;
- `FormGroup` regroupe les champs ;
- `Validators.required` rend les champs obligatoires ;
- `ngOnInit()` initialise le formulaire au démarrage du composant ;
- `onButtonTap()` affiche les valeurs saisies avec `console.log()` et `JSON.stringify()`.

## 5. Résultat obtenu

J'ai lancé l'application sur le simulateur iOS :

```bash
open -a Simulator
ns run ios
```

Après avoir saisi un courriel et un nom d'utilisateur et touché « sign up », le terminal affiche les valeurs :

```json
{"email":"Amadou@email.com","username":"Amadou"}
```

La capture montre à droite le formulaire rempli dans le simulateur, et à gauche la console avec le résultat.

<img width="1512" height="982" alt="FOrmulaire et consulaire" src="https://github.com/user-attachments/assets/b7e47966-fb85-4388-9f6f-97c07c9d4da9" />


## 6. Problèmes rencontrés

**Modules manquants.** Avec le code de l'énoncé, l'application affichait l'erreur :

```text
ERROR Error: NG01203: No value accessor for form control name: 'email'
```

Les champs `TextField` n'étaient pas reliés au formulaire. J'ai ajouté `ReactiveFormsModule` (venant de `@angular/forms`) et `NativeScriptFormsModule` (venant de `@nativescript/angular`) dans les `imports` du composant. L'erreur a disparu et les valeurs saisies s'affichent bien dans la console.

**NativeScript introuvable.** Après le changement de version de Node pour le labo Angular, la commande `ns` n'était plus reconnue. Je l'ai réinstallée avec `npm install -g nativescript`.

**Premier lancement long.** La compilation Xcode a pris environ dix minutes, et macOS a demandé l'accès au trousseau pour télécharger les paquets Swift depuis GitHub.

## 7. Conclusion

Ce laboratoire m'a permis de créer un formulaire avec les Reactive Forms d'Angular dans NativeScript, avec `FormBuilder`, `FormGroup` et `Validators.required`, et d'afficher les valeurs saisies dans la console. J'ai aussi compris qu'il faut importer `ReactiveFormsModule` et `NativeScriptFormsModule` pour relier les champs au formulaire.
