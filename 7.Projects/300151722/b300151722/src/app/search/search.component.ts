
import { Component, OnInit } from '@angular/core';

import {
    Application,
    ApplicationSettings,
    Utils
} from '@nativescript/core';

import { RouterExtensions } from '@nativescript/angular';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

import {
    PAYS_DU_MONDE,
    PaysCuisine
} from '../home/pays';

@Component({
    selector: 'Search',
    standalone: false,
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    paysFavoris: PaysCuisine[] = [];
    favorisCodes: string[] = [];

    message = '';

    constructor(
        private router: RouterExtensions
    ) {}

    ngOnInit(): void {
        this.actualiser();
    }

    actualiser(): void {
        try {
            const donnees = JSON.parse(
                ApplicationSettings.getString(
                    'cuisine_favoris_codes',
                    '[]'
                )
            );

            this.favorisCodes = Array.isArray(donnees)
                ? donnees.filter(
                    (code: unknown) => typeof code === 'string'
                )
                : [];

        } catch {
            this.favorisCodes = [];
        }

        this.paysFavoris = PAYS_DU_MONDE.filter(
            pays => this.favorisCodes.includes(pays.code)
        );
    }

    supprimerFavori(code: string): void {

        this.favorisCodes = this.favorisCodes.filter(
            favori => favori !== code
        );

        ApplicationSettings.setString(
            'cuisine_favoris_codes',
            JSON.stringify(this.favorisCodes)
        );

        this.actualiser();

        this.message = 'Favori supprimé.';
    }

    ouvrirYoutube(pays: PaysCuisine): void {

        const recherche =
            'recette traditionnelle ' +
            pays.plat + ' ' + pays.nom;

        const url =
            'https://www.youtube.com/results?search_query=' +
            encodeURIComponent(recherche);

        Utils.openUrl(url);
    }

    allerAccueil(): void {

        this.router.navigate(['/home'], {
            clearHistory: true,
            transition: {
                name: 'fade',
                duration: 200
            }
        });
    }

    onDrawerButtonTap(): void {

        const drawer =
            <RadSideDrawer>Application.getRootView();

        drawer.showDrawer();
    }
}
