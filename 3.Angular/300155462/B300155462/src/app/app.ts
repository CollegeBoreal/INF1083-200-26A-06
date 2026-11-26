import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({ selector: 'app-root', imports: [RouterLink, RouterOutlet],
  template: '<nav><a routerLink="/">Accueil</a><a routerLink="/utilisateurs">Utilisateurs</a></nav><main><router-outlet /></main>' })
export class App {}
