# Laboratoire 5 — RxJS

**Cours :** INF1083 — Développement d'application  
**Étudiant :** Amadou Sow  
**Numéro d'étudiant :** 300159672  
**Projet :** b300159672  
**Environnement :** MacBook Pro, VS Code, simulateur iOS (iPad A16)

## 1. Présentation

Dans ce laboratoire, j'ai créé une application NativeScript + Angular avec onglets. L'onglet **Search** permet de saisir une capitale (par exemple `Paris`) et d'afficher le pays correspondant dans une liste.

Les données viennent d'une API REST. Elles sont récupérées avec `HttpClient` et traitées avec **RxJS** : le service retourne un `Observable<Country[]>` auquel le composant s'abonne.

## 2. Objectifs

- Comprendre le rôle de RxJS : manipuler des flux de données asynchrones avec des observables.
- Consommer une API avec `HttpClient`.
- Transformer la réponse avec les opérateurs `map` et `catchError`.
- Lier un champ de saisie avec `[(ngModel)]` (formulaire « template driven »).
- Afficher une collection dans un `ListView`.

## 3. Création du projet

J'ai créé mon dossier `300159672` dans `5.RxJS`, avec le `README.md` et le dossier `images`. J'ai ensuite créé le projet avec le modèle à onglets :

```bash
ns create b300159672 --template @nativescript/template-tab-navigation-ng
cd b300159672
code .
```

<img width="1732" height="1072" alt="01-projet-cree" src="https://github.com/user-attachments/assets/73b7047a-57d2-4dbd-aeed-c86c2a4a6f1a" />


## 4. Réalisation

Le modèle ne contient pas de fichier `angular.json` : les commandes `ng generate` ne fonctionnent donc pas. J'ai créé les fichiers à la main.

| Fichier | Rôle |
|---|---|
| `src/app/shared/country.ts` | Modèle de données (`id`, `name`, `capital`) |
| `src/app/shared/apicall.service.ts` | Service qui appelle l'API et retourne un `Observable<Country[]>` |
| `src/app/app.module.ts` | Ajout de `NativeScriptHttpClientModule` |
| `src/app/search/search.component.ts` | Propriétés `name` et `countries`, méthode `searchCapital()` |
| `src/app/search/search.component.html` | `TextField`, `Button` et `ListView` |
| `src/app/search/search.module.ts` | Ajout de `NativeScriptFormsModule` |

Le service interroge `https://countries.nexperts.nl/capital/` + le nom saisi. Le pipe applique :

- `map` : transforme chaque résultat en objet `Country` (`id`, `name`, `capital`) ;
- `catchError` : retourne le message `Capital not found!` en cas d'erreur.

<img width="1852" height="1344" alt="02-service" src="https://github.com/user-attachments/assets/bba2edc8-6ffa-4c9b-97f6-3eceac484d12" />


Dans `app.module.ts`, j'ai ajouté `NativeScriptHttpClientModule` pour permettre l'utilisation de `HttpClient`. Dans `search.module.ts`, j'ai ajouté `NativeScriptFormsModule` pour utiliser `[(ngModel)]`.

## 5. Fonctionnement

1. L'utilisateur saisit une capitale dans le champ. `[(ngModel)]="name"` met à jour la propriété `name`.
2. Il touche le bouton **Search**. L'événement `(tap)` appelle `searchCapital()`.
3. Le composant appelle `searchCountryByName(this.name)` et s'abonne avec `subscribe`.
4. Quand l'Observable émet, le tableau est affiché avec `console.log` puis stocké dans `countries`.
5. Le `ListView` (`[items]="countries"`) affiche le nom du pays et sa capitale.

## 6. Technologies utilisées

| Élément | Utilité |
|---|---|
| `HttpClient` (`NativeScriptHttpClientModule`) | Requête HTTP vers l'API |
| `Observable`, `map`, `catchError`, `throwError` (RxJS) | Flux de données asynchrone, transformation et gestion d'erreur |
| `NativeScriptFormsModule` + `[(ngModel)]` | Liaison du champ de saisie à la propriété `name` |
| `ListView` | Affichage de la liste des pays |
| `(tap)` | Action déclenchée au toucher du bouton |

## 7. Résultat

Dans le simulateur, j'ai ouvert l'onglet **Search**, saisi `Paris` et touché **Search**. La liste affiche **France / Paris**, et le terminal affiche le tableau reçu :

```text
[ { id: 0, name: "France", capital: "Paris" } ]
```

<img width="3024" height="1964" alt="03-recherche" src="https://github.com/user-attachments/assets/e9d8d353-bc84-4fac-bdfc-1ffabfb08213" />


## 8. Compte RapidAPI

J'ai créé un compte sur RapidAPI et retrouvé la clé de mon application (valeur masquée sur la capture). Le service fourni dans l'énoncé appelle directement `countries.nexperts.nl` et n'utilise pas cette clé : je ne l'ai donc pas ajoutée au code.

<img width="3024" height="1898" alt="05-rapidapi" src="https://github.com/user-attachments/assets/64668a3f-addf-4fa6-be06-154e16a4eae8" />


## 9. Exécution du projet

Depuis le dossier `5.RxJS/300159672` :

```bash
cd b300159672
npm install
ns run ios
```

## 10. Difficultés rencontrées

- **Commande `ns` introuvable** après un changement de version de Node : j'ai réinstallé NativeScript avec `npm install -g nativescript`.
- **Erreur npm** `Cannot read properties of null (reading 'edgesOut')` pendant `ns create` : j'ai mis à jour npm avec `npm install -g npm@11`. Je n'ai pas utilisé `--force`.
- **Fichiers modifiés dans le mauvais dossier** : VS Code avait ouvert le projet d'un autre étudiant dans `5.RxJS`. J'ai remis ses fichiers à l'état d'origine avec `git restore`, puis j'ai refait mes modifications dans mon projet.
- **Soulignés TypeScript dans `country.ts`** (propriétés sans valeur initiale) : j'ai gardé le code de l'énoncé. L'application se compile et fonctionne.

## 11. Ce que j'ai appris

- RxJS permet de gérer des données asynchrones avec des observables : le service retourne un `Observable` et le composant s'y abonne avec `subscribe`.
- `map` transforme les données reçues et `catchError` gère les erreurs.
- Il faut importer `NativeScriptHttpClientModule` pour utiliser `HttpClient`, et `NativeScriptFormsModule` pour utiliser `ngModel`.
- Un `ListView` affiche une collection grâce à `[items]` et à un `ng-template`.

## 12. Conclusion

L'application permet de rechercher une capitale et d'afficher le pays correspondant à partir d'une API, en utilisant `HttpClient` et RxJS. Ce laboratoire m'a aidé à comprendre comment un service Angular fournit des données asynchrones à un composant NativeScript.
