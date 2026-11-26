# 🌍 Capital Explorer – Laboratoire 5 : RxJS

## Informations générales

- **Cours :** INF1083
- **Numéro étudiant :** 300147891
- **Projet :** b300147891-rxjs
- **Établissement :** Collège Boréal

## 1. Objectif du laboratoire

L'objectif est de développer une application mobile permettant
de rechercher un pays à partir du nom de sa capitale en utilisant
NativeScript, Angular, RxJS et une API externe.

## 2. Technologies utilisées

- NativeScript
- Angular
- TypeScript
- RxJS
- HttpClient
- Android Studio
- Visual Studio Code

## 3. Création du projet

```powershell
ns create b300147891-rxjs --template @nativescript/template-tab-navigation-ng
cd b300147891-rxjs
code .
```

## 4. Structure du code source

| Fichier | Description |
|---|---|
| country.ts | Modèle de données |
| apicall.service.ts | Communication avec l'API |
| app.module.ts | Configuration de HttpClient |
| search.component.ts | Logique de recherche |
| search.component.html | Interface graphique |
| search.module.ts | Configuration des formulaires |

## 5. Fonctionnement de l'application

1. L'utilisateur saisit le nom d'une capitale.
2. Il clique sur le bouton SEARCH CAPITAL.
3. HttpClient envoie une requête à l'API.
4. RxJS récupère et transforme les données.
5. Le ListView affiche le pays et sa capitale.

## 6. Personnalisation de l'interface

J'ai personnalisé mon application en ajoutant :

- Un globe et un titre Capital Explorer.
- Un sous-titre descriptif.
- Un bouton bleu avec des coins arrondis.
- Un affichage agrandi du pays et de sa capitale.

## 7. Difficultés rencontrées

Durant ce laboratoire, j'ai rencontré plusieurs problèmes
liés à la configuration du SDK Android et à la connexion
de l'émulateur.

J'ai configuré la variable ANDROID_HOME et ajouté
platform-tools au PATH.

J'ai également redémarré le service ADB avec les commandes :

```powershell
adb kill-server
adb start-server
adb devices
```

## 8. Installation et exécution

Le code source de l'application est disponible dans ce dépôt.

Depuis le dossier contenant package.json,
installer les dépendances :

```powershell
npm install
```

Vérifier l'environnement Android :

```powershell
ns doctor android
```

Démarrer l'émulateur Android et exécuter :

```powershell
ns run android
```

## 9. Résultats obtenus

| Capitale recherchée | Pays obtenu | Résultat |
|---|---|---|
| Conakry | Guinea | Réussi |
| Tokyo | Japon | Réussi |
### Capture de l'application

![Capital Explorer](images<img width="367" height="818" alt="rxjs-conakry" src="https://github.com/user-attachments/assets/d7367e01-a114-4ffc-aa3c-aa3e2e8fdf09" />
/rxjs-conakry.png)

<img width="656" height="925" alt="Capture d&#39;écran 2026-11-26 004058" src="https://github.com/user-attachments/assets/cbc93d2b-4170-4d52-8a44-179054d16783" />

## 10. Conclusion

Ce laboratoire m'a permis de comprendre l'utilisation
des observables RxJS, la communication avec une API
externe et la gestion des données asynchrones.

J'ai également amélioré mes compétences en développement
mobile et en résolution des problèmes liés à Android.

L'application a été compilée, exécutée et testée
avec succès sur un émulateur Android.
