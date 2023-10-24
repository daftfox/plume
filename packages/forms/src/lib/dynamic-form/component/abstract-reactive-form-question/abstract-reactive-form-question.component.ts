import { Directive, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { initialiseReactiveRefresh } from '../abstract-reactive-form-element/initialise-reactive-refresh';
import { AbstractObservableDataSource } from '../../model/abstract-observable-data-source';
import { DynamicFormElementValueType } from '../../model/dynamic-form-values.interface';
import { IReactiveFormQuestionComponent } from '../../model/component/reactive-form-question.component.interface';

@Directive()
export abstract class AbstractReactiveFormQuestionComponent<
    DT,
    VT extends DynamicFormElementValueType = DynamicFormElementValueType,
  >
  extends AbstractFormQuestionComponent<VT>
  implements OnInit, IReactiveFormQuestionComponent
{
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

  override ngOnInit() {
    super.ngOnInit();
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
   * Instruct the component to clear its accumulated arguments, provided it was accumulating them in the first place..
   */
  clearArgs() {
    if (!this.accumulateArguments) return;
    this.clear.next(null);
  }
}
