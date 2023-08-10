import {
  AbstractFormQuestion,
  AbstractObservableDataSource,
  DynamicFormElementValueType,
} from '@slodder/forms';
import { DynamicReactiveFormQuestionOptions } from './options/dynamic-reactive-form-question-options.interface';

export abstract class AbstractReactiveFormQuestion<DT, VT = DynamicFormElementValueType> extends AbstractFormQuestion<VT> {
  dataSource: AbstractObservableDataSource<DT>;
  accumulateArguments: boolean;
  protected constructor( options: DynamicReactiveFormQuestionOptions<DT, VT>) {
    super( options );

    this.dataSource = options.dataSource;
    this.accumulateArguments = options.accumulateArguments || false;
  }
}
