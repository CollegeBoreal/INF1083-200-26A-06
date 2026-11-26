
import { Component, OnInit } from '@angular/core';

import {
    Application,
    ApplicationSettings,
    Utils
} from '@nativescript/core';

import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { PAYS_DU_MONDE, PaysCuisine } from '../home/pays';
import { PHOTOS_PAYS } from '../home/photos';

interface DetailRecette {
    duree: string;
    portions: string;
    ingredients: string[];
    etapes: string[];
}

interface Recette extends PaysCuisine, DetailRecette {}

@Component({
    selector: 'Featured',
    standalone: false,
    templateUrl: './featured.component.html',
    styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

    recherche = '';
    selection: Recette | null = null;
    favoris: string[] = [];

    private readonly details: Record<string, DetailRecette> = {

        DZ: {
            duree: '90 min',
            portions: '4 personnes',
            ingredients: [
                '500 g de semoule à couscous',
                '500 g de viande au choix',
                '2 carottes',
                '2 courgettes',
                '2 navets',
                '200 g de pois chiches cuits',
                '2 tomates',
                '1 oignon',
                'Huile, sel, poivre et épices'
            ],
            etapes: [
                'Faire revenir la viande avec les oignons, les tomates et les épices.',
                'Ajouter de l’eau et laisser cuire la viande.',
                'Ajouter les carottes, les navets et les pois chiches.',
                'Ajouter les courgettes vers la fin de la cuisson.',
                'Cuire la semoule à la vapeur puis l’égrainer.',
                'Servir le couscous avec les légumes et le bouillon.'
            ]
        },

        MA: {
            duree: '75 min',
            portions: '4 personnes',
            ingredients: [
                '4 morceaux de poulet',
                '2 oignons',
                '2 gousses d’ail',
                '1 citron confit',
                '100 g d’olives',
                'Huile d’olive',
                'Gingembre, curcuma et poivre'
            ],
            etapes: [
                'Faire revenir les oignons et l’ail.',
                'Ajouter le poulet et les épices.',
                'Verser un peu d’eau et couvrir.',
                'Laisser mijoter à feu doux.',
                'Ajouter les olives et le citron confit.',
                'Terminer la cuisson et servir.'
            ]
        },

        FR: {
            duree: '55 min',
            portions: '4 personnes',
            ingredients: [
                '1 aubergine',
                '2 courgettes',
                '2 poivrons',
                '4 tomates',
                '1 oignon',
                '2 gousses d’ail',
                'Huile d’olive',
                'Thym, sel et poivre'
            ],
            etapes: [
                'Laver et couper tous les légumes.',
                'Faire revenir l’oignon et l’ail.',
                'Ajouter les poivrons et l’aubergine.',
                'Ajouter les courgettes et les tomates.',
                'Assaisonner avec le thym, le sel et le poivre.',
                'Laisser mijoter environ 30 à 40 minutes.'
            ]
        },

        IT: {
            duree: '90 min',
            portions: '2 personnes',
            ingredients: [
                '250 g de farine',
                '150 ml d’eau tiède',
                '5 g de levure sèche',
                'Huile d’olive',
                'Sauce tomate',
                '150 g de mozzarella',
                'Basilic',
                'Sel'
            ],
            etapes: [
                'Préparer la pâte avec la farine, l’eau et la levure.',
                'Pétrir puis laisser lever.',
                'Étaler la pâte.',
                'Ajouter la sauce tomate et la mozzarella.',
                'Cuire au four bien préchauffé.',
                'Ajouter le basilic avant de servir.'
            ]
        },

        JP: {
            duree: '50 min',
            portions: '3 personnes',
            ingredients: [
                '300 g de riz à sushi',
                '3 feuilles de nori',
                '1 concombre',
                '1 avocat',
                'Vinaigre de riz',
                'Sucre et sel',
                'Sauce soja'
            ],
            etapes: [
                'Laver puis cuire le riz.',
                'Assaisonner avec le vinaigre, le sucre et le sel.',
                'Laisser tiédir le riz.',
                'Étaler le riz sur une feuille de nori.',
                'Ajouter le concombre et l’avocat.',
                'Rouler, couper et servir.'
            ]
        },

        CA: {
            duree: '40 min',
            portions: '3 personnes',
            ingredients: [
                '800 g de pommes de terre',
                '200 g de fromage en grains',
                '300 ml de sauce brune',
                'Huile pour les frites',
                'Sel'
            ],
            etapes: [
                'Couper les pommes de terre en frites.',
                'Faire cuire les frites jusqu’à ce qu’elles soient dorées.',
                'Chauffer la sauce brune.',
                'Mettre les frites dans une assiette.',
                'Ajouter le fromage en grains.',
                'Verser la sauce chaude et servir.'
            ]
        },

        MX: {
            duree: '45 min',
            portions: '4 personnes',
            ingredients: [
                '8 tortillas de maïs',
                '400 g de viande ou de haricots',
                '1 oignon',
                '2 tomates',
                'Coriandre fraîche',
                '1 citron vert',
                'Huile, sel et épices'
            ],
            etapes: [
                'Préparer la garniture.',
                'Cuire la viande ou les haricots avec les épices.',
                'Couper les tomates, l’oignon et la coriandre.',
                'Réchauffer les tortillas.',
                'Remplir les tortillas avec la garniture.',
                'Servir avec le citron vert.'
            ]
        }
    };

    readonly recettes: Recette[] = PAYS_DU_MONDE
        .filter(pays => !!this.details[pays.code])
        .map(pays => ({
            ...pays,
            ...this.details[pays.code]
        }));

    ngOnInit(): void {
        this.chargerFavoris();
    }

    photoPays(code: string): string {
        return PHOTOS_PAYS[code] || '';
    }

    private chargerFavoris(): void {
        try {
            const valeurs = JSON.parse(
                ApplicationSettings.getString(
                    'cuisine_favoris_codes',
                    '[]'
                )
            );

            this.favoris = Array.isArray(valeurs)
                ? valeurs.filter(
                    (code: unknown) => typeof code === 'string'
                )
                : [];

        } catch {
            this.favoris = [];
        }
    }

    get recettesFiltrees(): Recette[] {
        const recherche = this.recherche
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();

        return this.recettes.filter(recette => {
            const texte = (
                recette.nom + ' ' + recette.plat
            )
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase();

            return texte.includes(recherche);
        });
    }

    ouvrirRecette(recette: Recette): void {
        this.selection = recette;
    }

    retour(): void {
        this.selection = null;
    }

    estFavori(code: string): boolean {
        return this.favoris.includes(code);
    }

    changerFavori(code: string): void {
        if (this.estFavori(code)) {
            this.favoris = this.favoris.filter(
                valeur => valeur !== code
            );
        } else {
            this.favoris = [...this.favoris, code];
        }

        ApplicationSettings.setString(
            'cuisine_favoris_codes',
            JSON.stringify(this.favoris)
        );
    }

    ouvrirYoutube(recette: Recette): void {
        const recherche = recette.code === 'DZ'
            ? 'couscous algerien traditionnel recette pas a pas'
            : 'recette ' + recette.plat + ' ' + recette.nom;

        const url =
            'https://www.youtube.com/results?search_query=' +
            encodeURIComponent(recherche);

        Utils.openUrl(url);
    }

    onDrawerButtonTap(): void {
        const drawer =
            <RadSideDrawer>Application.getRootView();

        drawer.showDrawer();
    }
}
