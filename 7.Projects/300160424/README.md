
# 🏋️ SportFit

**Étudiant :** Youcef Laziz — 300160424  
**Cours :** INF1083 – Développement d'applications  
**Projet mobile :** NativeScript + Angular (Android)  
**Dossier du projet :** `b300160424`

---

## 📝 Résumé du projet

SportFit est une application mobile de fitness qui permet à l'utilisateur d'organiser son entraînement, de suivre ses performances et d'atteindre ses objectifs sportifs.

L'application permet de :

- Consulter un programme de quatre exercices.
- Chronométrer la durée de son entraînement.
- Enregistrer les exercices terminés.
- Visualiser sa progression en temps réel sur la page Exercices.
- Consulter ses calories estimées.
- Obtenir des trophées selon ses résultats.
- Réinitialiser son entraînement avec une confirmation.

Les données sont enregistrées localement avec `ApplicationSettings`, sans API externe.

---

## 🏷️ Nom de l'application

**SportFit** est le nom de mon application mobile.

Le dossier technique `b300160424` correspond à mon matricule étudiant.

## 🎨 Design de l'application

J'ai amélioré le design initial de mon application en choisissant un thème moderne noir et orange, inspiré des applications professionnelles de musculation.

| Élément | Couleur |
|---|---|
| Arrière-plan | Noir `#101010` |
| Couleur principale | Orange `#FF6B00` |
| Cartes | Gris foncé `#242424` |
| Texte principal | Blanc |
| Exercices terminés | Vert |

Le nouveau design comprend :

- Une photo de salle de musculation.
- Des cartes modernes et arrondies.
- Des boutons orange.
- Des icônes sportives.
- Un chronomètre modernisé.
- Un affichage circulaire du pourcentage.
- Un menu inférieur avec trois boutons de navigation.

---

## 📱 Les pages de l'application

### 1. Accueil

La page d'accueil présente le programme sportif avec une interface moderne et une photo de salle de musculation.

Elle contient :

- Un message de motivation.
- Une bannière « NO EXCUSES – TRAIN HARD ».
- Un objectif quotidien de 30 minutes.
- Un programme de quatre exercices.
- Un entraînement Full Body pour débutants.
- Un bouton pour commencer l'entraînement.
- Un bouton pour consulter les performances.

<p align="center">
  <img src="images/accueil.png" width="350" alt="Page Accueil SportFit">
</p>

### 2. Exercices

Cette page permet de consulter les exercices, de chronométrer l'entraînement et d'enregistrer les activités terminées.

| Exercice | Programme |
|---|---|
| 💪 Pompes | 3 séries de 10 |
| 🏋️ Squats | 3 séries de 15 |
| 🔥 Abdominaux | 3 séries de 20 |
| 🏃 Course | 15 minutes |

Chaque exercice possède une carte avec son nom, son programme, sa description et un bouton de validation.

Une barre de progression affiche le nombre d'exercices terminés.

Lorsqu'un exercice est terminé, son bouton devient vert et ne peut plus être utilisé pour enregistrer une deuxième fois le même exercice.

Une animation est également prévue lors de la validation.

<p align="center">
  <img src="images/exercices.png" width="350" alt="Page Exercices SportFit">
</p>

### 3. Suivi

La page Suivi permet de consulter les performances de l'utilisateur.

Elle affiche :

- Le pourcentage de progression dans un cercle.
- Une barre de progression dynamique.
- Le nombre d'exercices terminés.
- Les calories estimées.
- Le bilan individuel des exercices.
- Les récompenses et les messages de motivation.

Pendant mon test, les quatre exercices ont été enregistrés. L'application a affiché une progression de **100 %**, **4/4 exercices terminés** et **190 kcal estimées**.

<p align="center">
  <img src="images/suivi.png" width="350" alt="Page Suivi SportFit">
</p>

---

## ⏱️ Fonctionnement du chronomètre

| Bouton | Fonction |
|---|---|
| Start | Démarrer ou reprendre le chronomètre |
| Pause | Suspendre le chronomètre |
| Reset | Remettre le chronomètre à zéro |

Le chronomètre affiche le temps en minutes et secondes.

La fonction `setInterval()` permet d'actualiser le compteur chaque seconde.

La fonction `clearInterval()` permet d'arrêter le compteur.

---

## 💾 Stockage local

L'application utilise `ApplicationSettings` pour enregistrer les exercices terminés directement sur le téléphone.

```typescript
const cle = 'sportfit_' + nom;
ApplicationSettings.setBoolean(cle, true);
```

La méthode `getBoolean()` permet de vérifier si un exercice est terminé.

```typescript
ApplicationSettings.getBoolean(
  'sportfit_' + nom, false
);
```

La méthode `remove()` permet de supprimer les résultats lors de la réinitialisation.

---

## 📊 Calcul de la progression

La progression est calculée selon le nombre d'exercices terminés.

```text
Progression = (exercices terminés / 4) × 100
```

| Exercices terminés | Progression |
|---|---|
| 0/4 | 0 % |
| 1/4 | 25 % |
| 2/4 | 50 % |
| 3/4 | 75 % |
| 4/4 | 100 % |

## 🔥 Calcul des calories

| Exercice | Calories estimées |
|---|---|
| Pompes | 25 kcal |
| Squats | 35 kcal |
| Abdominaux | 30 kcal |
| Course | 100 kcal |
| Total | 190 kcal |

Les calories sont des valeurs indicatives utilisées pour la démonstration. Elles ne représentent pas des mesures médicales ou sportives réelles.

---

## 🏆 Système de récompenses

