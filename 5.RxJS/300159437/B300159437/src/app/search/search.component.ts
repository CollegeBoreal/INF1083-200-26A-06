
import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({
    selector: 'Search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    name: string = '';
    countries: Country[] = [];
    loading: boolean = false;
    errorMessage: string = '';

    constructor(private apiService: ApicallService) {}

    ngOnInit(): void {}

    searchCapital() {
        if (!this.name.trim()) {
            this.errorMessage = 'Please enter a country name.';
            return;
        }

        this.loading = true;
        this.errorMessage = '';
        this.countries = [];

        this.apiService.searchCountryByName(this.name.trim())
            .subscribe({
                next: (data: Country[]) => {
                    this.countries = data;
                    this.loading = false;
                },
                error: () => {
                    this.errorMessage = 'Country not found. Try again.';
                    this.loading = false;
                }
            });
    }
}
