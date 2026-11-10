
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { Country } from './country';

@Injectable({
    providedIn: 'root'
})
export class ApicallService {

    constructor(private httpClient: HttpClient) {}

    searchCountryByName(name: string): Observable<Country[]> {

        const country = encodeURIComponent(name.trim());

        const url =
            'https://restcountries.com/v3.1/name/' +
            country +
            '?fields=name,capital';

        return this.httpClient.get<any[]>(url).pipe(

            timeout(10000),

            map((data: any[]) =>
                data.map((c, i) => ({
                    id: i,
                    name: c.name.common,
                    capital: c.capital ? c.capital[0] : ''
                } as Country))
            ),

            catchError(error => {
                console.log('HTTP STATUS:', error.status);
                console.log('HTTP MESSAGE:', error.message);

                return throwError(() => error);
            })
        );
    }
}
