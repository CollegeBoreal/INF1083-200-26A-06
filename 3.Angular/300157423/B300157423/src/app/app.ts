import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveForms } from './reactive-forms/reactive-forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveForms],
  templateUrl: './bienvenue/bienvenue.html',
  styleUrl: './bienvenue/bienvenue.css'
})
export class App {

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
