import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';
import { timeout } from 'rxjs/operators';

interface BookSearchResponse {
  docs: Book[];
}

@Injectable({
  providedIn: 'root',
})
export class BookSearchService {
  private readonly url = 'https://openlibrary.org/search.json';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<BookSearchResponse> {
    const params = new HttpParams()
      .set('q', query)
      .set('fields', 'key,title,author_name,first_publish_year')
      .set('limit', '20');

    return this.http
  .get<BookSearchResponse>(this.url, { params })
  .pipe(timeout(15000));
  }
}