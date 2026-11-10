import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({
    selector: 'Search',
    templateUrl: './search.component.html',
    standalone: false
})
export class SearchComponent implements OnInit {

    name: string = '';
    countries: Country[] = [];
    isLoading: boolean = false;
    errorMessage: string = '';

    constructor(
        private apiService: ApicallService
    ) {}

    ngOnInit(): void {}

    searchCapital() {

        this.countries = [];
        this.errorMessage = '';

        if (!this.name || !this.name.trim()) {
            this.errorMessage = 'Enter a capital';
            return;
        }

        this.isLoading = true;

        console.log('Searching:', this.name);

        this.apiService
            .searchCountryByName(this.name)
            .subscribe({
                next: (data: Country[]) => {
                    console.log('SUCCESS:', JSON.stringify(data));

                    this.countries = data;
                    this.isLoading = false;

                    if (!data.length) {
                        this.errorMessage = 'No country found for this capital';
                    }
                },

                error: (error) => {
                    console.log('API ERROR:', error);

                    this.errorMessage = 'No country found for "' + this.name.trim() + '"';
                    this.isLoading = false;
                }
            });
    }
}
