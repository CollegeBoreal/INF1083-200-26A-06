# TP — Introduction à Angular (`B300153416`)

## Objectif
Découvrir l'architecture d'une application monopage (SPA) moderne avec Angular, configurer l'environnement de développement et créer une interface interactive sur `http://localhost:4200` (application **Music Legends**).

## Commandes & étapes réalisées
- **Environnement & CLI :**
  - Windows : `choco install nodejs-lts -y`
  - macOS : `brew install node`
  - Vérification : `node --version`, `npm --version`, `npm install -g @angular/cli`, `ng version`
- **Création & démarrage du projet :**
  - Création du répertoire `300153416` avec `README.md` et dossier `images`
  - Initialisation : `ng new B300153416` (Routing : `Yes`, Stylesheet : `CSS`)
  - Lancement : `cd B300153416` puis `ng serve` (`http://localhost:4200`)
- **Composants :**
  - Génération : `ng generate component accueil` ou `ng g c accueil`
- **Data binding, évènements & directives :**
  - Interpolation (`{{ ... }}`), liaison d'évènement `(click)="..."`, conditions et listes
- **Routage, API REST & style :**
  - Configuration des routes (`path`, `component`), requêtes via `HttpClient` (`this.http.get(...).subscribe(...)`) et styles CSS par composant

## Capture d'écran
![Résultat de l'application](images/resultat.png)

## Apercu de l'application (localhost:4200)

![Music Legends Angular](./images/music-legends-angular.png)
<img width="2040" height="1536" alt="=====" src="https://github.com/user-attachments/assets/a1558078-0c19-4619-ad17-1ce3f93313b9" />

