
import { HttpClient } from '@angular/common/http';
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

    const url =
      'https://restcountries.com/v3.1/name/' +
      encodeURIComponent(name.trim()) +
      '?fullText=true&fields=name,capital';

    return this.httpClient.get<any[]>(url).pipe(
      map(data => data.map((c, i) => ({
        id: i,
        name: c.name.common,
        capital: c.capital?.join(', ') || 'Not available'
      } as Country))),

      catchError(() =>
        throwError(() => new Error('Country not found'))
      )
    );
  }
}
