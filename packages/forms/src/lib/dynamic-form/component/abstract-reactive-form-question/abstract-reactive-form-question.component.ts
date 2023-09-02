import { Directive, Input, OnInit } from '@angular/core';
import { BehaviorSubject, iif, scan, Subject, switchMap } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AbstractObservableDataSource, DynamicFormElementValueType } from '../../model';
import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';

@Directive()
export abstract class AbstractReactiveFormQuestionComponent<DT, VT = DynamicFormElementValueType> extends AbstractFormQuestionComponent<VT | VT[]> implements OnInit {
  /**
   * Observable data source that is used to provide data to display
   */
  @Input() dataSource: AbstractObservableDataSource<DT>;

  /**
   * Will accumulate arguments provided through the refresh method if set to true. For arguments with identical keys,
   * the latest value will be used.
   */
  @Input() accumulateArguments = false;

  private arguments = new Subject<Map<string, unknown> | undefined>();
  private clear = new BehaviorSubject<null>(null);

  override ngOnInit() {
    super.ngOnInit();

    iif(
      () => this.accumulateArguments,
      // Accumulate arguments provided until cleared
      this.clear.pipe(
        takeUntil( this.unsubscribe ),
        switchMap(() => this.arguments.pipe(
          scan(( accumulator, args: Map<string, unknown> ) => {
              args.forEach((value, key) => accumulator.set(key, value));
              return accumulator
            }, new Map<string, unknown>()
          ),
          tap( args => this.dataSource.refresh( args ) )
        ))
      ),
      // Refresh with new arguments
      this.arguments.pipe(
        tap( args => this.dataSource.refresh( args ) )
      )
    ).subscribe();

  }

  /**
   * Instruct the component to refresh data through its data source, if present, and provide it with arguments required
   * to perform the refresh.
   *
   * @param {Map<string, any>} args
   */
  refresh( args?: Map<string, unknown> ) {
    this.arguments.next( args );
  }

  /**
   * Instruct the component to clear its accumulated arguments, provided it was accumulating them in the first place..
   */
  clearArgs() {
    if ( !this.accumulateArguments ) return;
    this.clear.next(null);
  }
}
