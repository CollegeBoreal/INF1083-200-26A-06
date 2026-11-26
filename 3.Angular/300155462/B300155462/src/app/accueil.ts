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
