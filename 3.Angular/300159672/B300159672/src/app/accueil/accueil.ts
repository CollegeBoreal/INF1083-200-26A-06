import { Component, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [NgIf, NgFor],
  selector: 'app-accueil',
  styleUrl: './accueil.css',
  templateUrl: './accueil.html',
})
export class Accueil {
  private http = inject(HttpClient);

  titre = 'Bienvenue INF1083';
  nom = 'Prof';
  connecte = true;
  noms = ['Alice', 'Bob', 'Charlie'];

  saluer() {
    alert('Bonjour !');
  }

  chargerUtilisateurs() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        console.log(data);
      });
  }
}