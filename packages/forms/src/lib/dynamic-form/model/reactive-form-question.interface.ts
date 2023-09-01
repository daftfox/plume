import { DynamicFormElementValueType } from './generic-form-values.interface';
import { AbstractObservableDataSource, IFormQuestion } from '@slodder/forms';

export interface IReactiveFormQuestion<DT = unknown, T = DynamicFormElementValueType> extends IFormQuestion<T> {
  dataSource: AbstractObservableDataSource<DT>;
}
