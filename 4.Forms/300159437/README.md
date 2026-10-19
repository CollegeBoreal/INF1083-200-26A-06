# 📱 Laboratoire NativeScript Angular — Reactive Forms

**Cours :** INF1083 — Développement d'applications mobiles  
**Projet :** B300159437  
**Technologies :** NativeScript, Angular, TypeScript et Android Studio

---

## 🎯 1. Objectif du laboratoire

L'objectif de ce laboratoire est de comprendre le fonctionnement des layouts et des formulaires réactifs (*Reactive Forms*) dans une application mobile développée avec NativeScript et Angular.

À la fin du laboratoire, nous devons être capables de :

- Créer une application mobile avec NativeScript et Angular.
- Utiliser les composants de mise en page comme `StackLayout`.
- Créer un formulaire réactif avec `FormBuilder` et `FormGroup`.
- Récupérer les informations saisies par l'utilisateur.
- Vérifier les champs obligatoires avec `Validators.required`.
- Afficher les informations du formulaire dans la console.
- Tester l'application sur un émulateur Android.

## 📁 2. Structure du projet

Pour organiser mon travail, j'ai créé un répertoire portant mon identifiant étudiant, contenant un fichier `README.md` et un dossier `images`.

```text
300159437/
├── README.md
├── images/
│   ├── Screenshot 2026-10-18 155653.png
│   ├── Screenshot 2026-10-18 173832.png
│   └── Screenshot 2026-10-18 173846.png
└── B300159437/
    └── src/
        └── app/
            └── home/
                ├── home.component.ts
                └── home.component.html
```

## ⚙️ 3. Création et configuration de l'application

J'ai utilisé NativeScript avec Angular pour développer mon application mobile.

**Commande de création :**

```bash
ns create B300159437 --template @nativescript/template-blank-ng
```

Ensuite, j'ai ouvert le projet dans Visual Studio Code :

```bash
cd B300159437
code .
```

Pour lancer l'application sur l'émulateur Android :

```bash
ns run android
```

Cette commande permet de compiler le projet et de le déployer sur un appareil Android virtuel.

## 🧱 4. Comprendre les layouts

Dans NativeScript, les layouts permettent d'organiser les éléments graphiques d'une application.

Dans ce laboratoire, j'ai principalement utilisé `StackLayout`.

Ce composant permet de placer plusieurs éléments les uns à la suite des autres, verticalement ou horizontalement.

Il facilite l'organisation des champs de saisie, des textes et des boutons.

## 📝 5. Création du formulaire réactif

J'ai développé un formulaire permettant à un utilisateur de saisir deux informations :

- Son adresse électronique.
- Son nom d'utilisateur.

Le formulaire utilise les composants `FormGroup`, `FormBuilder` et `Validators` du module Angular Forms.

### Configuration du formulaire

```typescript
signUpForm: FormGroup;

constructor(private formBuilder: FormBuilder) {}

ngOnInit(): void {
  this.signUpForm = this.formBuilder.group({
    email: ["", Validators.required],
    username: ["", Validators.required]
  });
}
```

**Explication :**

- `FormBuilder` facilite la création du formulaire.
- `FormGroup` regroupe les champs du formulaire.
- `Validators.required` oblige l'utilisateur à remplir les champs.
- `ngOnInit()` initialise le formulaire au démarrage du composant.

## 🖥️ 6. Interface utilisateur

J'ai personnalisé l'interface pour améliorer l'expérience utilisateur.

L'application contient un titre de bienvenue, deux champs de saisie et un bouton d'inscription.

Cette personnalisation permet d'obtenir une interface plus moderne, claire et adaptée à une application mobile.

### Capture d'écran — Formulaire d'inscription



Cette capture montre le formulaire fonctionnant sur l'émulateur Android.

Les informations saisies sont :

- **Email :** bob@gmail.com
- **Username :** Bob

Le bouton **SIGN UP** permet de déclencher la validation du formulaire.

