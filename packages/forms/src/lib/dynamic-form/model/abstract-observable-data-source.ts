import { BehaviorSubject, Observable } from 'rxjs';

export abstract class AbstractObservableDataSource<T> {
  refreshing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  abstract connect(): Observable<T[]>;
  abstract refresh( args?: Map<string, any> ): void;
}
