import { Injectable } from '@angular/core';
import { createClient, ErrorResponse, Photo } from 'pexels';
import { catchError, from, map, Observable, of } from 'rxjs';

export interface QueryResult {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
}

@Injectable({
  providedIn: 'root'
})
export class PexelsService {
  private client;

  constructor() {
    this.client = createClient('oU1dlLKoFVdAHEDCAxSJlqvRWfOHGafzAZLSJjlVK7TczdqQK8dU0aSx');
  }

  getImageUrl( query: string ): Observable<string | null> {
    return from(this.client.photos.search({
      query,
      per_page: 1
    })).pipe(
      catchError( err => {
        return of({error: 'Something went wrong :('})
      }),
      map( ( result: QueryResult | ErrorResponse ) => {
        if ( !('error' in result) ) {
          return (result as QueryResult).photos[0].src.portrait;
        }
        return null;
      })
    );
  }
}
