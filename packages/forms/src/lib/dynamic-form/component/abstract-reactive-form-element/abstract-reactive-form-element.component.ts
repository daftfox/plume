import { Directive, Input } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { OnInit } from '@angular/core';
import {
  AbstractObservableDataSource,
  IReactiveFormElementComponent,
} from '../../model';
import { initialiseReactiveRefresh } from './initialise-reactive-refresh';

@Directive()
export abstract class AbstractReactiveFormElementComponent<DT>
  implements OnInit, IReactiveFormElementComponent
{
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
    initialiseReactiveRefresh(
      this.accumulateArguments,
      this.clear,
      this.unsubscribe,
      this.dataSourceArguments,
      this.dataSource,
    );
  }

  /**
   * Instruct the component to refresh data through its data source, if present, and provide it with arguments required
   * to perform the refresh.
   *
   * @param {Map<string, any>} args
   */
  refresh(args?: Map<string, unknown>) {
    this.dataSourceArguments.next(args);
  }

  /**
   * Instruct the component to clear its accumulated arguments, provided it was accumulating them in the first place.
   */
  clearArgs() {
    if (!this.accumulateArguments) return;
    this.clear.next(null);
  }
}
