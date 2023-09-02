import { DynamicFormElementValueType } from './generic-form-values.interface';
import { IFormQuestion } from './form-question.interface';
import { AbstractObservableDataSource } from './abstract-observable-data-source';

export interface IReactiveFormQuestion<DT = unknown, T = DynamicFormElementValueType> extends IFormQuestion<T> {
  dataSource: AbstractObservableDataSource<DT>;
}
