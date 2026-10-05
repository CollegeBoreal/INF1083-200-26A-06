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
export class Bienvenue implements OnInit {
  messageBienvenue: string = "Bienvenue dans INF1083 session A26 SECTION 6";
  etudiants: string[] = ["Riadh", "Bilel", "Hichem", "Oualid", "Rayan"];
  nouvelEtudiant: string = "";
  utilisateursAPI: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.chargerUtilisateurs();
  }

  saluer(): void {
    alert("Bonjour ! Vous avez cliqué sur le bouton.");
  }

  ajouterEtudiant(): void {
    if (this.nouvelEtudiant.trim() !== "") {
      this.etudiants.push(this.nouvelEtudiant.trim());
      this.nouvelEtudiant = "";
    }
  }

  supprimerEtudiant(index: number): void {
    this.etudiants.splice(index, 1);
  }

  chargerUtilisateurs(): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        this.utilisateursAPI = data;
      })
      .catch(err => console.error("Erreur API :", err));
  }
}