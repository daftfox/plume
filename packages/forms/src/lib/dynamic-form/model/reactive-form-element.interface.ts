import { AbstractObservableDataSource } from './abstract-observable-data-source';
import { IFormOutput } from './form-output.interface';

export interface IReactiveFormElement<DT = unknown> extends IFormOutput {
  dataSource: AbstractObservableDataSource<DT>;
  accumulateArguments: boolean;
}
