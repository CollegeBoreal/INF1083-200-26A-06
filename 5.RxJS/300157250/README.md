# INF1083 - Laboratoire RxJS

## Informations de l'étudiant

- Nom : Kouassi Jean-Pierre Emmanuel O N'Goran
- Numéro étudiant : 300157250
- Cours : INF1083

---

## Description

Cette application mobile a été développée avec NativeScript Angular afin de démontrer l'utilisation de RxJS et des Observables pour consommer une API REST.

L'application permet à l'utilisateur de saisir le nom d'une capitale et d'afficher les pays correspondants à partir des données retournées par le service Web.

---

## Technologies utilisées

- NativeScript
- Angular
- TypeScript
- RxJS
- HttpClient
- Observable
- ngModel

---

## Fonctionnalités

- Recherche par capitale
- Consommation d'une API REST
- Utilisation des Observables RxJS
- Utilisation de HttpClient
- Liaison des données avec ngModel
- Affichage des résultats dans un ListView

---

## Structure du projet

```text
300157250
│
├── README.md
│
└── images
    ├── projet.png
    ├── recherche.png
    └── resultat.png
```

---

## Fonctionnement

1. L'utilisateur entre une capitale dans le champ texte.
2. L'utilisateur clique sur le bouton Search.
3. Le service Angular effectue une requête HTTP.
4. RxJS retourne un Observable contenant les données.
5. Les résultats sont affichés dans le ListView.

---

## Exemple de modèle de données

```typescript
export class Country {
    id: number;
    name: string;
    capital: string;
}
```

---

## Captures d'écran

### Projet ouvert dans VS Code

![Projet](images/projet.png)

### Interface de recherche

![Recherche](images/recherche.png)

### Résultats obtenus

![Résultat](images/resultat.png)

---

## Conclusion

Ce laboratoire m'a permis d'apprendre à utiliser RxJS avec Angular et NativeScript afin de récupérer et afficher des données provenant d'une API externe. J'ai également pratiqué l'utilisation des Observables, du service HttpClient et des formulaires Angular.