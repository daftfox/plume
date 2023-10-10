import { DynamicReactiveFormQuestionOptions } from './options/dynamic-reactive-form-question-options.interface';
import { DynamicFormElementValueType } from './generic-form-values.interface';
import { AbstractFormQuestion } from './abstract-form-question';
import { AbstractObservableDataSource } from './abstract-observable-data-source';

export abstract class AbstractReactiveFormQuestion<
  DT,
  VT = DynamicFormElementValueType,
> extends AbstractFormQuestion<VT> {
  dataSource: AbstractObservableDataSource<DT>;
  accumulateArguments: boolean;
  protected constructor(options: DynamicReactiveFormQuestionOptions<DT, VT>) {
    super(options);

    this.dataSource = options.dataSource;
    this.accumulateArguments = options.accumulateArguments || false;
  }
}
