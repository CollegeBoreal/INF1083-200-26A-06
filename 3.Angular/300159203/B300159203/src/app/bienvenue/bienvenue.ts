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
<<<<<<< HEAD
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
=======
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
>>>>>>> 8a4d5cfc (Finalisation TP Angular: modification des professeurs, titre et persistence localstorage)
    }
  }

  supprimerEtudiant(index: number) {
    this.etudiants.splice(index, 1);
<<<<<<< HEAD
  }

  chargerUtilisateurs(): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        this.utilisateursAPI = data;
      })
      .catch(err => console.error("Erreur API :", err));
=======
    this.sauvegarder();
  }

  private sauvegarder() {
    localStorage.setItem('etudiants', JSON.stringify(this.etudiants));
>>>>>>> 8a4d5cfc (Finalisation TP Angular: modification des professeurs, titre et persistence localstorage)
  }
}