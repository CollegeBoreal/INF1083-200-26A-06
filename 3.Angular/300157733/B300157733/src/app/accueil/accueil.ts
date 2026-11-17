import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {

  nom = 'Mouhamad';

  section = 'Accueil';

  etudiants = 4;
  professeurs = 3;
  cours = 3;
  utilisateurs = 10;

  changerSection(nomSection: string) {
    this.section = nomSection;
  }

  afficherMessage() {
    alert('Bienvenue dans INF1083 !');
  }
}