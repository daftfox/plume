import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { sortItems } from '@plume/utils';
import { MockObservation } from '../model/mock-observation';
import { PexelsService } from './pexels.service';

@Injectable()
export class MockBirdService {
  constructor( private http: HttpClient, private pexels: PexelsService ) {}

  getByRegion( region: string ): Observable<MockObservation[]> {
    const headers = new HttpHeaders({'x-ebirdapitoken': 'rlh3p7u0s6tf'});

    // not ideal, but this is the only endpoint in the eBird API that returns a truly unique identifier (obsId) for each
    // observation
    return this.http.get<MockObservation[]>(`https://api.ebird.org/v2/data/obs/${region}/recent/notable?detail=full`, { headers }).pipe(
      map( response => response.reduce( (observations: MockObservation[], item: MockObservation) => {
        if ( !observations.find( ({sciName}) => sciName === item.sciName ) ) {
          observations.push(item);
        }
        return observations;
      }, [])),
      map(( response: MockObservation[] ) => {
        return sortItems(response, 'comName', 'asc');
      })
    );
  }

  getByObservationId( region: string, observationId: string ): Observable<MockObservation> {
    return this.getByRegion( region ).pipe(
      map( ( response: MockObservation[] ) => response.find(({obsId}) => obsId === observationId )),
      switchMap( observation =>
        observation !== undefined ?
          this.pexels.getImageUrl(observation.comName).pipe(
            take(1),
            map( url => ({ ...observation, url: url} as MockObservation))
          ) : of(null)
      )
    );
  }
}
