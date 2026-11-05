import { Component, OnInit } from '@angular/core';
import { ApicallService } from './shared/apicall.service';
import { Country } from './shared/country';

@Component({
  standalone: false,
  selector: 'ns-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  name: string = '';
  countries: Country[] = [];
  message: string = '';
  loading: boolean = false;

  private allCountries: Country[] = [];

  constructor(private apiService: ApicallService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.message = 'Chargement des drapeaux...';

    this.apiService.getCountries().subscribe({
      next: (data: Country[]) => {
        this.loading = false;
        this.allCountries = data;
        this.searchCountries();
      },
      error: (error) => {
        this.loading = false;
        this.message = 'Chargement impossible. Vérifie Internet.';
        console.log(error);
      }
    });
  }

  searchCountries(): void {
    const search = this.normalize(this.name);

    this.countries = this.allCountries.filter(country =>
      this.normalize(country.name).includes(search)
    );

    this.message = this.countries.length === 0
      ? 'Aucun pays trouvé.'
      : '';
  }

  private normalize(text: string): string {
    const normalized = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');

    if (normalized === 'etatuni' || normalized === 'etatsunis') {
      return 'etatsunis';
    }

    return normalized;
  }
}