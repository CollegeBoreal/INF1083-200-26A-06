
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { Country } from './country';

@Injectable({
    providedIn: 'root'
})
export class ApicallService {

    private apiUrl =
        'https://countries-cities.p.rapidapi.com/location/country/';

    private apiKey = '7c9f34ba7emsh69fb5300e18593dp125782jsn4e324db79df0';

    constructor(private httpClient: HttpClient) {}

    searchCountryByName(name: string): Observable<Country[]> {

        const codes: Record<string, string> = {
            canada: 'CA',
            france: 'FR',
            haiti: 'HT',
            haïti: 'HT',
            germany: 'DE',
            allemagne: 'DE',
            japan: 'JP',
            japon: 'JP',
            brazil: 'BR',
            bresil: 'BR',
            brésil: 'BR',
            usa: 'US',
            'united states': 'US',
            'états-unis': 'US',
            uk: 'GB',
            'united kingdom': 'GB',
            italy: 'IT',
            italie: 'IT',
            spain: 'ES',
            espagne: 'ES',
            mexico: 'MX',
            mexique: 'MX',
            india: 'IN',
            inde: 'IN',
            china: 'CN',
            chine: 'CN',
            australia: 'AU',
            australie: 'AU'
        };

        const search = name.trim().toLowerCase();
        const code = codes[search] || (
            /^[a-z]{2}$/i.test(search)
                ? search.toUpperCase()
                : ''
        );

        if (!code) {
            return throwError(
                () => new Error('Country not supported')
            );
        }

        const headers = new HttpHeaders({
            'X-RapidAPI-Key': this.apiKey,
            'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
        });

        return this.httpClient.get<any>(
            this.apiUrl + code,
            {
                headers,
                params: { format: 'json' }
            }
        ).pipe(
            timeout(10000),

            map((response: any): Country[] => {

                console.log(
                    'API RESPONSE:',
                    JSON.stringify(response)
                );

                const data = response.data ?? response;
                const item = data.country ?? data;

                const capitalValue = item.capital;

                const capital = Array.isArray(capitalValue)
                    ? capitalValue[0]
                    : capitalValue;

                if (!capital) {
                    throw new Error(
                        'Capital missing from API response'
                    );
                }

                return [{
                    id: 0,
                    name: item.name?.common
                        ?? item.name
                        ?? name,
                    capital: String(capital)
                } as Country];
            }),

            catchError(error => {
                console.log('API ERROR:', error);

                return throwError(
                    () => error
                );
            })
        );
    }
}
