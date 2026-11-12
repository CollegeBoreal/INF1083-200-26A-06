import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bienvenue',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bienvenue.html',
  styleUrl: './bienvenue.css'
})
export class Bienvenue {
  titre = 'Bienvenue dans INF1083';
  nouvelEtudiant = '';
  etudiants = ['Alice', 'Bob', 'Charlie'];
  message = '';

  constructor(
    private http: HttpClient,
    private changement: ChangeDetectorRef
  ) {}

  ajouterEtudiant() {
    const nom = this.nouvelEtudiant.trim();

    if (nom !== '') {
      this.etudiants.push(nom);
      this.nouvelEtudiant = '';
      alert('Étudiant ajouté !');
    }
  }

  supprimerEtudiant(index: number) {
    this.etudiants.splice(index, 1);
  }

  chargerUtilisateurs() {
    this.message = 'Chargement en cours...';

    this.http
      .get<{ name: string }[]>(
        'https://jsonplaceholder.typicode.com/users'
      )
      .subscribe({
        next: utilisateurs => {
          this.etudiants = utilisateurs.map(
            utilisateur => utilisateur.name
          );
          this.message = 'Liste chargée depuis l’API REST.';
          this.changement.markForCheck();
        },
        error: () => {
          this.message = 'Erreur : impossible de charger l’API.';
          this.changement.markForCheck();
        }
      });
  }
}