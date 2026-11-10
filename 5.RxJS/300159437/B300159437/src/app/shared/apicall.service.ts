import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country } from './country';

@Injectable({
    providedIn: 'root'
})
export class ApicallService {

    constructor(private httpClient: HttpClient) {}

    searchCountryByName(name: string): Observable<Country[]> {
        const headers = new HttpHeaders({
            'x-rapidapi-key': '7c9f34ba7emsh69fb5300e18593dp125782jsn4e324db79df0',
            'x-rapidapi-host': 'countries-cities.p.rapidapi.com'
        });

        return this.httpClient
            .get<any>('https://countries-cities.p.rapidapi.com/location/country/list',
                      { headers, params: { format: 'json' } })
            .pipe(
                map((data: any) => {
                    console.log('RAW:', JSON.stringify(data).substring(0, 400));

                    const src = data?.countries ?? data ?? {};
                    const list: { code: string, name: string }[] = Array.isArray(src)
                        ? src.map((c: any) => ({ code: c.code, name: c.name }))
                        : Object.keys(src).map(code => ({ code, name: src[code] }));

                    const q = (name || '').trim().toLowerCase();
                    return list
                        .filter(c => String(c.name).toLowerCase().includes(q))
                        .map((c, i) => ({
                            id: i,
                            name: c.name,
                            capital: c.code
                        } as Country));
                }),
                catchError(error => {
                    console.log('HTTP STATUS:', error?.status);
                    console.log('HTTP MESSAGE:', error?.message);
                    return throwError(() => 'Country not found!');
                })
            );
    }
}
