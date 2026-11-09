
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

    private apiKey =
        '7c9f34ba7emsh69fb5300e18593dp125782jsn4e324db79df0';

    constructor(private httpClient: HttpClient) {}

    searchCountryByName(name: string): Observable<Country[]> {

        const countryCodes: Record<string, string> = {
            canada: 'CA',
            france: 'FR',
            haiti: 'HT',
            germany: 'DE',
            japan: 'JP',
            brazil: 'BR',
            'united states': 'US',
            usa: 'US',
            'united kingdom': 'GB',
            uk: 'GB',
            italy: 'IT',
            spain: 'ES',
            mexico: 'MX',
            india: 'IN',
            china: 'CN',
            australia: 'AU'
        };

        const countryName = name.trim().toLowerCase();
        const code = countryCodes[countryName];

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
                const data = response.data ?? response;

                const country: Country = {
                    id: 0,
                    name: data.name ?? name,
                    capital: data.capital ?? ''
                };

                return [country];
            }),

            catchError(error => {
                console.log('API ERROR:', error);

                return throwError(
                    () => new Error('Unable to retrieve country')
                );
            })
        );
    }
}
