
import { Component } from '@angular/core';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({
  standalone: false,
  selector: 'Search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  name: string = '';
  countries: Country[] = [];
  message: string = '';
  loading: boolean = false;

  constructor(private apiService: ApicallService) {}

  searchCapital(): void {
    if (!this.name.trim()) {
      this.message = 'Please enter a country name.';
      this.countries = [];
      return;
    }

    this.loading = true;
    this.message = '';
    this.countries = [];

    this.apiService.searchCountryByName(this.name)
      .subscribe({
        next: (data) => {
          this.countries = data;
          this.loading = false;
        },
        error: () => {
          this.message = 'Country not found. Try again.';
          this.loading = false;
        }
      });
  }
}
