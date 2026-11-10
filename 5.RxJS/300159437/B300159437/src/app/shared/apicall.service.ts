import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country } from './country';

// Laisse vide pour utiliser restcountries.com (sans clé).
// Pour passer par RapidAPI : mets le host d'une API REST Countries de RapidAPI
// qui a un endpoint /capital/{nom}, ex. 'restcountries-v1.p.rapidapi.com'
const RAPIDAPI_HOST = '';
const RAPIDAPI_KEY = '7c9f34ba7emsh69fb5300e18593dp125782jsn4e324db79df0';

@Injectable({
    providedIn: 'root'
})
export class ApicallService {

    constructor(private httpClient: HttpClient) {}

    // L'utilisateur entre une capitale -> on retourne le(s) pays correspondant(s)
    searchCountryByName(name: string): Observable<Country[]> {
        const capital = encodeURIComponent((name || '').trim());

        let url: string;
        let headers = new HttpHeaders();

        if (RAPIDAPI_HOST) {
            url = 'https://' + RAPIDAPI_HOST + '/capital/' + capital;
            headers = headers
                .set('x-rapidapi-key', RAPIDAPI_KEY)
                .set('x-rapidapi-host', RAPIDAPI_HOST);
        } else {
            url = 'https://restcountries.com/v3.1/capital/' + capital + '?fields=name,capital';
        }

        return this.httpClient
            .get(url, { headers, observe: 'response', responseType: 'text' })
            .pipe(
                map(res => {
                    console.log('STATUS:', res.status);
                    console.log('BODY:', (res.body || '').substring(0, 300));

                    const data = res.body ? JSON.parse(res.body) : [];
                    if (!Array.isArray(data)) {
                        return [];
                    }

                    return data.map((c: any, i: number) => ({
                        id: i,
                        name: typeof c?.name === 'string' ? c.name : (c?.name?.common ?? ''),
                        capital: Array.isArray(c?.capital) ? c.capital[0] : (c?.capital ?? '')
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
