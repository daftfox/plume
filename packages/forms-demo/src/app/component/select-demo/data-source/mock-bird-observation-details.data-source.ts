import { AbstractObservableDataSource } from '@plume/forms';
import { BehaviorSubject, filter, iif, map, Observable, of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { MockBirdService } from '../service/mock-bird.service';
import { MockObservation } from '../model/mock-observation';
import { PexelsService } from '../service/pexels.service';

export class MockBirdObservationDetailsDataSource extends AbstractObservableDataSource<MockObservation> {
  private itemSubject: BehaviorSubject<MockObservation> = new BehaviorSubject<MockObservation>(null);
  private unsubscribe: Subject<null> = new Subject<null>();
  constructor(
    private service: MockBirdService,
    private pexels: PexelsService
  ) {
    super();
  }

  connect(): Observable<MockObservation> {
    return this.itemSubject.asObservable().pipe(
      filter(Boolean),
      switchMap( observation => this.pexels.getImageUrl(observation.comName).pipe(
        take(1),
        map( url => ({ ...observation, url: url} as MockObservation))
      ))
    );
  }

  refresh( args: Map<string, string> ): void {
    if (args.get('region') && args.get('obsId')) {
      this.unsubscribe.next(null);
      this.refreshing.next(true);
      this.service.getByObservationId( args.get('region'), args.get('obsId') ).pipe(
        takeUntil(this.unsubscribe),
        tap( observation => this.itemSubject.next( observation ) ),
        tap(() => this.refreshing.next(false))
      ).subscribe();
    }
  }
}
