import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Utilisateur {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-accueil',
  imports: [],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil implements OnInit {
  titre = 'Bienvenue INF1083';

  connecte = true;

  noms = ['Alice', 'Bob', 'Charlie'];

  utilisateurs: Utilisateur[] = [];

  private http = inject(HttpClient);

  saluer() {
    alert('Bonjour !');
  }

  ngOnInit() {
    this.http
      .get<Utilisateur[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        this.utilisateurs = data;
        console.log(data);
      });
  }
}