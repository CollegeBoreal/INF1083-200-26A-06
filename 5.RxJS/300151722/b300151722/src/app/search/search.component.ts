
import {
    Component,
    OnInit,
    ChangeDetectorRef,
    NgZone
} from '@angular/core';

import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({
    selector: 'Search',
    standalone: false,
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

    name: string = '';
    countries: Array<Country> = [];

    message: string = '';
    loading: boolean = false;

    constructor(
        private apiService: ApicallService,
        private cdr: ChangeDetectorRef,
        private zone: NgZone
    ) {}

    ngOnInit(): void {}

    searchCapital() {

        const capital = this.name.trim();

        this.countries = [];
        this.message = '';

        if (!capital) {
            this.message = 'Please enter a capital.';
            this.cdr.detectChanges();
            return;
        }

        this.loading = true;
        this.message = 'Searching...';
        this.cdr.detectChanges();

        this.apiService
            .searchCountryByName(capital)
            .subscribe({
                next: (data: Country[]) => {

                    this.zone.run(() => {

                        console.log(data);

                        this.countries = [...data];
                        this.loading = false;

                        this.message = data.length > 0
                            ? 'Search completed successfully.'
                            : 'No capital found.';

                        this.cdr.detectChanges();
                    });
                },

                error: (error) => {

                    this.zone.run(() => {

                        console.log(error);

                        this.countries = [];
                        this.loading = false;
                        this.message = 'Capital not found.';

                        this.cdr.detectChanges();
                    });
                }
            });
    }

    resetSearch() {
        this.name = '';
        this.countries = [];
        this.message = '';
        this.loading = false;
        this.cdr.detectChanges();
    }
}
