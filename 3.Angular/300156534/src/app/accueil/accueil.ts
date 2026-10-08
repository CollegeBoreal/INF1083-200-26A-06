import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [FormsModule],
  selector: 'app-accueil',
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {

  titre = 'Bienvenue INF1083';

  etudiants = ['Alice', 'Bob', 'Charlie'];

  nouvelEtudiant = '';

  message = '';

  utilisateurs: any[] = [];

  constructor(private http: HttpClient) {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs() {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => {
          this.utilisateurs = data;
        },
        error: (error) => {
          console.error('Erreur API :', error);
        }
      });
  }

  ajouterEtudiant() {
    if (this.nouvelEtudiant.trim() !== '') {
      this.etudiants.push(this.nouvelEtudiant);
      this.nouvelEtudiant = '';
      this.message = 'Étudiant ajouté !';
    }
  }

  supprimerEtudiant(index: number) {
    this.etudiants.splice(index, 1);
    this.message = 'Étudiant supprimé !';
  }
}