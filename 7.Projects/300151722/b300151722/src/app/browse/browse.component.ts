
import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import {
    Application,
    ApplicationSettings,
    Http
} from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

interface ContenuTV {
    nom: string;
    categorie: string;
    groupe: string;
}

@Component({
    selector: 'Browse',
    standalone: false,
    templateUrl: './browse.component.html'
})
export class BrowseComponent implements OnInit, OnDestroy {

    typePlaylist = 'M3U';
    nomPlaylist = '';
    urlM3U = '';

    serveur = '';
    utilisateur = '';
    motDePasse = '';

    message = '';
    chargement = false;

    contenus: ContenuTV[] = [];
    contenusAffiches: ContenuTV[] = [];
    filtre = 'Tout';

    private actif = true;
    private numeroRequete = 0;

    constructor(private zone: NgZone) {}

    ngOnInit(): void {
        this.actif = true;

        this.typePlaylist = ApplicationSettings.getString(
            'dzis_type',
            'M3U'
        );

        this.nomPlaylist = ApplicationSettings.getString(
            'dzis_nom',
            ''
        );

        const urlSauvegardee = ApplicationSettings.getString(
            'dzis_m3u',
            ''
        );

        if (this.contientIdentifiants(urlSauvegardee)) {
            ApplicationSettings.remove('dzis_m3u');
            this.urlM3U = '';
        } else {
            this.urlM3U = urlSauvegardee;
        }

        this.serveur = ApplicationSettings.getString(
            'dzis_serveur',
            ''
        );

        // Ne pas conserver des identifiants privés en clair.
        ApplicationSettings.remove('dzis_utilisateur');
    }

    ngOnDestroy(): void {
        this.actif = false;
        this.numeroRequete++;
    }

    private contientIdentifiants(url: string): boolean {
        return /[?&](username|password|token|key)=/i.test(url);
    }

    choisirType(type: string): void {
        this.numeroRequete++;
        this.chargement = false;

        this.typePlaylist = type;
        this.message = '';
        this.contenus = [];
        this.contenusAffiches = [];
    }

    enregistrerPlaylist(): void {
        if (!this.nomPlaylist.trim()) {
            this.message = 'Entrez un nom de playlist.';
            return;
        }

        if (this.typePlaylist === 'M3U') {
            if (!this.urlM3U.trim()) {
                this.message = 'Entrez un lien M3U.';
                return;
            }

            if (!/^https?:\/\/\S+$/i.test(this.urlM3U.trim())) {
                this.message = 'Entrez une URL M3U valide.';
                return;
            }

            if (this.contientIdentifiants(this.urlM3U)) {
                ApplicationSettings.remove('dzis_m3u');

                this.message =
                    'Nom enregistré. Le lien privé reste en mémoire pendant cette session.';
            } else {
                ApplicationSettings.setString(
                    'dzis_m3u',
                    this.urlM3U.trim()
                );

                this.message = '✅ Playlist enregistrée !';
            }
        } else {
            if (
                !this.serveur.trim() ||
                !this.utilisateur.trim() ||
                !this.motDePasse.trim()
            ) {
                this.message =
                    'Remplissez tous les champs Xtream Codes.';
                return;
            }

            ApplicationSettings.setString(
                'dzis_serveur',
                this.serveur.trim()
            );

            this.message =
                'Profil Xtream renseigné. Connexion à ajouter ensuite.';
        }

        ApplicationSettings.setString(
            'dzis_type',
            this.typePlaylist
        );

        ApplicationSettings.setString(
            'dzis_nom',
            this.nomPlaylist.trim()
        );
    }

    private async telechargerAvecDelai(
        url: string,
        delaiMs: number
    ): Promise<string> {

        let minuterie: ReturnType<typeof setTimeout> | undefined;

        try {
            const reponse = await Promise.race([
                Http.request({
                    url,
                    method: 'GET',
                    timeout: delaiMs,
                    headers: {
                        Accept: 'audio/x-mpegurl, application/x-mpegURL, text/plain, */*'
                    }
                }),

                new Promise<never>((_, reject) => {
                    minuterie = setTimeout(() => {
                        reject(new Error('TIMEOUT_20S'));
                    }, delaiMs);
                })
            ]);

            if (reponse.statusCode !== 200) {
                throw new Error('HTTP_' + reponse.statusCode);
            }

            if (!reponse.content) {
                throw new Error('REPONSE_VIDE');
            }

            return reponse.content.toString();

        } finally {
            if (minuterie !== undefined) {
                clearTimeout(minuterie);
            }
        }
    }

