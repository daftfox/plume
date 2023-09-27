import { AbstractObservableDataSource } from '../abstract-observable-data-source';
import { DynamicFormElementOptions } from './dynamic-form-element-options.interface';

export interface DynamicReactiveFormElementOptions<DT> extends DynamicFormElementOptions {
  dataSource?: AbstractObservableDataSource<DT>;
  accumulateArguments?: boolean;
}
