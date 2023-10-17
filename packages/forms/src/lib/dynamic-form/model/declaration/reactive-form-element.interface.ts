import { AbstractObservableDataSource, IFormOutput } from '../';

export interface IReactiveFormElement<DT = unknown> extends IFormOutput {
  dataSource: AbstractObservableDataSource<DT>;
  accumulateArguments: boolean;
}
