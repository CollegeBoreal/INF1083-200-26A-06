import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country } from './country';

// RapidAPI — API "Countries Data" (https://rapidapi.com/TekBunny/api/countries-data)
// ⚠️ Ne pousse pas ta clé sur un dépôt GitHub public.
const RAPIDAPI_KEY = '7c9f34ba7emsh69fb5300e18593dp125782jsn4e324db79df0';
const RAPIDAPI_HOST = 'countries-data.p.rapidapi.com';

@Injectable({
    providedIn: 'root'
})
export class ApicallService {

    constructor(private httpClient: HttpClient) {}

    // L'utilisateur entre une capitale -> on retourne le(s) pays correspondant(s)
    searchCountryByName(name: string): Observable<Country[]> {
        const query = (name || '').trim();
        const url = 'https://' + RAPIDAPI_HOST + '/api/v1/capital/' + encodeURIComponent(query);

        const headers = new HttpHeaders({
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': RAPIDAPI_HOST
        });

        return this.httpClient
            .get<any>(url, { headers })
            .pipe(
                map((data: any) => {
                    console.log('BODY:', JSON.stringify(data).substring(0, 400));

                    // Réponse : [ { "Name": "France", "CapitalCity": "Paris", ... } ]
                    const list: any[] = Array.isArray(data) ? data : (data ? [data] : []);

                    return list.map((c: any, i: number) => ({
                        id: i,
                        name: c?.Name ?? '',
                        capital: c?.CapitalCity ?? ''
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
