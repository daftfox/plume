import { AbstractObservableDataSource } from '@plume/forms';
import {
  Observable,
  ReplaySubject,
  Subject,
  takeUntil,
  tap
} from 'rxjs';
import { MockBirdService } from '../service/mock-bird.service';
import { MockObservation } from '../model/mock-observation';

export class MockBirdObservationDetailsDataSource extends AbstractObservableDataSource<MockObservation> {
  private itemSubject: ReplaySubject<MockObservation> = new ReplaySubject<MockObservation>(1);
  private unsubscribe: Subject<null> = new Subject<null>();
  constructor(
    private service: MockBirdService,
  ) {
    super();
  }

  connect(): Observable<MockObservation> {
    return this.itemSubject.asObservable();
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
