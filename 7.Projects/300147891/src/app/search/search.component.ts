import { Component, OnInit } from '@angular/core'
import { ApplicationSettings } from '@nativescript/core'

@Component({
    standalone: false,
    selector: 'Search',
    templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

    nombreSeances = 0;
    objectif = 3;

    constructor() {
    }

    ngOnInit(): void {
        this.nombreSeances = ApplicationSettings.getNumber('seances', 0);
    }

    ajouterSeance(): void {
        this.nombreSeances++;
        ApplicationSettings.setNumber('seances', this.nombreSeances);
    }

    reinitialiser(): void {
        this.nombreSeances = 0;
        ApplicationSettings.setNumber('seances', 0);
    }

    get progression(): number {
        return Math.min(100, Math.round(
            this.nombreSeances / this.objectif * 100
        ));
    }
}
