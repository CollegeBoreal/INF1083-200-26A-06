# TP – RxJS et API REST avec NativeScript Angular

**Étudiant :** Bob Adly Pierre  
**Numéro étudiant :** 300159437  
**Cours :** INF1083 – Développement d'applications mobiles  
**Établissement :** Collège Boréal  
**Projet :** B300159437 – World Capitals

---

## 1. Introduction

Ce travail pratique consiste à développer une application mobile Android avec NativeScript et Angular afin de rechercher les capitales de différents pays.

L'application utilise un service Angular pour effectuer des requêtes HTTP vers une API REST et RxJS pour gérer les données asynchrones.

## 2. Objectifs du travail

- Créer une application NativeScript avec Angular.
- Comprendre l'utilisation de RxJS et des Observables.
- Utiliser `HttpClient` pour communiquer avec une API REST.
- Créer un modèle de données `Country`.
- Développer un service `ApicallService`.
- Utiliser `ngModel` pour récupérer les informations saisies.
- Afficher les résultats avec un composant `ListView`.
- Gérer les erreurs provenant de l'API.

## 3. Technologies utilisées

| Technologie | Utilisation |
|---|---|
| NativeScript | Développement de l'application Android |
| Angular | Gestion des composants et des services |
| TypeScript | Programmation de l'application |
| RxJS | Gestion des données asynchrones |
| HttpClient | Communication avec l'API REST |
| RapidAPI | Accès aux informations des pays |
| Android Studio | Émulateur Pixel 7 |
| Visual Studio Code | Développement du projet |

## 4. Création du projet

Le projet a été créé avec la commande suivante :

```bash
ns create B300159437 --template @nativescript/template-tab-navigation-ng
```

Le dossier `shared` contient les fichiers nécessaires à la gestion des données et aux appels API.

```text
B300159437/
├── src/
│   └── app/
│       ├── shared/
│       │   ├── country.ts
│       │   └── apicall.service.ts
│       └── search/
│           ├── search.component.ts
│           ├── search.component.html
│           └── search.module.ts
├── images/
└── README.md
```

## 5. Modèle de données Country

Le modèle `Country` représente les informations récupérées pour chaque pays.

```typescript
export class Country {
    id: number;
    name: string;
    capital: string;
}
```

## 6. Service APICall

Le service `ApicallService` utilise `HttpClient` pour communiquer avec une API REST accessible par RapidAPI.

Les résultats sont retournés sous forme d'un `Observable<Country[]>`.

Les opérateurs RxJS utilisés sont :

- `map()` : transformer les données reçues.
- `catchError()` : gérer les erreurs.
- `timeout()` : limiter le temps d'attente des requêtes.

L'authentification RapidAPI repose sur les en-têtes `X-RapidAPI-Key` et `X-RapidAPI-Host`.

**Sécurité :** la clé API personnelle ne doit pas être publiée dans le dépôt GitHub.

## 7. Interface utilisateur

L'application propose une interface permettant de saisir le nom d'un pays et de rechercher sa capitale.

Le composant `TextField` utilise `[(ngModel)]` pour récupérer la saisie de l'utilisateur.

Le bouton **Find Capital** déclenche la méthode `searchCapital()`.

Les résultats sont affichés dans un `ListView`.

## 8. Captures d'écran

### 8.1 Interface principale

<img src="images/Screenshot%202026-11-08%20193958.png" width="40%">

*Figure 1 – Interface principale de l'application.*

### 8.2 Recherche d'un pays

<img src="images/Screenshot%202026-11-09%20004700.png" width="40%">

*Figure 2 – Recherche du pays Canada.*

### 8.3 Résultat de la recherche

![Résultat Ottawa](images/resultat-ottawa.png)

*Figure 3 – Résultat de la recherche : Canada et sa capitale Ottawa.*

### 8.4 Service API et RxJS

![Service API](images/service-api.png)

*Figure 4 – Service Angular utilisant HttpClient et RxJS.*

## 9. Exécution du projet

Installer les dépendances :

```bash
npm install
```

Vérifier la connexion de l'émulateur :

```bash
adb devices
```

Exécuter l'application :

```bash
ns run android
```

## 10. Difficultés rencontrées

Pendant le développement, plusieurs difficultés ont été rencontrées :

- Problème de connexion de l'émulateur Pixel 7.
- Commande `adb` initialement non reconnue.
- Émulateur affiché comme `offline`.
- Ancienne API REST Countries devenue obsolète.
- Chargement prolongé lors de la recherche des capitales.

Ces problèmes ont conduit à revoir la configuration de l'environnement Android et à adapter le service API pour utiliser RapidAPI.

## 11. Tests et validation

Les vérifications prévues comprennent :

- Le démarrage de l'application sur Pixel 7.
- La recherche d'un pays pris en charge.
- L'affichage de sa capitale.
- La gestion d'une recherche invalide.
- L'arrêt du chargement en cas d'erreur réseau.

Les résultats doivent être confirmés par des tests sur l'émulateur avant la remise finale.

## 12. Conclusion

Ce travail pratique m'a permis de mieux comprendre le fonctionnement des services Angular, des requêtes HTTP et des Observables RxJS dans une application NativeScript.

J'ai également appris à diagnostiquer des problèmes liés aux API REST et à la configuration de l'émulateur Android.

## 13. Références

- [Documentation NativeScript](https://docs.nativescript.org/)
- [Documentation Angular](https://angular.dev/)
- [Documentation RxJS](https://rxjs.dev/)
- [RapidAPI](https://rapidapi.com/)
