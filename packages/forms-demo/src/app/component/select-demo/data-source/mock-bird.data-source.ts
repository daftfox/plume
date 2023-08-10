import { AbstractObservableDataSource, SelectOption } from '@slodder/forms';
import { BehaviorSubject, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { MockBirdService } from '../service/mock-bird.service';

export class MockBirdDataSource extends AbstractObservableDataSource<SelectOption<string>> {
  private itemSubject: BehaviorSubject<SelectOption<string>[]> = new BehaviorSubject<SelectOption<string>[]>([]);
  private unsubscribe: Subject<null> = new Subject<null>();
  constructor( private service: MockBirdService ) {
    super();
  }

  connect(): Observable<SelectOption<string>[]> {
    return this.itemSubject.asObservable();
  }

  refresh( args: Map<string, any> ): void {
    this.unsubscribe.next(null);
    this.refreshing.next(true);
    this.service.getByRegion( args.get('region') ).pipe(
      takeUntil(this.unsubscribe),
      map( mockUsers => mockUsers.map(({comName, speciesCode}) => ({
        label: comName,
        value: speciesCode,
      }))),
      tap( ( selectOptions: SelectOption<string>[] ) => this.itemSubject.next(selectOptions)),
      tap(() => this.refreshing.next(false))
    ).subscribe();
  }
}
