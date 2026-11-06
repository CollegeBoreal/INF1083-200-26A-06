import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DataService, DataItem } from '../shared/data.service';
import { Book } from '../shared/book';
import { BookSearchService } from '../shared/book-search.service';

@Component({
  standalone: false,
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  items: Array<DataItem>;
  titreRecherche = '';
  resultatRecherche = '';
livres: Book[] = [];

  constructor(
  private _itemService: DataService,
  private bookSearchService: BookSearchService,
  private zone: NgZone,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.items = this._itemService.getItems();
  }

  rechercher(): void {
  const recherche = this.titreRecherche.trim();
  this.livres = [];

  if (!recherche) {
    this.resultatRecherche = 'Veuillez saisir un titre, un auteur ou une année.';
    return;
  }

  this.resultatRecherche = 'Recherche en cours...';

  this.bookSearchService.search(recherche).subscribe({
  next: (response) => {
    this.zone.run(() => {
      this.livres = response.docs;
      this.resultatRecherche = this.livres.length
        ? `${this.livres.length} livre(s) trouvé(s).`
        : 'Aucun livre trouvé.';

        this.cdr.detectChanges();
    });
  },
  error: (err) => {
    console.log('Erreur recherche :', err);
    this.zone.run(() => {
      this.resultatRecherche = 'Erreur lors de la recherche.';
    });
  },
});
}
}