## 🖱️ 7. Gestion des événements et validation

Pour récupérer les informations saisies, j'ai utilisé la méthode `onButtonTap()`.

```typescript
import { alert } from '@nativescript/core';

onButtonTap(): void {
  if (this.signUpForm.valid) {
    console.log(JSON.stringify(this.signUpForm.value));

    alert({
      title: 'Registration Successful',
      message: 'Welcome, ' +
        this.signUpForm.value.username + '!',
      okButtonText: 'OK'
    });
  } else {
    alert({
      title: 'Missing Information',
      message: 'Please enter your email and username.',
      okButtonText: 'OK'
    });
  }
}
```

Cette méthode vérifie si les champs obligatoires sont remplis.

Lorsque le formulaire est valide, les informations sont affichées dans la console au format JSON et un message de confirmation apparaît.

Si un champ obligatoire est vide, l'application affiche un message demandant à l'utilisateur de compléter les informations manquantes.

## 📲 8. Test de l'application

Pour vérifier le fonctionnement du formulaire, j'ai lancé mon application sur l'émulateur Android `emulator-5554`.

### Étape 1 — Compilation et déploiement

<img src="images/Screenshot%202026-10-18%20155653.png" height="50%" width="50%">

La console confirme que les fichiers ont été transférés et que l'application a été synchronisée avec l'émulateur.

Le message suivant confirme la mise à jour :

```text
[HMR] success | Successfully applied update.
```

Le système de Hot Module Replacement permet d'appliquer certaines modifications sans redémarrer complètement l'application.

### Étape 2 — Saisie des informations

<img src="images/Screenshot%202026-10-18%20173832.png" height="50%" width="50%">

J'ai saisi une adresse électronique et un nom d'utilisateur dans les champs correspondants.

### Étape 3 — Validation de l'inscription

<img src="images/Screenshot%202026-10-18%20173846.png" height="50%" width="50%">

Après avoir appuyé sur le bouton **SIGN UP**, une fenêtre de confirmation apparaît avec le message :

```text
Registration Successful

Welcome, Bob!
```

Ce résultat confirme que l'application récupère correctement le nom d'utilisateur et exécute la méthode de validation.

### Étape 4 — Vérification dans la console

Le code utilise `console.log()` pour afficher les valeurs du formulaire.

Pour les données saisies, le résultat attendu est :

```json
{
  "email": "bob@gmail.com",
  "username": "Bob"
}
```

Cette sortie représente le résultat attendu de la méthode `console.log()` ; elle doit être vérifiée dans la console d'exécution pour confirmer cette partie de l'exercice.

## 🧠 9. Compétences acquises

Ce laboratoire m'a permis de mieux comprendre plusieurs concepts importants du développement mobile :

- L'organisation des composants avec les layouts NativeScript.
- L'utilisation des Reactive Forms d'Angular.
- La liaison entre l'interface graphique et le code TypeScript.
- La gestion des événements avec `(tap)`.
- La validation des champs obligatoires.
- L'utilisation de `console.log()` pour le débogage.
- Le déploiement et les tests sur un émulateur Android.

## 🏁 10. Conclusion

La réalisation de ce laboratoire m'a permis d'approfondir mes connaissances en développement d'applications mobiles avec NativeScript et Angular.

Au cours de cet exercice, j'ai appris à créer un formulaire réactif, à récupérer les informations saisies par un utilisateur et à utiliser des validations pour contrôler les données.

J'ai également personnalisé l'interface graphique afin de rendre l'application plus agréable et facile à utiliser.

Certaines difficultés rencontrées pendant la configuration et les tests m'ont permis de mieux comprendre l'importance de la structure des composants, de la compilation et du débogage.

**Ce laboratoire représente une étape importante dans mon apprentissage du développement mobile et me prépare à réaliser des applications plus avancées.**

---

**Réalisé dans le cadre du cours INF1083 — NativeScript et Angular.**
