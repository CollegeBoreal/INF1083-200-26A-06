# TP04 – Reactive Forms

**Nom :** Yamna Cherif  
**Matricule :** 300160862  
**Cours :** INF1083 – Développement d’applications

## Objectif

Créer un formulaire NativeScript avec Angular et afficher le courriel et le nom d'utilisateur dans la console.

## Réalisation

- `StackLayout` contient les deux champs `TextField` et le bouton `sign up`.
- `FormBuilder` initialise le `FormGroup` avec les contrôles `email` et `username`.
- `Validators.required` indique que les deux champs sont obligatoires.
- `onButtonTap()` affiche les valeurs du formulaire avec `JSON.stringify()`.
- `NativeScriptFormsModule` active les directives de formulaire dans le composant.

## Exécution

```bash
cd B300160862
npm install
ns run android
```

Saisir un courriel et un nom d'utilisateur, puis appuyer sur `sign up`.

Exemple de sortie attendue :

```json
{"email":"yamna@example.com","username":"yamna"}
```

## Vérifications

- Compilation Angular (`ngc --noEmit`) : réussie.
- Vérification TypeScript (`tsc --noEmit`) : réussie.
- Test sur émulateur Android et captures : à effectuer sur un poste équipé du SDK Android.
