import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.httpClient
      .get<Record<string, string>>(
        'https://flagcdn.com/fr/codes.json'
      )
      .pipe(
        map(data =>
          Object.keys(data)
            .map(code => ({
              code: code,
              name: data[code],
              flag: 'https://flagcdn.com/w640/' + code + '.png'
            }))
            .sort((a, b) => a.name.localeCompare(b.name, 'fr'))
        )
      );
  }
}