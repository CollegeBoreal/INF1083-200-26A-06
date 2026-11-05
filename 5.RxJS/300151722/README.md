# 🌍 Travail 5 – RxJS : Capital Explorer

**Nom et prénom :** Islam Oustani  
**Numéro d'étudiant :** 300151722  
**Cours :** INF1083 – Développement d'applications  
**Projet :** b300151722  
**Technologies :** NativeScript, Angular, TypeScript, RxJS et HttpClient

---

## 1. Description du projet

Dans ce travail, j'ai développé une application mobile Android appelée **Capital Explorer**, en utilisant NativeScript, Angular et RxJS.

Cette application permet de rechercher un pays à partir du nom de sa capitale.

L'utilisateur saisit une capitale, appuie sur le bouton **SEARCH CAPITAL** et l'application affiche le pays correspondant.

Exemples :

- Ottawa → Canada
- Paris → France
- Tokyo → Japan

L'application possède une interface moderne avec un champ de recherche, un bouton bleu et une liste de résultats.

---

## 2. Objectifs du travail

- Comprendre le fonctionnement de RxJS.
- Utiliser les Observables.
- Communiquer avec une API REST.
- Utiliser HttpClient dans Angular.
- Créer un service Angular.
- Utiliser le Data Binding avec ngModel.
- Afficher les données dans un ListView.
- Tester une application NativeScript sur Android.

---

## 3. Création du projet

J'ai créé mon application avec le modèle Tab Navigation.

```bash
ns create b300151722 --template @nativescript/template-tab-navigation-ng
```

Ensuite, j'ai ouvert mon projet dans Visual Studio Code.

```bash
cd b300151722
code .
```

**Capture 1 – Création du projet NativeScript**

<img width="959" height="1053" alt="1" src="https://github.com/user-attachments/assets/0e2baf25-acb8-417c-9c74-dcbc24737174" />

---

## 4. Fonctionnalités de l'application

L'application contient un champ TextField pour saisir une capitale, un bouton SEARCH CAPITAL, un service Angular pour communiquer avec l'API et un ListView pour afficher les résultats.

Le service utilise HttpClient et RxJS pour récupérer les informations.

### Technologies utilisées

| Technologie | Utilisation |
|---|---|
| NativeScript | Application mobile |
| Angular | Composants et services |
| TypeScript | Programmation |
| RxJS | Données asynchrones |
| HttpClient | Requêtes vers l'API |
| Observable | Réception des données |
| ListView | Affichage des résultats |

---

## 5. Interface Capital Explorer

J'ai amélioré l'interface de l'application avec un titre, un champ de recherche, un bouton bleu et une section pour afficher les pays.

**Capture 2 – Interface Capital Explorer**

<img width="407" height="838" alt="2" src="https://github.com/user-attachments/assets/2d19f5c6-6473-4815-ac5d-217e85e75f46" />

---

## 6. Recherche Ottawa – Canada

J'ai saisi la capitale Ottawa, puis j'ai appuyé sur SEARCH CAPITAL.

L'application a affiché le pays Canada et sa capitale Ottawa.

**Capture 3 – Ottawa**

<img width="485" height="878" alt="3" src="https://github.com/user-attachments/assets/75429f2f-fffb-4712-9b80-feed9e887b42" />

---

## 7. Recherche Tokyo – Japan

J'ai effectué une recherche avec Tokyo.

L'application a affiché le pays Japan et sa capitale Tokyo.

**Capture 4 – Tokyo**

<img width="420" height="862" alt="4" src="https://github.com/user-attachments/assets/20be7bc0-db2c-4677-8b11-a844af5d09b8" />

---

## 8. Recherche Paris – France

J'ai également testé la capitale Paris.

L'application a affiché le pays France et sa capitale Paris.

**Capture 5 – Paris**

<img width="419" height="884" alt="5" src="https://github.com/user-attachments/assets/fc34f6b4-a917-4dff-842b-f3a101efe4a4" />

---

## 9. Utilisation de RxJS

L'application utilise un service Angular nommé `ApicallService`.

Lorsque l'utilisateur appuie sur le bouton SEARCH CAPITAL :

1. Angular récupère la capitale saisie.
2. HttpClient effectue une requête vers l'API.
3. RxJS retourne un `Observable<Country[]>`.
4. La méthode `subscribe()` reçoit les données.
5. Les informations sont affichées dans le ListView.

### Exemple du cours

```typescript
searchCapital() {
    this.apiService
        .searchCountryByName(this.name)
        .subscribe((data: Country[]) => {
            console.log(data);
            this.countries = data;
        });
}
```

---

## 10. Tests réalisés

| Capitale | Pays obtenu | Résultat |
|---|---|---|
| Ottawa | Canada | ✅ Réussi |
| Tokyo | Japan | ✅ Réussi |
| Paris | France | ✅ Réussi |

Les trois recherches ont fonctionné dans l'émulateur Android.

---

## 11. Conclusion

Ce laboratoire m'a permis de mieux comprendre l'utilisation de RxJS avec NativeScript et Angular.

J'ai appris à récupérer des données depuis une API REST, à utiliser les Observables et à afficher les résultats dans une application mobile.

J'ai également personnalisé le design de l'application Capital Explorer.

Le projet répond à l'objectif du laboratoire : rechercher une capitale et afficher le pays correspondant.

---

## 12. Références

- [NativeScript](https://nativescript.org/)
- [RxJS](https://rxjs.dev/)
- [Angular Forms](https://angular.dev/guide/forms)
- [Documentation NativeScript](https://docs.nativescript.org/)
- [Dépôt INF1083](https://github.com/CollegeBoreal/INF1083-200-26A-06)

---

**Travail réalisé par : Islam Oustani**  
**Numéro étudiant : 300151722**  
**Collège Boréal – INF1083**
