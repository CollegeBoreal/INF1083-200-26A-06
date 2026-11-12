# Introduction à Angular

**Nom :** Amadou Sow
**Numéro étudiant :** 300159672
**Cours :** INF1083
**Projet :** B300159672
**Environnement :** macOS, Visual Studio Code

## 1. Objectif du laboratoire

J'ai créé une application Angular pour pratiquer les composants, le data binding, les événements, les directives, le routage, le CSS et la consommation d'une API REST.

## 2. Création de mon répertoire

Dans le dépôt du cours, j'ai créé mon dossier étudiant, le fichier `README.md` et le dossier `images` :

```bash
cd ~/Developer/INF1083-200-26A-06
git pull --no-edit
cd 3.Angular
mkdir 300159672
cd 300159672
touch README.md
mkdir images
touch images/.gitkeep
```

Le fichier `.gitkeep` permet à Git de conserver le dossier `images` lorsqu'il est vide.

<img width="774" height="138" alt="Capture d’écran 2026-11-12 à 11 25 20" src="https://github.com/user-attachments/assets/1246032c-1b17-43eb-9e60-29e7ac936f93" />


## 3. Installation d'Angular CLI

Node.js et npm étaient déjà installés sur mon Mac, mais ma version de Node (20) était trop ancienne pour Angular CLI 22. Je l'ai mise à jour avec `nvm` (voir « Problèmes rencontrés »), puis j'ai installé Angular CLI :

```bash
npm install -g @angular/cli
ng version
```

| Outil | Version |
| --- | --- |
| Node.js | 24.22.3 |
| npm | 11.19.1 |
| Angular CLI | 22.2.7 |

<img width="1512" height="982" alt="Capture d’écran 2026-11-12 à 11 19 37" src="https://github.com/user-attachments/assets/d857675e-b6d0-4177-8658-396a335b307a" />


## 4. Création du projet

Depuis mon dossier étudiant, j'ai créé le projet :

```bash
ng new B300159672
```

J'ai choisi le format de styles **CSS**, sans partage de données d'utilisation, sans SSR et sans outil d'intelligence artificielle. La version récente d'Angular CLI ne pose plus la question du routage : le fichier `app.routes.ts` est créé d'office.

J'ai ensuite démarré le serveur, puis ouvert `http://localhost:4200` :

```bash
cd B300159672
ng serve
```

La page d'accueil d'Angular s'est affichée avec « Hello, B300159672 ».
<img width="1512" height="982" alt="Capture d’écran 2026-11-12 à 13 17 32" src="https://github.com/user-attachments/assets/e9e6d375-3327-41a3-ac70-747683b2e51f" />


## 5. Composant Accueil

J'ai créé le composant avec :

```bash
ng generate component accueil
```

Cette commande a créé quatre fichiers dans `src/app/accueil` : `accueil.ts`, `accueil.html`, `accueil.css` et `accueil.spec.ts`. Dans cette version d'Angular, la classe s'appelle `Accueil` et les fichiers n'ont pas le suffixe `.component` utilisé dans le laboratoire.

Dans `accueil.ts`, j'ai ajouté les données du laboratoire :

```typescript
titre = 'Bienvenue INF1083';
nom = 'Prof';
connecte = true;
noms = ['Alice', 'Bob', 'Charlie'];

saluer() {
  alert('Bonjour !');
}
```

Dans `accueil.html`, j'ai utilisé le data binding, un événement, une condition et une liste :

```html
<h1>{{ titre }}</h1>
<p>{{ nom }}</p>

<button (click)="saluer()">Cliquez-moi</button>

<div *ngIf="connecte">Connecté</div>

<ul>
  <li *ngFor="let nom of noms">{{ nom }}</li>
</ul>
```

- `{{ }}` affiche une valeur définie dans le fichier TypeScript ;
- `(click)` relie le clic à la méthode `saluer()` ;
- `*ngIf` affiche « Connecté » lorsque `connecte` vaut `true` ;
- `*ngFor` affiche un élément pour chaque nom de la liste.

Les directives `NgIf` et `NgFor` doivent être importées dans le composant pour fonctionner.

## 6. Routage

Dans `app.routes.ts`, j'ai associé la route d'accueil au composant `Accueil` :

```typescript
export const routes: Routes = [
  { path: '', component: Accueil }
];
```

Dans `app.html`, j'ai remplacé la page par défaut d'Angular par `<router-outlet />`, l'endroit où Angular affiche le composant de la route.

<img width="1512" height="982" alt="Capture d’écran 2026-11-12 à 13 17 32" src="https://github.com/user-attachments/assets/c62c3181-9076-497e-80fd-094712e83a70" />


## 7. Style CSS

Dans `accueil.css`, j'ai ajouté :

```css
h1 {
  color: blue;
}
```

Le titre principal apparaît en bleu dans le navigateur.

<img width="1512" height="982" alt="Capture d’écran 2026-11-12 à 13 27 36" src="https://github.com/user-attachments/assets/e09ee198-2e31-459b-b82c-22cbe8596e42" />


## 8. API REST

J'ai activé le client HTTP dans `app.config.ts` avec `provideHttpClient()`. Sans cette ligne, l'appel à l'API échoue.

Dans `accueil.ts`, j'ai injecté `HttpClient` et ajouté une méthode qui appelle l'API :

```typescript
private http = inject(HttpClient);

chargerUtilisateurs() {
  this.http
    .get('https://jsonplaceholder.typicode.com/users')
    .subscribe(data => {
      console.log(data);
    });
}
```

Un bouton « Charger les utilisateurs » appelle cette méthode. La console du navigateur affiche un tableau de 10 utilisateurs (`Array(10)`). Une connexion Internet est nécessaire.

<img width="1052" height="736" alt="Capture d’écran 2026-11-12 à 13 36 00" src="https://github.com/user-attachments/assets/687402a9-cefd-4a26-9694-2f6b96a2f21d" />


## 9. Problèmes rencontrés

**Version de Node trop ancienne.** Mon Node était en version 20.20.2, alors qu'Angular CLI 22 demande une version plus récente. `brew install node` n'a rien changé, car `nvm` passait devant Homebrew. J'ai installé et activé Node 24 avec `nvm` :

```bash
nvm install 24
nvm use 24
nvm alias default 24
```

**Erreur TS2551 : propriété `titre` introuvable.** J'avais écrit `Titre` avec une majuscule dans `accueil.ts`, alors que le HTML utilise `titre`. TypeScript distingue les majuscules des minuscules. J'ai corrigé le nom et enregistré le fichier.

**Serveur arrêté.** Le navigateur affichait `ERR_CONNECTION_REFUSED` parce que `ng serve` n'était plus lancé. Je l'ai relancé depuis le dossier du projet.

## 10. Bilan

Ce travail m'a permis de pratiquer les composants Angular, le data binding, les événements, les directives, le routage, le CSS et le client HTTP. L'application fonctionne et affiche les données de l'API dans la console. Les fichiers de test ont été générés, mais je n'ai pas exécuté de tests automatisés.
