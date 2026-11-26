- **Matricule : 300147891**
- **Cours : INF1083**
- **Collège Boréal**
  **Projects**

# FitTrack

## Présentation du projet

FitTrack est une application mobile de musculation qui permet
à un utilisateur de consulter des exercices, d'enregistrer
ses séances et de suivre sa progression sportive.

## Technologies utilisées

- NativeScript
- Angular
- TypeScript
- HTML et CSS
- Android Emulator

## Template utilisé

@nativescript/template-tab-navigation-ng

Ce template permet de naviguer entre plusieurs pages
à l'aide des onglets situés en bas de l'écran.

## Fonctionnalités

- Consultation des exercices de musculation.
- Affichage des groupes musculaires.
- Affichage des séries et répétitions.
- Enregistrement des séances.
- Calcul automatique de la progression.
- Sauvegarde locale des données.
- Réinitialisation du compteur.

## Sauvegarde des données

J'ai utilisé ApplicationSettings de @nativescript/core
pour conserver le nombre de séances même après
la fermeture de l'application.

## Interfaces de l'application

### 1. Accueil

Cette page présente l'application et l'objectif sportif.

![Accueil](<img width="520" height="898" alt="accueil" src="https://github.com/user-attachments/assets/8403bad4-ab30-4327-a476-7b015b1a482e" />
)

### 2. Exercices

Cette page affiche une liste de six exercices avec
les groupes musculaires, les séries et les répétitions.

![Exercices](<img width="435" height="900" alt="exercice" src="https://github.com/user-attachments/assets/3b899c9a-1fde-4e99-9289-5fad6e5a52d2" />
)

### 3. Progression

Cette page permet d'enregistrer les séances et
de suivre le pourcentage de progression.

![Progression](<img width="502" height="873" alt="progression" src="https://github.com/user-attachments/assets/8eaeab7d-0148-4d12-b78a-463858ee0526" />
)

### 4. Réinitialisation

Le bouton Réinitialiser permet de remettre
le compteur des séances à zéro.

![Réinitialisation](<img width="496" height="780" alt="reinitialisation" src="https://github.com/user-attachments/assets/2f85c23c-3031-4128-a3b2-760c9d58e9c3" />
)

## Exécution du projet

Installer les dépendances :

```bash
npm install
```

Lancer l'application sur Android :

```bash
ns run android
```

## Limitation actuelle

La réinitialisation des séances est manuelle.

## Auteur

- Matricule : 300147891
- Cours : INF1083
- Collège Boréal
