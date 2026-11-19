
import { Component, OnInit } from '@angular/core';

@Component({
    standalone: false,
    selector: 'Search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

    nom: string = '';
    telephone: string = '';
    service: string = '';
    date: string = '';
    message: string = '';

    constructor() {
    }

    ngOnInit(): void {
    }

    reserver() {
        if (this.nom && this.telephone &&
            this.service && this.date) {

            this.message = 'Demande de réservation enregistrée !';

            console.log({
                nom: this.nom,
                telephone: this.telephone,
                service: this.service,
                date: this.date
            });

        } else {
            this.message = 'Veuillez remplir tous les champs.';
        }
    }
}
