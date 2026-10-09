import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bienvenue',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bienvenue.html',
  styleUrl: './bienvenue.css'
})
export class BienvenueComponent implements OnInit {

  etudiants: string[] = [];
  nouvelEtudiant: string = '';

  // Liste des professeurs avec la mention Mr.
  professeurs = [
    { nom: 'Mr. Brice', email: 'brice@collegeboreal.ca' },
    { nom: 'Mr. Adi', email: 'adi@collegeboreal.ca' },
    { nom: 'Mr. William', email: 'william@collegeboreal.ca' },
    { nom: 'Mr. Abid', email: 'abid@collegeboreal.ca' }
  ];

  ngOnInit() {
    // Récupération de la liste sauvegardée dans le navigateur
    const etudiantsSauvegardes = localStorage.getItem('etudiants');
    if (etudiantsSauvegardes) {
      this.etudiants = JSON.parse(etudiantsSauvegardes);
    } else {
      this.etudiants = ['Riadh', 'Bilel', 'Hichem', 'Oualid', 'Rayan', 'youcef'];
      this.sauvegarder();
    }
  }

  ajouterEtudiant() {
    if (this.nouvelEtudiant.trim() !== '') {
      this.etudiants.push(this.nouvelEtudiant);
      this.nouvelEtudiant = '';
      this.sauvegarder();
    }
  }

  supprimerEtudiant(index: number) {
    this.etudiants.splice(index, 1);
    this.sauvegarder();
  }

  private sauvegarder() {
    localStorage.setItem('etudiants', JSON.stringify(this.etudiants));
  }
}