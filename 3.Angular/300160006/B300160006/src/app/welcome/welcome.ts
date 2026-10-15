import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {

  titre = '🎓 Bienvenue INF1083';

  nom = 'Gestion des étudiants, professeurs, cours et utilisateurs';

  connecte = true;

  dateActuelle = new Date();
  
  section = 'accueil';

  rechercheProf = '';
  rechercheCours = '';

  etudiants = [
    'Maimouna Fall',
    'Anta Top',
    'Fatima Kane',
    'Faty Ndiaye'
  ];


  professeurs = [
    {
      nom: 'Mr Brice',
      email: 'brice@boreal.ca',
      departement: 'Informatique'
    },
    {
      nom: 'Mr Amadou',
      email: 'amadou@boreal.ca',
      departement: 'Mathématiques'
    },
    {
      nom: 'Mr Adi',
      email: 'adi@boreal.ca',
      departement: 'reseautique'
    }
  ];

  cours = [
    {
      code: 'INF1083',
      nom: 'Développement Web',
      professeur: 'Mr Brice'
    },
    {
      code: 'INF1120',
      nom: 'Programmation Java',
      professeur: 'Mr William'
    },
    {
      code: 'INF2050',
      nom: 'Bases de données',
      professeur: 'Mr Diallo'
    }
  ];

  notifications = [
    '📚 Examen INF1083 le mois prochain',
    '👨‍🏫 Réunion des professeurs vendredi',
    '✅ Projet Angular en cours'
  ];

  rechercheEtudiant = '';
  nouveauEtudiant = '';
  indexModification = -1;

  utilisateurs: any[] = [];
  utilisateursFiltres: any[] = [];

  rechercheUtilisateur = '';

  constructor(private http: HttpClient) {

    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => {

          this.utilisateurs = data;
          this.utilisateursFiltres = data;

        },

        error: (err) => {

          console.error('Erreur API :', err);

        }
      });
  }

  saluer() {

    alert(
      'Bienvenue dans votre portail universitaire INF1083 🎓'
    );

  }

  filtrerEtudiants() {

    return this.etudiants.filter(etudiant =>
      etudiant
        .toLowerCase()
        .includes(
          this.rechercheEtudiant.toLowerCase()
        )
    );

  }

  ajouterEtudiant() {

    if (this.nouveauEtudiant.trim() === '') {
      return;
    }

    this.etudiants.push(
      this.nouveauEtudiant.trim()
    );

    this.nouveauEtudiant = '';

    alert('✅ Étudiant ajouté avec succès');

  }

  modifierEtudiant(index: number) {

    this.indexModification = index;

    this.nouveauEtudiant =
      this.etudiants[index];

  }

  enregistrerModification() {

    if (
      this.indexModification !== -1 &&
      this.nouveauEtudiant.trim() !== ''
    ) {

      this.etudiants[this.indexModification] =
        this.nouveauEtudiant.trim();

      this.indexModification = -1;
      this.nouveauEtudiant = '';

      alert('✅ Modification enregistrée');
    }

  }

  annuler() {

    this.indexModification = -1;
    this.nouveauEtudiant = '';

  }

  supprimerEtudiant(index: number) {

    this.etudiants.splice(index, 1);

    alert('🗑️ Étudiant supprimé');

  }

  filtrerProfesseurs() {

  return this.professeurs.filter(prof =>
    prof.nom
      .toLowerCase()
      .includes(this.rechercheProf.toLowerCase())
  );

}

filtrerCours() {

  return this.cours.filter(cours =>
    cours.nom
      .toLowerCase()
      .includes(this.rechercheCours.toLowerCase())
  );

}
  rechercherUtilisateur() {

    this.utilisateursFiltres =
      this.utilisateurs.filter(utilisateur =>
        utilisateur.name
          .toLowerCase()
          .includes(
            this.rechercheUtilisateur.toLowerCase()
          )
      );

  }

}