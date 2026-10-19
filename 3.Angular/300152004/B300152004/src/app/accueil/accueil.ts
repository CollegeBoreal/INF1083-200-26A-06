import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accueil',
  imports: [],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil implements OnInit {

  titre = 'Bienvenue INF1083';

  nom = 'Daniel';

  connecte = true;

  etudiants = [
    'Daniel',
    'Alice',
    'Bob',
    'Charlie'
  ];

  utilisateurs: any[] = [];

  constructor(private http: HttpClient) {}

  saluer() {
    alert('Bonjour ' + this.nom);
  }

  ngOnInit() {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((data) => {
        this.utilisateurs = data;
        console.log(data);
      });
  }

}