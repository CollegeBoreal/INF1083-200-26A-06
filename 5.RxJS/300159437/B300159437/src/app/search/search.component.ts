
import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({
    standalone: false,
    selector: 'Search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

    name: string = '';
    countries: Country[] = [];

    constructor(private apiService: ApicallService) {}

    ngOnInit(): void {}

    searchCapital(): void {
        if (!this.name.trim()) {
            this.countries = [];
            return;
        }

        this.apiService
            .searchCountryByName(this.name)
            .subscribe({
                next: (data: Country[]) => {
                    console.log(data);
                    this.countries = data;
                },
                error: (error) => {
                    console.error(error);
                    this.countries = [];
                }
            });
    }
}
