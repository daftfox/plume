import { BehaviorSubject, iif, scan, Subject, switchMap } from 'rxjs';
import { AbstractObservableDataSource } from '../../model/abstract-observable-data-source';
import { takeUntil, tap } from 'rxjs/operators';

export const initialiseReactiveFormElement = (
  accumulateArguments: boolean,
  clear: BehaviorSubject<null>,
  unsubscribe: Subject<null>,
  dataSourceArguments: Subject<Map<string, unknown>>,
  dataSource: AbstractObservableDataSource<unknown>,
) => {
  iif(
    () => accumulateArguments,
    // Accumulate arguments provided until cleared
    clear.pipe(
      takeUntil(unsubscribe),
      switchMap(() =>
        dataSourceArguments.pipe(
          scan((accumulator, args: Map<string, unknown>) => {
            args.forEach((value, key) => accumulator.set(key, value));
            return accumulator;
          }, new Map<string, unknown>()),
          tap((args) => dataSource.refresh(args)),
        ),
      ),
    ),
    // Refresh with new arguments
    dataSourceArguments.pipe(tap((args) => dataSource.refresh(args))),
  ).subscribe();
};
