import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { sortItems } from '@slodder/utils';
import { MockObservation } from '../model/mock-observation';

@Injectable()
export class MockBirdService {
  constructor( private http: HttpClient ) {}
  getByRegion( region: string ): Observable<MockObservation[]> {
    const headers = new HttpHeaders({'x-ebirdapitoken': 'rlh3p7u0s6tf'});
    return this.http.get<MockObservation[]>(`https://api.ebird.org/v2/data/obs/${region}/recent`, { headers }).pipe(
      map(( response: MockObservation[] ) => {
        return sortItems(response, 'comName', 'asc');
      })
    );
  }
}
