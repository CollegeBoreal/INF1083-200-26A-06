import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Bienvenue } from './bienvenue/bienvenue';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [RouterOutlet, Bienvenue, NgFor, NgIf, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('b300159195');
  nom = 'Islem' ;
  etudiants = ['Alice', 'Bob', 'Charlie'];
  nouvelEtudiant = '';
  message = '';

afficherMessage() {
  this.message = 'Bonjour Islem !';
}
ajouterEtudiant() {
  const nom = this.nouvelEtudiant.trim();
  if (nom) {
    this.etudiants.push(nom);
    this.nouvelEtudiant = '';
  }
}
supprimerEtudiant(index: number) {
  this.etudiants.splice(index, 1);
}
private http = inject(HttpClient);
utilisateurs: { id: number; name: string }[] = [];

ngOnInit() {
  this.http
    .get<{ id: number; name: string }[]>('https://jsonplaceholder.typicode.com/users')
    .subscribe({
      next: (donnees) => this.utilisateurs = donnees,
      error: (erreur) => console.error('Erreur API :', erreur)
    });
}
}