# Participation NativeScript

## Informations

- Nom : Kouassi Jean-Pierre Emmanuel O N'Goran
- Matricule : 300157250
- Projet : B300157250

## Préparation de l'environnement

Je me suis déplacé dans le dossier `2.NativeScript` du dépôt du cours.

J’ai ensuite créé mon dossier personnel `300157250`, le fichier `README.md` et le dossier `images` pour enregistrer les captures d’écran.

```bash
mkdir 300157250
cd 300157250
touch README.md
mkdir images
```

## Installation de NativeScript

Lors de la première tentative d'installation de NativeScript, une erreur de permission (`EACCES`) s'est produite.

Pour résoudre ce problème, j'ai créé un dossier npm dans mon répertoire personnel et ajouté ce dossier à la variable d'environnement `PATH`.

```bash
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
npm install -g nativescript
```

J'ai ensuite vérifié l'installation avec la commande suivante :

```bash
ns --version
```

## Création du projet

J'ai créé un projet NativeScript nommé `B300157250`.

```bash
ns create B300157250
```

Lors de la création du projet, j'ai sélectionné les options suivantes :

- Angular
- Hello World

## Exécution de l'application

Je me suis déplacé dans le dossier du projet :

```bash
cd B300157250
```

Puis j'ai exécuté l'application sur iOS :

```bash
ns run ios
```

## Résultat

L'application a été créée avec succès. Le projet contient les principaux dossiers et fichiers suivants :

```text
App_Resources
hooks
node_modules
platforms
src
package.json
webpack.config.js
tsconfig.json
```

L'application s'est exécutée correctement dans le simulateur iOS et l'écran Hello World s'est affiché.

## Captures d'écran

### Vérification de l'installation de NativeScript


### Création du projet

!

### Application en exécution


## Références

- https://nativescript.org/
- https://openjsf.org/blog/nativescript-9-1
- https://roadmap.sh/frontend
