import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bienvenue',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bienvenue.html',
  styleUrls: ['./bienvenue.css']
})
export class Bienvenue implements OnInit {
  nouvelEtudiant: string = '';
  etudiants: string[] = [];

  // Liste des professeurs préchargée
  professeurs = [
    { nom: 'Jean Tremblay', email: 'jtremblay@collegeboreal.ca' },
    { nom: 'Marie Bouchard', email: 'mbouchard@collegeboreal.ca' },
    { nom: 'Pierre Gagnon', email: 'pgagnon@collegeboreal.ca' },
    { nom: 'Lucie Roy', email: 'lroy@collegeboreal.ca' }
  ];

  ngOnInit(): void {
    // Récupération des étudiants sauvegardés dans le navigateur
    const sauvegardes = localStorage.getItem('liste_etudiants');
    if (sauvegardes) {
      this.etudiants = JSON.parse(sauvegardes);
    } else {
      this.etudiants = ['Riadh', 'Bilel', 'Hichem', 'Oualid', 'Rayan'];
      this.sauvegarderEtudiants();
    }
  }

  ajouterEtudiant(): void {
    if (this.nouvelEtudiant.trim() !== '') {
      this.etudiants.push(this.nouvelEtudiant.trim());
      this.nouvelEtudiant = '';
      this.sauvegarderEtudiants();
    }
  }

  supprimerEtudiant(index: number): void {
    this.etudiants.splice(index, 1);
    this.sauvegarderEtudiants();
  }

  private sauvegarderEtudiants(): void {
    localStorage.setItem('liste_etudiants', JSON.stringify(this.etudiants));
  }
}