# NativeScript with Angular Blank Template
App templates help you jump start your native cross-platform apps with built-in UI elements and best practices. Save time writing boilerplate code over and over again when you create new apps.

## Quick Start
Execute the following command to create an app from this template:

```
ns create my-blank-ng --template @nativescript/template-blank-ng
```

> Note: This command will create a new NativeScript app that uses the latest version of this template published to [npm](https://www.npmjs.com/package/@nativescript/template-blank-ng).

If you want to create a new app that uses the source of the template from the `main` branch, you can execute the following:

```
# clone nativescript-app-templates monorepo locally
git clone git@github.com:NativeScript/nativescript-app-templates.git

# create app template from local source (all templates are in the 'packages' subfolder of the monorepo)
ns create my-blank-ng --template nativescript-app-templates/packages/template-blank-ng
```

**NB:** Please, have in mind that the main branch may refer to dependencies that are not on NPM yet!

## Walkthrough

### Architecture
The application component:
- `/src/app/app.component` - sets up a page router outlet that lets you navigate between pages.

There is a single blank component that sets up an empty layout:
- `/src/app/home/home.component`

**Home** page has the following components:
- `ActionBar` - It holds the title of the page.
- `GridLayout` - The main page layout that should contains all the page content.

## Get Help
The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Discord](https://nativescript.org/discord). The Discord channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in the [NativeScript repository](https://github.com/NativeScript/NativeScript/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.
<img width="1029" height="715" alt="Capture d&#39;écran 2026-11-11 004104" src="https://github.com/user-attachments/assets/f8b150de-45fb-428e-b216-75fb5ee83340" />
Édition du template de la page d'accueil dans Visual Studio Code, intégrant les balises StackLayout, les champs de texte (TextField) avec les liaisons formControlName pour l'e-mail et le nom d'utilisateur, ainsi que le bouton de soumission lié à l'événement
<img width="651" height="703" alt="Capture d&#39;écran 2026-11-17 114723" src="https://github.com/user-attachments/assets/372944f3-b881-47b9-b321-f679262b6b95" />
Affichage de l'interface utilisateur sur l'appareil virtuel montrant le formulaire d'inscription en cours de test, avec la saisie des données dans les champs respectifs et le clavier virtuel actif
<img width="675" height="629" alt="Capture d&#39;écran 2026-11-17 114820" src="https://github.com/user-attachments/assets/784ca8ea-6e76-4597-bfcd-1f64d14c6244" />
Sortie dans le terminal PowerShell montrant la récupération réussie et l'affichage au format JSON des valeurs du formulaire ({"email":"...","username":"..."}) suite à l'appui sur le bouton d'envoi