| Exercices terminés | Récompense |
|---|---|
| 0 | 🎯 Débutant |
| 1 | 🥉 Sportif débutant |
| 2 | 🥈 Sportif motivé |
| 3 | 🥇 Sportif confirmé |
| 4 | 🏆 Champion SportFit |

Ce système encourage l'utilisateur à terminer son programme sportif.

## 🔄 Réinitialisation

Le bouton Réinitialiser l'entraînement permet de recommencer le programme.

Une fenêtre de confirmation est prévue avec deux choix :

- Oui : effacer les résultats.
- Annuler : conserver les résultats.

Cette fonctionnalité utilise `Dialogs.confirm()` pour éviter une suppression accidentelle.

---

## 🧩 Template utilisé

| Template | Utilisation |
|---|---|
| NativeScript Angular | Structure initiale du projet |

J'ai créé mon application avec NativeScript et Angular.

J'ai ensuite personnalisé les composants pour créer trois pages adaptées à mon projet de fitness.

<p align="center">
  <img src="images/creation.png" width="750" alt="Création du projet">
</p>

---

## 🔌 Plugins et modules

Aucun plugin externe supplémentaire n'a été nécessaire pour les fonctionnalités présentées.

| Module ou fonctionnalité | Utilisation |
|---|---|
| `@nativescript/core` | Composants et fonctionnalités natives |
| `@nativescript/angular` | Intégration Angular |
| `@angular/core` | Gestion des composants |
| `@angular/router` | Navigation |
| `ApplicationSettings` | Stockage local |
| `Dialogs` | Fenêtre de confirmation |
| `View.animate()` | Animation des boutons |

---

## 🛠️ Technologies utilisées

- NativeScript
- Angular
- TypeScript
- HTML
- CSS
- Visual Studio Code
- Android Studio
- Émulateur Android
- Git et GitHub

---

## 🗂️ Structure du projet

```text
300160424/
├── README.md
├── images/
└── b300160424/
    ├── App_Resources/
    ├── src/
    │   ├── app/
    │   │   ├── accueil/
    │   │   │   └── accueil.component.ts
    │   │   ├── exercices/
    │   │   │   └── exercices.component.ts
    │   │   ├── suivi/
    │   │   │   └── suivi.component.ts
    │   │   ├── app.component.html
    │   │   ├── app.component.ts
    │   │   └── app.routes.ts
    │   ├── images/
    │   │   └── fitness.jpg
    │   ├── app.css
    │   └── main.ts
    └── package.json
```

<p align="center">
  <img src="images/structure.png" width="750" alt="Structure du projet">
</p>

---

## 🔀 Navigation

L'application utilise les routes Angular pour naviguer entre les trois pages.

```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'exercices', component: ExercicesComponent },
  { path: 'suivi', component: SuiviComponent }
];
```

Le menu inférieur permet d'accéder directement aux pages Accueil, Exercices et Suivi.

<p align="center">
  <img src="images/routes.png" width="750" alt="Routes Angular">
</p>

---

## ▶️ Lancer le projet

### Prérequis

- Node.js
- NativeScript CLI
- Android Studio
- Un émulateur Android

Depuis le répertoire étudiant `300160424` :

```powershell
cd b300160424
npm install
ns run android
```

---

## 🧪 Tests réalisés

| Test | Résultat |
|---|---|
| Compilation du projet | ✅ Réussi |
| Démarrage sur Android | ✅ Réussi |
| Affichage des trois pages | ✅ Réussi |
| Nouveau design noir et orange | ✅ Réussi |
| Affichage de la photo sportive | ✅ Réussi |
| Navigation entre les pages | ✅ Réussi |
| Chronomètre à 00:13 (version initiale) | ✅ Observé |
| Enregistrement des quatre exercices | ✅ Réussi |
| Progression à 100 % | ✅ Réussi |
| Affichage de 190 kcal | ✅ Réussi |
| Confirmation de réinitialisation | À vérifier |
| Animation des boutons | À vérifier |

---

## 🧯 Difficultés rencontrées et solutions

| Problème | Solution |
|---|---|
| Chemin du projet introuvable | Recherche du dossier avec PowerShell |
| Émulateur Android bloqué | Redémarrage de l'émulateur |
| Ancien design trop simple | Création d'un thème noir et orange |
| Ajout de la photo sportive | Création du dossier `src/images` |
| Caractères mal affichés | Correction de l'encodage UTF-8 à vérifier |
| Dépôt GitHub distant modifié | Utilisation de `git pull --rebase origin main` |

---

## 🚀 Publication sur GitHub

Le projet est publié sur la branche `main`.

Les modifications du nouveau design sont enregistrées avec Git.

```powershell
git add src/
git commit -m "SportFit - Nouveau design noir et orange"
git pull --rebase origin main
git push origin main
```

Aucune commande `git push --force` n'a été utilisée.

---

## 📌 Limites et améliorations possibles

L'application fonctionne localement et ne nécessite pas de serveur externe.

Dans une prochaine version, je pourrais ajouter :

- Un historique des entraînements.
- Des vidéos pour expliquer les exercices.
- Des objectifs personnalisés.
- Plusieurs niveaux de difficulté.
- Des notifications pour rappeler les entraînements.

---

## Conclusion

Ce projet m'a permis de développer une application mobile de fitness avec NativeScript et Angular.

J'ai appris à créer des composants, gérer la navigation, utiliser le stockage local et développer un chronomètre.

J'ai également amélioré le design de mon application avec un thème noir et orange, une photo sportive, des statistiques et des récompenses.

Finalement, j'ai testé mon application sur Android et utilisé Git et GitHub pour publier mon travail.
