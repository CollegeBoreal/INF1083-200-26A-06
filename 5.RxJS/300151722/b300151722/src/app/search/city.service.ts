
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface City {
    id: number;
    name: string;
    country: string;
    region: string;
    latitude: number;
    longitude: number;
}

@Injectable({
    providedIn: 'root'
})
export class CityService {

    constructor(private http: HttpClient) {}

    searchCities(name: string): Observable<City[]> {

        const url =
            'https://geocoding-api.open-meteo.com/v1/search' +
            '?name=' + encodeURIComponent(name.trim()) +
            '&count=20&language=fr&format=json';

        return this.http.get<any>(url).pipe(
            map(response => {

                const results = response.results || [];

                return results.map((city: any) => ({
                    id: city.id,
                    name: city.name,
                    country: city.country || '',
                    region: city.admin1 || '',
                    latitude: city.latitude,
                    longitude: city.longitude
                } as City));

            })
        );
    }
}
