import { DynamicFormQuestionOptions } from './dynamic-form-question-options.interface';
import { AbstractObservableDataSource, DynamicFormElementValueType } from '@slodder/forms';

export interface DynamicReactiveFormQuestionOptions<DT, VT = DynamicFormElementValueType> extends DynamicFormQuestionOptions<VT> {
  dataSource?: AbstractObservableDataSource<DT>;
  accumulateArguments?: boolean;
}
