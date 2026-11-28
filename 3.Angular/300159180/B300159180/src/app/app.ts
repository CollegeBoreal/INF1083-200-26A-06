
import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Etudiant {
  id: number;
  nom: string;
  dateInscription: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly titre = signal('B300159180');
  protected readonly nom = signal('Étudiant');
  protected readonly projet = signal('B300159180');

  protected connecte = signal(true);

  protected etudiants = signal<Etudiant[]>(this.chargerEtudiants());

  protected nouveauEtudiant = signal('');
  protected message = signal('');

  protected recherche = signal('');
  protected indexModification = signal<number | null>(null);
  protected nomModification = signal('');

  // Liste filtrée selon la recherche
  protected resultatsRecherche = computed(() => {
    const terme = this.recherche().toLowerCase().trim();

    if (!terme) {
      return this.etudiants();
    }

    return this.etudiants().filter(etudiant =>
      etudiant.nom.toLowerCase().includes(terme)
    );
  });

  // Nombre total d'étudiants
  protected nombreEtudiants = computed(() =>
    this.etudiants().length
  );

  // Nombre d'étudiants ajoutés aujourd'hui
  protected ajoutesAujourdhui = computed(() => {
    const aujourdHui = new Date().toDateString();

    return this.etudiants().filter(etudiant =>
      new Date(etudiant.dateInscription).toDateString() === aujourdHui
    ).length;
  });

  // Nombre de résultats de recherche
  protected nombreResultats = computed(() =>
    this.resultatsRecherche().length
  );

  // Charger les étudiants depuis LocalStorage
  chargerEtudiants(): Etudiant[] {
    const donnees = localStorage.getItem('etudiants');

    if (donnees !== null) {
      try {
        const liste = JSON.parse(donnees);

        if (!Array.isArray(liste)) {
          return [];
        }

        return liste.map((element, index) => {
          if (typeof element === 'string') {
            return {
              id: Date.now() + index,
              nom: element,
              dateInscription: new Date().toISOString()
            };
          }

          return element;
        });

      } catch {
        return [];
      }
    }

    return [
      {
        id: 1,
        nom: 'ahmed belai',
        dateInscription: new Date().toISOString()
      },
      {
        id: 2,
        nom: 'sara',
        dateInscription: new Date().toISOString()
      }
    ];
  }

  // Sauvegarder les étudiants
  sauvegarderEtudiants(liste: Etudiant[]) {
    this.etudiants.set(liste);
    localStorage.setItem('etudiants', JSON.stringify(liste));
  }

  // Formater la date
  formaterDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-CA');
  }

  // Changer le nom
  changerNom() {
    this.nom.set('Mohamed');
  }

  // Changer l'état de connexion
  changerConnexion() {
    this.connecte.update(etat => !etat);
  }

  // Ajouter un étudiant
  ajouterEtudiant() {
    const nom = this.nouveauEtudiant().trim();

    if (nom === '') {
      this.message.set('Veuillez entrer un nom.');
      return;
    }

    const existe = this.etudiants().some(
      etudiant => etudiant.nom.toLowerCase() === nom.toLowerCase()
    );

    if (existe) {
      this.message.set('Cet étudiant existe déjà.');
      return;
    }

    const nouvelEtudiant: Etudiant = {
      id: Date.now(),
      nom: nom,
      dateInscription: new Date().toISOString()
    };

    const nouvelleListe = [
      ...this.etudiants(),
      nouvelEtudiant
    ];

    this.sauvegarderEtudiants(nouvelleListe);

    this.nouveauEtudiant.set('');
    this.message.set('Étudiant ajouté avec succès.');
  }

  // Supprimer un étudiant
  supprimerEtudiant(id: number) {
    const etudiant = this.etudiants().find(e => e.id === id);

    if (!etudiant) {
      return;
    }

    const confirmation = window.confirm(
      `Voulez-vous vraiment supprimer ${etudiant.nom} ?`
    );

    if (!confirmation) {
      return;
    }

    const nouvelleListe = this.etudiants().filter(
      e => e.id !== id
    );

    this.sauvegarderEtudiants(nouvelleListe);

    this.indexModification.set(null);
    this.message.set('Étudiant supprimé avec succès.');
  }

  // Supprimer tous les étudiants
  supprimerTousLesEtudiants() {
    if (this.etudiants().length === 0) {
      this.message.set('La liste est déjà vide.');
      return;
    }

    const confirmation = window.confirm(
      'Voulez-vous vraiment supprimer tous les étudiants ?'
    );

    if (!confirmation) {
      return;
    }

    this.sauvegarderEtudiants([]);
    this.indexModification.set(null);
    this.message.set('Tous les étudiants ont été supprimés.');
  }

  // Commencer la modification
  commencerModification(id: number) {
    const etudiant = this.etudiants().find(e => e.id === id);

    if (!etudiant) {
      return;
    }

    this.indexModification.set(id);
    this.nomModification.set(etudiant.nom);
    this.message.set('');
  }

  // Enregistrer la modification
  enregistrerModification(id: number) {
    const nouveauNom = this.nomModification().trim();

    if (nouveauNom === '') {
      this.message.set('Le nom ne peut pas être vide.');
      return;
    }

    const existe = this.etudiants().some(
      etudiant =>
        etudiant.id !== id &&
        etudiant.nom.toLowerCase() === nouveauNom.toLowerCase()
    );

    if (existe) {
      this.message.set('Cet étudiant existe déjà.');
      return;
    }

    const nouvelleListe = this.etudiants().map(etudiant =>
      etudiant.id === id
        ? { ...etudiant, nom: nouveauNom }
        : etudiant
    );

    this.sauvegarderEtudiants(nouvelleListe);

    this.indexModification.set(null);
    this.nomModification.set('');
    this.message.set('Étudiant modifié avec succès.');
  }

  // Annuler la modification
  annulerModification() {
    this.indexModification.set(null);
    this.nomModification.set('');
    this.message.set('');
  }

  // Exporter les étudiants en CSV
  exporterEtudiants() {
    const liste = this.etudiants();

    if (liste.length === 0) {
      this.message.set('Aucun étudiant à exporter.');
      return;
    }

    const entete = 'Nom;Date d’inscription';

    const lignes = liste.map(etudiant => {
      const nom = etudiant.nom.replace(/"/g, '""');
      const date = this.formaterDate(etudiant.dateInscription);

      return `"${nom}";"${date}"`;
    });

    const contenu = '\uFEFF' + [entete, ...lignes].join('\n');

    const fichier = new Blob([contenu], {
      type: 'text/csv;charset=utf-8;'
    });

    const url = URL.createObjectURL(fichier);
    const lien = document.createElement('a');

    lien.href = url;
    lien.download = 'liste-etudiants.csv';
    lien.click();

    URL.revokeObjectURL(url);

    this.message.set('Exportation effectuée avec succès.');
  }
}
