
import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({
  standalone: false,
  selector: 'Search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

  name: string = '';
  countries: Country[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApicallService) {}

  ngOnInit(): void {}

  searchCapital() {

    this.errorMessage = '';
    this.countries = [];

    if (!this.name || this.name.trim().length < 3) {
      this.errorMessage = 'Enter at least 3 characters.';
      return;
    }

    this.apiService
      .searchCountryByName(this.name)
      .subscribe({
        next: (data: Country[]) => {
          console.log(data);
          this.countries = data;

          if (data.length === 0) {
            this.errorMessage = 'No country found.';
          }
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = 'Capital not found!';
        },
      });
  }
}
