
import { Component } from '@angular/core';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({
    selector: 'Search',
    standalone: false,
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {

    name = '';
    countries: Country[] = [];
    loading = false;
    errorMessage = '';

    constructor(private apiService: ApicallService) {}

    searchCapital(): void {
        const countryName = this.name.trim();

        if (!countryName) {
            this.errorMessage = 'Please enter a country name.';
            return;
        }

        this.loading = true;
        this.errorMessage = '';
        this.countries = [];

        this.apiService.searchCountryByName(countryName)
            .subscribe({
                next: (data) => {
                    this.countries = data;
                    this.loading = false;
                },
                error: () => {
                    this.errorMessage = 'Country not found.';
                    this.loading = false;
                }
            });
    }
}
