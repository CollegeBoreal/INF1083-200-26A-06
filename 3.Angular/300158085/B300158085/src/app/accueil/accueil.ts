import { Component, inject, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Bienvenue } from '../bienvenue/bienvenue';

interface Utilisateur {
  id: number;
  name: string;
  email: string;
}

@Component({
  imports: [NgIf, NgFor, Bienvenue],
  selector: 'app-accueil',
  styleUrl: './accueil.css',
  templateUrl: './accueil.html',
})
export class Accueil {
  titre = 'Bienvenue INF1083';
  nom = 'Kevin';
  connecte = true;

  etudiants = signal(['Alice', 'Bob', 'Charlie']);
  utilisateurs = signal<Utilisateur[]>([]);
  messageApi = signal('');

  private http = inject(HttpClient);

  saluer() {
    alert('Bonjour !');
  }

  ajouter(champ: HTMLInputElement) {
    const nomEtudiant = champ.value.trim();

    if (nomEtudiant === '') {
      alert('Veuillez écrire le nom de l’étudiant.');
      return;
    }

    this.etudiants.update(liste => [...liste, nomEtudiant]);
    champ.value = '';

    alert('Étudiant ajouté : ' + nomEtudiant);
  }

  supprimer(index: number) {
    this.etudiants.update(liste =>
      liste.filter((_, position) => position !== index)
    );
  }

  chargerUtilisateurs() {
    this.messageApi.set('Chargement...');

    this.http
      .get<Utilisateur[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: data => {
          this.utilisateurs.set(data);
          this.messageApi.set('Utilisateurs chargés.');
          console.log(data);
        },
        error: () => {
          this.messageApi.set('Impossible de charger les utilisateurs.');
        },
      });
  }
}
