
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, timeout } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country } from './country';

@Injectable({
    providedIn: 'root'
})
export class ApicallService {

    constructor(private httpClient: HttpClient) {}

    searchCountryByName(name: string): Observable<Country[]> {

        const url =
            'https://restcountries.com/v3.1/name/' +
            encodeURIComponent(name.trim()) +
            '?fullText=true&fields=name,capital';

        return this.httpClient.get<any[]>(url).pipe(

            timeout(10000),

            map((data: any[]) =>
                data.map((c, i) => ({
                    id: i,
                    name: c.name.common,
                    capital: c.capital?.[0] || 'No capital'
                } as Country))
            ),

            catchError(error => {
                console.error('API Error:', error);

                return throwError(() =>
                    new Error(
                        error.name === 'TimeoutError'
                            ? 'Connection timed out.'
                            : 'Country not found or network error.'
                    )
                );
            })
        );
    }
}
