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

![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/ff41bc7f2b0987185203c9b7906b60834901ba5d/4.Forms/300160006/images/Screenshot%202026-10-26%20110227.png)
![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/80f0dc7423fe3bf769526d1f6c566faa2f3dda49/4.Forms/300160006/images/Screenshot%202026-10-26%20110340.png)

## Amélioration de l'apparence

Après avoir fait fonctionner le formulaire, j'ai amélioré son apparence pour qu'il soit plus clair et plus agréable à utiliser, sans changer sa logique (le composant `home.component.ts` reste identique).

### Modifications dans `home.component.html`

- Une barre de titre **Inscription** colorée (`ActionBar`).
- Un titre « Créer un compte » et un sous-titre qui expliquent le but de la page.
- Une étiquette au-dessus de chaque champ (« Courriel » et « Nom d'utilisateur »), à la place des seuls textes d'indication.
- Des textes d'aide plus parlants : `nom@exemple.com` pour le courriel.
- `autocorrect="false"` et `autocapitalizationType="none"` sur les champs, pour éviter que le clavier corrige ou mette des majuscules dans un courriel ou un nom d'utilisateur.
- Un bouton **S'inscrire** désactivé tant que le formulaire est invalide (`[isEnabled]="signUpForm.valid"`), avec un style grisé (`[class.su-btn-disabled]`).
- Un message rouge « Les deux champs sont obligatoires », visible seulement quand le formulaire est invalide (`[visibility]`).

### Modifications dans `app.css`

J'ai ajouté des classes CSS **préfixées `su-`** (pour *sign up*) afin d'éviter les conflits avec les classes du thème NativeScript, qui utilise déjà des noms comme `.btn`, `.input` ou `.title`.

| Classe | Rôle |
|---|---|
| `.su-header` | Barre de titre bleue avec texte blanc |
| `.su-page` | Marges intérieures et fond gris clair |
| `.su-title` / `.su-subtitle` | Titre en gras et sous-titre gris |
| `.su-label` | Étiquette des champs |
| `.su-input` | Champ avec bordure fine, coins arrondis et fond blanc |
| `.su-btn` / `.su-btn-disabled` | Bouton bleu arrondi, et sa version pâle quand il est désactivé |
| `.su-hint` | Message d'erreur rouge centré |

Les propriétés `placeholder-color` et `horizontal-alignment` sont propres à NativeScript : VS Code les souligne comme inconnues, mais elles fonctionnent dans l'application.

### Résultat

Le formulaire affiche maintenant un titre, deux champs bien identifiés et un bouton qui ne s'active que lorsque les deux champs sont remplis. Le comportement demandé par l'exercice est inchangé : en appuyant sur le bouton, le courriel et le nom d'utilisateur s'affichent dans la console.

![images alt](

## 7. Conclusion

Ce laboratoire m'a permis de comprendre comment créer un formulaire avec les Reactive Forms d'Angular dans NativeScript. J'ai appris à utiliser `FormBuilder`, `FormGroup` et `Validators.required`, ainsi qu'à récupérer et afficher les valeurs saisies dans la console.
