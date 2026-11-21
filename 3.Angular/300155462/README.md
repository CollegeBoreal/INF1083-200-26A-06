# Angular et API REST

Zakaria Mamssi · INF1083 · Groupe 06

Application web à deux routes. Le bouton de la page Accueil affiche une salutation. La page Utilisateurs charge l’annuaire JSONPlaceholder avec HttpClient et affiche la liste ou une erreur réseau.

## Code source

### src/app/annuaire.ts

~~~typescript
import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User { id: number; name: string; email: string; }
@Component({selector: 'app-annuaire', template: `
  <h1>Utilisateurs</h1><button (click)="charger()" [disabled]="chargement()">Charger l’annuaire</button>
  <p role="status">{{ message() }}</p>
  <ul>@for (user of users(); track user.id) { <li><strong>{{ user.name }}</strong> · {{ user.email }}</li> }</ul>
`})
export class Annuaire {
  private http = inject(HttpClient);
  users = signal<User[]>([]);
  message = signal('');
  chargement = signal(false);

  charger(): void {
    this.chargement.set(true);
    this.message.set('Chargement…');
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe({
      next: users => {
        this.users.set(users);
        this.message.set(users.length + ' utilisateurs');
        this.chargement.set(false);
      },
      error: () => {
        this.message.set('Impossible de joindre le service. Réessaie.');
        this.chargement.set(false);
      },
    });
  }
}
~~~

<details>
<summary>src/app/accueil.ts</summary>

~~~typescript
import { Component } from '@angular/core';

@Component({selector: 'app-accueil', template: `
  <h1>{{ titre }}</h1><button (click)="saluer()">Saluer</button>
  @if (message) { <p role="status">{{ message }}</p> }
`})
export class Accueil {
  titre = 'Bienvenue INF1083';
  message = '';
  saluer(): void { this.message = 'Bonjour de la part de Zakaria !'; }
}
~~~

</details>

<details>
<summary>src/app/app.ts</summary>

~~~typescript
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({ selector: 'app-root', imports: [RouterLink, RouterOutlet],
  template: '<nav><a routerLink="/">Accueil</a><a routerLink="/utilisateurs">Utilisateurs</a></nav><main><router-outlet /></main>' })
export class App {}
~~~

</details>

<details>
<summary>src/index.html</summary>

~~~html
<!doctype html><html lang="fr"><head><meta charset="utf-8"><base href="/"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Annuaire INF1083</title></head><body><app-root></app-root></body></html>
~~~

</details>

<details>
<summary>src/main.ts</summary>

~~~typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
import { Accueil } from './app/accueil';
import { Annuaire } from './app/annuaire';

bootstrapApplication(App, { providers: [provideHttpClient(), provideRouter([
  { path: '', component: Accueil },
  { path: 'utilisateurs', component: Annuaire },
  { path: '**', redirectTo: '' },
])] }).catch(console.error);
~~~

</details>

<details>
<summary>src/styles.css</summary>

~~~css
body { margin: 0 auto; max-width: 48rem; padding: 2rem 1rem; font: 1.1rem/1.6 system-ui, sans-serif; color: #163642; }
nav { display: flex; gap: 2rem; border-bottom: 1px solid #98b2bb; padding-bottom: .75rem; }
a { color: #075f77; }
h1 { color: #165778; }
button { padding: .55rem 1rem; font: inherit; cursor: pointer; }
li { padding: .25rem 0; }
~~~

</details>

## Exécution

Avec Node.js 22.12+ et npm, depuis ce dossier :

```powershell
cd B300155462
npm install
npm start
```

## Vérification sur appareil ou navigateur

Ouvrir http://localhost:4200, saluer, puis sélectionner Utilisateurs et charger l’annuaire. Couper la connexion et réessayer pour vérifier le message d’erreur.

## Vérification effectuée

Capture des résultats locaux — Accueil et annuaire · HTTP simulé.

![Résultats de la vérification](images/verification.png)
