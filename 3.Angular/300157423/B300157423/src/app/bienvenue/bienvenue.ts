import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bienvenue',
  imports: [CommonModule, FormsModule],
  templateUrl: './bienvenue.html',
  styleUrl: './bienvenue.css'
})
export class Bienvenue {

  titre = 'Bienvenue dans INF1083';

  etudiants = ['Massinissa', 'Dihya', 'Jugurtha'];

  nouvelEtudiant = '';

  ajouterEtudiant() {
    if (this.nouvelEtudiant.trim() !== '') {
      this.etudiants.push(this.nouvelEtudiant);
      this.nouvelEtudiant = '';
    }
  }

  supprimerEtudiant(index: number) {
    this.etudiants.splice(index, 1);
  }

}