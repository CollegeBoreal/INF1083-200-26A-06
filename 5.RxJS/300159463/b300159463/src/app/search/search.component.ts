
import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({
    selector: 'Search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

    name: string = '';
    countries: Array<Country> = [];
    errorMessage: string = '';

    constructor(
        private apiService: ApicallService
    ) {}

    ngOnInit(): void {}

    searchCapital(): void {

        if (!this.name.trim()) {
            this.errorMessage = 'Enter a capital!';
            this.countries = [];
            return;
        }

        this.errorMessage = '';

        this.apiService
            .searchCountryByName(this.name.trim())
            .subscribe({
                next: (data: Country[]) => {
                    console.log(data);
                    this.countries = data;
                },

                error: (error) => {
                    console.error(error);
                    this.countries = [];
                    this.errorMessage = 'Capital not found!';
                }
            });
    }
}
