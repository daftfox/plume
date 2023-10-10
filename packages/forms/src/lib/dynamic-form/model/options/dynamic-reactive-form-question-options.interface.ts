import { DynamicFormQuestionOptions } from './dynamic-form-question-options.interface';
import { DynamicFormElementValueType } from '../generic-form-values.interface';
import { AbstractObservableDataSource } from '../abstract-observable-data-source';

export interface DynamicReactiveFormQuestionOptions<
  DT,
  VT = DynamicFormElementValueType,
> extends DynamicFormQuestionOptions<VT> {
  dataSource?: AbstractObservableDataSource<DT>;
  accumulateArguments?: boolean;
}
