import { Component, OnInit } from '@angular/core';
import { Application, ApplicationSettings, Utils } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { PAYS_DU_MONDE, PaysCuisine } from './pays';
import { PHOTOS_PAYS, CREDITS_PHOTOS } from './photos';

interface RecetteDetail {
    duree: string;
    portions: string;
    ingredients: string[];
    etapes: string[];
}

@Component({
    selector: 'Home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    recherche = '';
    favorisSeulement = false;
    afficheLimite = 20;
    paysSelectionne: PaysCuisine | null = null;
    favoris: string[] = [];

    readonly pays: PaysCuisine[] = PAYS_DU_MONDE;

    readonly recettesDetaillees: Record<string, RecetteDetail> = {
        DZ: {
            duree: '90 min', portions: '4 personnes',
            ingredients: ['500 g de semoule à couscous', '500 g de viande au choix', '2 carottes', '2 courgettes', '2 navets', '200 g de pois chiches cuits', '2 tomates', '1 oignon', 'Huile, sel, poivre et épices'],
            etapes: ['Faire revenir la viande avec l’oignon, les tomates et les épices.', 'Ajouter de l’eau et laisser cuire la viande.', 'Ajouter les carottes, les navets et les pois chiches.', 'Ajouter les courgettes vers la fin de la cuisson.', 'Cuire la semoule à la vapeur puis l’égrainer.', 'Servir le couscous avec les légumes et le bouillon.']
        },
        MA: {
            duree: '75 min', portions: '4 personnes',
            ingredients: ['4 morceaux de poulet', '2 oignons', '2 gousses d’ail', '1 citron confit', '100 g d’olives', 'Huile d’olive', 'Gingembre, curcuma et poivre', 'Persil et coriandre'],
            etapes: ['Faire revenir l’oignon et l’ail dans l’huile.', 'Ajouter le poulet et les épices.', 'Verser un peu d’eau et laisser mijoter à feu doux.', 'Ajouter le citron confit et les olives.', 'Continuer la cuisson jusqu’à ce que le poulet soit tendre.', 'Servir chaud.']
        },
        FR: {
            duree: '55 min', portions: '4 personnes',
            ingredients: ['1 aubergine', '2 courgettes', '2 poivrons', '4 tomates', '1 oignon', '2 gousses d’ail', '3 cuillères à soupe d’huile d’olive', 'Thym, sel et poivre'],
            etapes: ['Laver puis couper les légumes en morceaux.', 'Faire revenir l’oignon et l’ail dans l’huile.', 'Ajouter les poivrons et l’aubergine, cuire quelques minutes.', 'Ajouter les courgettes et les tomates.', 'Assaisonner de thym, sel et poivre.', 'Couvrir et laisser mijoter 30 à 40 minutes en remuant de temps en temps.']
        },
        IT: {
            duree: '90 min avec repos', portions: '2 personnes',
            ingredients: ['250 g de farine', '150 ml d’eau tiède', '5 g de levure sèche', '1 cuillère à soupe d’huile d’olive', 'Sauce tomate', '150 g de mozzarella', 'Basilic frais', 'Sel'],
            etapes: ['Mélanger farine, eau, levure, huile et sel.', 'Pétrir puis laisser lever jusqu’à ce que la pâte gonfle.', 'Étaler la pâte et répartir la sauce tomate.', 'Ajouter la mozzarella.', 'Cuire au four préchauffé à température élevée jusqu’à ce que la pâte soit dorée.', 'Ajouter le basilic et servir.']
        },
        JP: {
            duree: '50 min', portions: '3 personnes',
            ingredients: ['300 g de riz à sushi', '3 feuilles de nori', '1 concombre', '1 avocat', 'Vinaigre de riz', 'Sucre et sel', 'Sauce soja'],
            etapes: ['Laver le riz puis le cuire.', 'Assaisonner avec vinaigre de riz, sucre et sel.', 'Laisser tiédir.', 'Étaler le riz sur une feuille de nori.', 'Ajouter des bâtonnets de concombre et d’avocat.', 'Rouler fermement, couper et servir.']
        },
        CA: {
            duree: '40 min', portions: '3 personnes',
            ingredients: ['800 g de pommes de terre', '200 g de fromage en grains', '300 ml de sauce brune', 'Huile pour les frites', 'Sel'],
            etapes: ['Couper les pommes de terre en frites.', 'Cuire les frites jusqu’à ce qu’elles soient dorées.', 'Faire chauffer la sauce brune.', 'Mettre les frites dans une assiette.', 'Ajouter le fromage en grains.', 'Verser la sauce chaude et servir immédiatement.']
        },
        MX: {
            duree: '45 min', portions: '4 personnes',
            ingredients: ['8 petites tortillas de maïs', '400 g de viande cuite ou de haricots', '1 oignon', '2 tomates', 'Coriandre fraîche', '1 citron vert', 'Huile, sel et épices'],
            etapes: ['Préparer et assaisonner la garniture.', 'Cuire la viande ou réchauffer les haricots.', 'Couper les tomates, l’oignon et la coriandre.', 'Réchauffer les tortillas.', 'Garnir les tortillas.', 'Servir avec du citron vert.']
        }
    };

    ngOnInit(): void {
        try {
            const sauvegarde = JSON.parse(ApplicationSettings.getString('cuisine_favoris_codes', '[]'));
            this.favoris = Array.isArray(sauvegarde)
                ? sauvegarde.filter((code: unknown) => typeof code === 'string')
                : [];
        } catch {
            this.favoris = [];
        }
    }

    private normaliser(texte: string): string {
        return texte.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase().trim();
    }

    get paysFiltres(): PaysCuisine[] {
        const q = this.normaliser(this.recherche);
        return this.pays.filter(p =>
            (!this.favorisSeulement || this.estFavori(p.code)) &&
            this.normaliser(p.nom + ' ' + p.plat).includes(q)
        );
    }

    get paysVisibles(): PaysCuisine[] {
        return this.paysFiltres.slice(0, this.afficheLimite);
    }

    get peutAfficherPlus(): boolean {
        return this.paysVisibles.length < this.paysFiltres.length;
    }

    afficherPlus(): void {
        this.afficheLimite += 20;
    }

    afficherTous(): void {
        this.favorisSeulement = false;
        this.afficheLimite = 20;
    }

    afficherFavoris(): void {
        this.favorisSeulement = true;
        this.afficheLimite = 20;
    }

    ouvrirPays(pays: PaysCuisine): void {
        this.paysSelectionne = pays;
    }

    revenir(): void {
        this.paysSelectionne = null;
    }

    get detailsSelectionnes(): RecetteDetail | null {
        if (!this.paysSelectionne) return null;
        return this.recettesDetaillees[this.paysSelectionne.code] || null;
    }

    estFavori(code: string): boolean {
        return this.favoris.includes(code);
    }

    changerFavori(code: string): void {
        this.favoris = this.estFavori(code)
            ? this.favoris.filter(c => c !== code)
            : [...this.favoris, code];
        ApplicationSettings.setString('cuisine_favoris_codes', JSON.stringify(this.favoris));
    }

    // Recherche des recettes sur YouTube, sans utiliser de lien vers
    // une video precise qui peut etre supprimee ou devenir indisponible.
    private rechercherYoutube(recherche: string): void {
        const url = 'https://www.youtube.com/results?search_query=' +
            encodeURIComponent(recherche);

        const ouvert = Utils.openUrl(url);
        if (!ouvert) {
            console.log('Impossible d ouvrir la recherche YouTube.');
        }
    }

    ouvrirYoutube(pays: PaysCuisine): void {
        // Utiliser des mots cles locaux plus precis pour certaines recettes.
        const recherches: Record<string, string> = {
            DZ: 'couscous algerien traditionnel recette pas a pas',
            MA: 'tajine poulet marocain recette facile',
            FR: 'ratatouille provencale recette traditionnelle',
            BE: 'moules frites belges recette',
            IT: 'pizza margherita recette italienne',
            JP: 'sushi japonais recette pas a pas',
            CA: 'poutine quebecoise recette maison',
            MX: 'tacos mexicains recette traditionnelle'
        };
        const texte = recherches[pays.code] ||
            'recette traditionnelle ' + pays.plat + ' ' + pays.nom;

        this.rechercherYoutube(texte);
    }

    ouvrirYoutubeAutre(pays: PaysCuisine): void {
        // Autre formulation si la recherche initiale donne peu de resultats.
        // Pour l Algerie, chercher en arabe.
        const autreRecherche = pays.code === 'DZ'
            ? 'طريقة تحضير الكسكس الجزائري التقليدي خطوة بخطوة'
            : pays.plat + ' ' + pays.nom + ' cooking recipe tutorial';

        this.rechercherYoutube(autreRecherche);
    }

    // Photos locales téléchargées automatiquement depuis Wikimedia Commons.
    photoPays(code: string): string {
        return PHOTOS_PAYS[code] || '';
    }

    ouvrirCreditPhoto(pays: PaysCuisine): void {
        const credit = CREDITS_PHOTOS[pays.code];
        if (credit && credit.source) {
            Utils.openUrl(credit.source);
        }
    }

    onDrawerButtonTap(): void {
        const drawer = <RadSideDrawer>Application.getRootView();
        drawer.showDrawer();
    }
}
