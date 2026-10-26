# Laboratoire 8 — Forms

**Cours :** INF1083 — Développement d'applications natives  
**Étudiante :** Maimouna Ndiaye  
**Numéro d'étudiant :** 300160006  
**Projet :** B300160006

## 1. Objectif du laboratoire

L'objectif de ce laboratoire est de comprendre les layouts et les formulaires dans Angular avec NativeScript.

Dans cet exercice, j'ai créé un formulaire d'inscription avec les Reactive Forms d'Angular. Le formulaire contient deux champs : Email et Username, ainsi qu'un bouton Sign up pour afficher les informations saisies dans la console.

## 2. Création du projet

J'ai créé un répertoire portant mon numéro d'étudiant `300160006`. À l'intérieur, j'ai ajouté le fichier `README.md`, le répertoire `images` et le projet NativeScript `B300160006`.

## 3. Réalisation du formulaire

J'ai modifié le fichier `home.component.html` pour créer l'interface du formulaire.

Les éléments utilisés sont :

- `StackLayout` : permet de placer les éléments les uns sous les autres.
- `TextField` : permet à l'utilisateur de saisir son adresse courriel et son nom d'utilisateur.
- `formGroup` : relie l'interface au formulaire Angular.
- `formControlName` : relie chaque champ à son contrôle dans le formulaire.
- `Button` : permet de déclencher la méthode `onButtonTap()`.

Ensuite, j'ai modifié le fichier `home.component.ts` pour configurer le formulaire avec `FormBuilder`, `FormGroup` et `Validators.required`.

J'ai également ajouté la méthode `onButtonTap()` pour afficher les valeurs du formulaire dans la console avec `console.log()` et `JSON.stringify()`.
![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/a3d7de390fd04be74db4b55306d75cf5e22638b4/4.Forms/300160006/images/Screenshot%202026-10-26%20110422.png)
## 4. Fonctionnement des Reactive Forms

Les Reactive Forms permettent de gérer les champs et les valeurs d'un formulaire dans le fichier TypeScript.

- `FormBuilder` permet de créer le formulaire.
- `FormGroup` regroupe les champs du formulaire.
- `Validators.required` indique que les champs sont obligatoires.
- `ngOnInit()` initialise le formulaire au démarrage du composant.
- `onButtonTap()` récupère et affiche les valeurs saisies.

  ![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/8ea2fa2367656526b61003210c28321e53425e25/4.Forms/300160006/images/Screenshot%202026-10-26%20110442.png)

## 5. Résultat obtenu

Après avoir lancé l'application sur l'émulateur Android, j'ai affiché le formulaire avec les champs Email et Username et le bouton Sign up.

Lorsque je saisis les informations et que j'appuie sur le bouton, les valeurs sont affichées dans la console.

Exemple de résultat attendu :

```json
{"email":"mai@email.com","username":"Maimouna"}
```

## 6. Captures d'écran





## 7. Conclusion

Ce laboratoire m'a permis de comprendre comment créer un formulaire avec les Reactive Forms d'Angular dans NativeScript. J'ai appris à utiliser `FormBuilder`, `FormGroup` et `Validators.required`, ainsi qu'à récupérer et afficher les valeurs saisies dans la console.
