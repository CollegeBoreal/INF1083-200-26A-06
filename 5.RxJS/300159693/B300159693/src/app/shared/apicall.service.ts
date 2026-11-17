
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country } from './country';

@Injectable({
  providedIn: 'root',
})
export class ApicallService {

  constructor(private httpClient: HttpClient) {}

  searchCountryByName(name: string): Observable<Country[]> {

    const capital = name
      .trim()
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const url =
      'https://countries.nexperts.nl/capital/' +
      encodeURIComponent(capital);

    return this.httpClient.get<any[]>(url).pipe(

      map((data: any[]) =>
        data.map((c, i) => ({
          id: i + 1,
          name: c.name.common,
          capital: c.capital ? c.capital[0] : '',
        } as Country))
      ),

      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => new Error('Capital not found!'));
      })
    );
  }
}
