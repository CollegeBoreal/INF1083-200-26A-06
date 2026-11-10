import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country } from './country';

// REST Countries v5 — clé API obligatoire.
// Crée un compte gratuit sur https://restcountries.com/sign-up
// puis remplace 'rc_live_demo' (clé de démo) par TA clé.
const RESTCOUNTRIES_KEY = 'rc_live_demo';

@Injectable({
    providedIn: 'root'
})
export class ApicallService {

    constructor(private httpClient: HttpClient) {}

    // L'utilisateur entre une capitale -> on retourne le(s) pays correspondant(s)
    searchCountryByName(name: string): Observable<Country[]> {
        const query = (name || '').trim();
        const url = 'https://api.restcountries.com/countries/v5?q='
            + encodeURIComponent(query)
            + '&response_fields=names.common,capitals';

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + RESTCOUNTRIES_KEY
        });

        return this.httpClient
            .get(url, { headers, observe: 'response', responseType: 'text' })
            .pipe(
                map(res => {
                    console.log('STATUS:', res.status);
                    console.log('BODY:', (res.body || '').substring(0, 400));

                    const json = res.body ? JSON.parse(res.body) : null;
                    const objects: any[] = json?.data?.objects ?? [];

                    const q = query.toLowerCase();

                    return objects
                        .map((c: any) => {
                            const caps: any[] = Array.isArray(c?.capitals) ? c.capitals : [];
                            const capNames = caps.map(cap => typeof cap === 'string' ? cap : (cap?.name ?? ''));
                            // garde la capitale qui correspond à la recherche, sinon la première
                            const capital = capNames.find(n => n.toLowerCase().includes(q)) ?? capNames[0] ?? '';
                            return { name: c?.names?.common ?? '', capital, match: capNames.some(n => n.toLowerCase().includes(q)) };
                        })
                        // ne garde que les pays dont la CAPITALE correspond
                        .filter(c => c.match)
                        .map((c, i) => ({
                            id: i,
                            name: c.name,
                            capital: c.capital
                        } as Country));
                }),
                catchError(error => {
                    console.log('HTTP STATUS:', error?.status);
                    console.log('HTTP MESSAGE:', error?.message);
                    return throwError(() => 'Capital not found!');
                })
            );
    }
}
