import { Directive, Input } from '@angular/core';
import { BehaviorSubject, iif, scan, Subject, switchMap } from 'rxjs';
import { AbstractObservableDataSource } from '../../model';
import { OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';

export const initialiseReactiveFormElement = (
  accumulateArguments: boolean,
  clear: BehaviorSubject<null>,
  unsubscribe: Subject<null>,
  dataSourceArguments: Subject<Map<string, unknown>>,
  dataSource: AbstractObservableDataSource<unknown>
) => {
  iif(
    () => accumulateArguments,
    // Accumulate arguments provided until cleared
    clear.pipe(
      takeUntil( unsubscribe ),
      switchMap(() => dataSourceArguments.pipe(
        scan(( accumulator, args: Map<string, unknown> ) => {
            args.forEach((value, key) => accumulator.set(key, value));
            return accumulator
          }, new Map<string, unknown>()
        ),
        tap( args => dataSource.refresh( args ) )
      ))
    ),
    // Refresh with new arguments
    dataSourceArguments.pipe(
      tap( args => dataSource.refresh( args ) )
    )
  ).subscribe();
}

@Directive()
export abstract class AbstractReactiveFormElementComponent<DT> implements OnInit {
  @Input() key: string;

  /**
   * Observable data source that is used to provide data to display
   */
  @Input() dataSource: AbstractObservableDataSource<DT>;

  /**
   * Will accumulate arguments provided through the refresh method if set to true. For arguments with identical keys,
   * the latest value will be used.
   */
  @Input() accumulateArguments = false;

  private dataSourceArguments = new Subject<Map<string, unknown> | undefined>();
  private clear = new BehaviorSubject<null>(null);
  protected unsubscribe = new Subject<null>();

  ngOnInit() {
    initialiseReactiveFormElement(
      this.accumulateArguments,
      this.clear,
      this.unsubscribe,
      this.dataSourceArguments,
      this.dataSource
    );
  }

  /**
   * Instruct the component to refresh data through its data source, if present, and provide it with arguments required
   * to perform the refresh.
   *
   * @param {Map<string, any>} args
   */
  refresh( args?: Map<string, unknown> ) {
    this.dataSourceArguments.next( args );
  }

  /**
   * Instruct the component to clear its accumulated arguments, provided it was accumulating them in the first place.
   */
  clearArgs() {
    if ( !this.accumulateArguments ) return;
    this.clear.next(null);
  }
}
