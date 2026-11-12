import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule, FormsModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {
  titre = 'Bienvenue INF1083';
  nom = 'Prof';

  connecte = true;

  nouveauNom = '';

  recherche = '';

  noms = [
    'Al barchie',
    'Idris',
    'Arold'
  ];

  get nomsFiltres() {
    return this.noms.filter(nom =>
      nom.toLowerCase().includes(this.recherche.toLowerCase())
    );
  }

  saluer() {
    alert('Bonjour !');
  }

  ajouterNom() {
    if (this.nouveauNom.trim()) {
      this.noms.push(this.nouveauNom);
      this.nouveauNom = '';
    }
  }

  supprimerNom(index: number) {
    this.noms.splice(index, 1);
  }
}