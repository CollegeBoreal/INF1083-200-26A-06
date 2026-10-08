# 🚀 Laboratoire — Introduction à Angular

## 📚 INF1083 — Développement d'applications

**Identifiant :** 300159437  
**Nom du projet :** B300159437  
**Technologies :** Angular, TypeScript, HTML, CSS, Node.js et npm

---

## 🎯 1. Objectif du laboratoire

Ce laboratoire a pour objectif de découvrir le framework Angular et d'apprendre à développer une application web dynamique.

Les principales compétences abordées sont :

- Installer Node.js et Angular CLI.
- Créer et démarrer une application Angular.
- Comprendre le fonctionnement des composants.
- Utiliser le Data Binding.
- Gérer les événements utilisateur.
- Afficher des données avec les directives Angular.
- Personnaliser une interface avec CSS.

---

## 🛠️ 2. Installation et vérification des outils

Avant de commencer le développement, j'ai vérifié que Node.js et npm étaient installés sur mon ordinateur.

### Vérification de Node.js

```powershell
node --version
```

**Résultat :** `v24.21.0`

### Vérification de npm

```powershell
npm --version
```

**Résultat :** `11.19.0`

### Installation d'Angular CLI

J'ai installé Angular CLI avec la commande suivante :

```powershell
npm install -g @angular/cli
```

Pour vérifier l'installation :

```powershell
ng version
```

**Résultat obtenu :**

- Angular CLI : 22.2.2
- Node.js : 24.21.0
- npm : 11.19.0
- Système d'exploitation : Windows 64 bits

### 📸 Capture d'écran — Installation d'Angular

<img src="images/Screenshot%202026-10-08%20100024.png" width="85%" alt="Vérification de Node.js, npm et Angular CLI">

Cette capture confirme que les outils nécessaires au développement Angular ont été installés et vérifiés avec succès.

---

## 📦 3. Création du projet Angular

J'ai créé mon application Angular avec la commande :

```powershell
ng new B300159437
```

Pendant la configuration, j'ai sélectionné CSS comme système de styles.

Pour accéder au projet :

```powershell
cd B300159437
```

### Démarrage du serveur

```powershell
ng serve
```

Une fois le serveur démarré, Angular affiche l'adresse locale :

```text
http://localhost:4200/
```

### 📸 Capture d'écran — Serveur Angular

<img src="images/Screenshot%202026-10-08%20100805.png" width="85%" alt="Démarrage du serveur Angular">

Le message `Application bundle generation complete` confirme que l'application a été compilée avec succès.

Le mode `Watch mode enabled` permet également de détecter automatiquement les modifications apportées aux fichiers du projet.

---

## 🧩 4. Création du premier composant

Dans Angular, un composant représente une partie de l'interface utilisateur.

Pour créer mon premier composant nommé `accueil`, j'ai utilisé :

```powershell
ng generate component accueil
```

Ou sa version abrégée :

```powershell
ng g c accueil
```

Angular a généré les fichiers suivants :

```text
src/
└── app/
    └── accueil/
        ├── accueil.ts
        ├── accueil.html
        ├── accueil.css
        └── accueil.spec.ts
```

Chaque fichier joue un rôle important :

- `accueil.ts` : contient la logique TypeScript.
- `accueil.html` : définit la structure de l'interface.
- `accueil.css` : permet de personnaliser l'apparence.
- `accueil.spec.ts` : sert aux tests unitaires.

---

## 🔄 5. Utilisation du Data Binding

Le Data Binding permet de connecter les données TypeScript à l'interface HTML.

Dans le fichier `accueil.ts`, j'ai déclaré les variables suivantes :

```typescript
titre = 'Bienvenue INF1083';
nom = 'Prof';
```

Dans le fichier `accueil.html`, j'ai utilisé l'interpolation :

```html
<h1>{{ titre }}</h1>
<p>{{ nom }}</p>
```

**Résultat :**

```text
Bienvenue INF1083
Prof
```

Cette fonctionnalité permet d'afficher automatiquement les valeurs provenant du composant TypeScript.

---

## 🖱️ 6. Gestion des événements

J'ai ajouté un bouton permettant de déclencher une action lorsqu'un utilisateur clique dessus.

### TypeScript

```typescript
saluer() {
  alert('Bonjour !');
}
```

### HTML

```html
<button (click)="saluer()">
  Cliquez-moi
</button>
```

Lorsque l'utilisateur clique sur le bouton, une fenêtre affiche le message « Bonjour ! ».

Cet exercice m'a permis de comprendre comment associer un événement HTML à une méthode TypeScript.

---

## 📋 7. Utilisation des directives Angular

### Affichage conditionnel

Dans le fichier TypeScript :

```typescript
connecte = true;
```

Dans le fichier HTML :

```html
@if (connecte) {
  <div>Connecté</div>
}
```

Le message « Connecté » s'affiche lorsque la condition est vraie.

### Affichage d'une liste

Dans le fichier TypeScript :

```typescript
noms = ['Alice', 'Bob', 'Charlie'];
```

Dans le fichier HTML :

```html
<ul>
  @for (nom of noms; track $index) {
    <li>{{ nom }}</li>
  }
</ul>
```

**Résultat :**

```text
• Alice
• Bob
• Charlie
```

Cette fonctionnalité permet d'afficher plusieurs éléments à partir d'un tableau TypeScript.

---

## 🎨 8. Personnalisation CSS

Pour améliorer l'apparence de l'application, j'ai ajouté des styles dans `accueil.css`.

```css
h1 {
  color: blue;
}

button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
```

Ces styles permettent de modifier la couleur du titre et de personnaliser le bouton.

---

## 🌐 9. Résultat final de l'application

Après avoir créé et configuré le composant `accueil`, j'ai ouvert l'application dans mon navigateur :

```text
http://localhost:4200/
```

L'interface affiche :

- Le titre « Bienvenue INF1083 ».
- La valeur « Prof » grâce au Data Binding.
- Un bouton interactif.
- Le message « Connecté ».
- Une liste de trois utilisateurs.

### 📸 Capture d'écran — Application Angular

<img src="images/Screenshot%202026-10-08%20113535.png" width="85%" alt="Résultat du composant Accueil Angular">

Cette capture montre le résultat des différentes fonctionnalités développées pendant le laboratoire.

---

## 🧠 10. Difficultés rencontrées et apprentissages

Pendant la réalisation de ce laboratoire, j'ai rencontré quelques difficultés, notamment pour comprendre la structure des fichiers Angular et afficher mon composant `accueil` à la place de la page par défaut.

J'ai également appris qu'un seul serveur Angular peut utiliser le port 4200 à la fois.

Ces difficultés m'ont permis de mieux comprendre le fonctionnement d'Angular, la relation entre TypeScript et HTML ainsi que l'importance de chaque fichier dans un projet.

---

## ✅ 11. Conclusion

Ce laboratoire m'a permis de découvrir Angular et de comprendre les bases du développement d'applications web modernes.

J'ai appris à installer les outils nécessaires, créer une application, développer un composant, afficher des données dynamiques et gérer des événements.

Même si j'ai rencontré certaines erreurs pendant les différentes étapes, leur résolution m'a aidé à améliorer mes compétences techniques et à devenir plus autonome dans l'utilisation d'Angular.

Ce laboratoire constitue une première étape importante dans mon apprentissage du développement web avec Angular.
