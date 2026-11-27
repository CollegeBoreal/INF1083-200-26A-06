import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Utilisateur {
  id: number;
  name: string;
}

@Component({
  imports: [],
  selector: 'app-accueil',
  styleUrl: './accueil.component.css',
  templateUrl: './accueil.component.html',
})
export class Accueil {
  private readonly http = inject(HttpClient);

  titre = 'Bienvenue INF1083';
  nom = 'Yamna Cherif';
  connecte = true;
  noms = ['Alice', 'Bob', 'Charlie'];

  utilisateurs = signal<Utilisateur[]>([]);
  erreur = signal('');

  saluer(): void {
    alert('Bonjour !');
  }

  chargerUtilisateurs(): void {
    this.erreur.set('');

    this.http
      .get<Utilisateur[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (donnees) => {
          this.utilisateurs.set(donnees);
          console.log(donnees);
        },
        error: () => {
          this.erreur.set('Impossible de charger les utilisateurs.');
        }
      });
  }
}