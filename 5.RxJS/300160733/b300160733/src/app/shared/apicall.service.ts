import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, timeout } from 'rxjs';
import { Country } from './country';

interface CountryResponse {
  name: { common: string };
  capital?: string[];
}

@Injectable({ providedIn: 'root' })
export class ApicallService {
  constructor(private readonly httpClient: HttpClient) {}

  searchCountryByName(capital: string): Observable<Country[]> {
    const url = 'https://countries.nexperts.nl/capital/' + encodeURIComponent(capital);

    return this.httpClient.get<CountryResponse[]>(url).pipe(
      timeout(15000),
      map((countries) =>
        countries.map((country, id) => ({
          id,
          name: country.name.common,
          capital: country.capital?.[0] ?? '',
        })),
      ),
    );
  }
}
