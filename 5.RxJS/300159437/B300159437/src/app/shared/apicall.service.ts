
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  private apiUrl =
    'https://api.restcountries.com/countries/v5';

  constructor(private httpClient: HttpClient) {}

  getCapital(country: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer rc_live_demo'
    });

    const url = `${this.apiUrl}/names.common/${encodeURIComponent(country)}`;

    return this.httpClient.get<any>(url, { headers }).pipe(
      timeout(10000),
      map(response => {
        const item = response.data?.objects?.[0];
        return item?.capitals?.[0] || 'Capital not found';
      })
    );
  }
}