    async chargerCatalogue(): Promise<void> {

        if (this.chargement) {
            return;
        }

        if (this.typePlaylist !== 'M3U') {
            this.message =
                'Le chargement Xtream Codes sera ajouté ensuite.';
            return;
        }

        const url = this.urlM3U.trim();

        if (!/^https?:\/\/\S+$/i.test(url)) {
            this.message = 'Entrez un lien M3U valide.';
            return;
        }

        const requeteCourante = ++this.numeroRequete;

        this.chargement = true;
        this.message = 'Téléchargement du catalogue...';
        this.contenus = [];
        this.contenusAffiches = [];

        try {
            const texte = await this.telechargerAvecDelai(
                url,
                20000
            );

            if (!texte.trim().startsWith('#EXTM3U')) {
                throw new Error('FORMAT_M3U_INVALIDE');
            }

            const resultats = this.analyserM3U(texte);

            if (!this.actif ||
                requeteCourante !== this.numeroRequete) {
                return;
            }

            this.zone.run(() => {
                this.contenus = resultats;
                this.filtrer('Tout');

                this.message = resultats.length > 0
                    ? '✅ ' + resultats.length + ' contenus trouvés !'
                    : 'Aucun contenu trouvé dans cette playlist.';

                this.chargement = false;
            });

        } catch (erreur: any) {

            if (!this.actif ||
                requeteCourante !== this.numeroRequete) {
                return;
            }

            this.zone.run(() => {
                this.chargement = false;

                const detail = String(erreur?.message || '');

                if (detail.includes('TIMEOUT_20S') ||
                    /timed out|timeout/i.test(detail)) {
                    this.message =
                        '⏱️ Le serveur ne répond pas après 20 secondes.';

                } else if (detail.includes('HTTP_')) {
                    const code = detail.replace('HTTP_', '');

                    this.message =
                        'Erreur HTTP ' + code +
                        '. Le serveur a refusé la requête ou a rencontré un problème.';

                } else if (detail.includes('FORMAT_M3U_INVALIDE')) {
                    this.message =
                        'Le serveur ne renvoie pas un fichier M3U valide.';

                } else if (detail.includes('REPONSE_VIDE')) {
                    this.message =
                        'Le serveur a renvoyé une réponse vide.';

                } else {
                    this.message =
                        'Connexion impossible. Vérifiez le serveur, HTTPS et le réseau.';
                }
            });
        }
    }

    private analyserM3U(texte: string): ContenuTV[] {

        const lignes = texte.split(/\r?\n/);
        const resultats: ContenuTV[] = [];

        let nom = '';
        let groupe = '';
        let enAttente = false;

        for (const ligneBrute of lignes) {
            const ligne = ligneBrute.trim();

            if (ligne.startsWith('#EXTINF:')) {
                const position = ligne.lastIndexOf(',');

                nom = position >= 0
                    ? ligne.substring(position + 1).trim()
                    : 'Sans titre';

                const groupeTrouve = ligne.match(
                    /group-title="([^"]*)"/i
                );

                groupe = groupeTrouve
                    ? groupeTrouve[1]
                    : '';

                enAttente = true;

            } else if (
                enAttente &&
                ligne !== '' &&
                !ligne.startsWith('#')
            ) {
                const description =
                    (groupe + ' ' + nom).toLowerCase();

                let categorie = 'TV';

                if (/film|movie|vod|cinema/.test(description)) {
                    categorie = 'Films';

                } else if (
                    /serie|series|saison|season/.test(description)
                ) {
                    categorie = 'Séries';
                }

                resultats.push({
                    nom,
                    categorie,
                    groupe
                });

                enAttente = false;
            }
        }

        return resultats;
    }

    filtrer(type: string): void {

        this.filtre = type;

        const resultats = type === 'Tout'
            ? this.contenus
            : this.contenus.filter(
                contenu => contenu.categorie === type
            );

        this.contenusAffiches = resultats.slice(0, 60);
    }

    onDrawerButtonTap(): void {
        const drawer =
            <RadSideDrawer>Application.getRootView();

        drawer.showDrawer();
    }
}
