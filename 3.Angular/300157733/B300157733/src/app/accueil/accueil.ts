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

  etudiants = 4;
  professeurs = 3;
  cours = 3;
  utilisateurs = 10;

  afficherMessage() {
    alert('Bienvenue dans INF1083 !');
  }
}