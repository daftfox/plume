import { BehaviorSubject, Observable } from 'rxjs';

export abstract class AbstractObservableDataSource<DT> {
  refreshing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  abstract connect(): Observable<DT[]>;
  abstract refresh( args?: Map<string, unknown> ): void;
}
