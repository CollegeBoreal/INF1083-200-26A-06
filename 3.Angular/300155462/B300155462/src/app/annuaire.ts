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
