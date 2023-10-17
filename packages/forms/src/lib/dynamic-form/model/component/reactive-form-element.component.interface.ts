import { AbstractObservableDataSource } from '../';

export interface IReactiveFormElementComponent {
  key: string;
  dataSource: AbstractObservableDataSource<unknown>;
  accumulateArguments: boolean;
  refresh(args?: Map<string, unknown>): void;
  clearArgs(): void;
}
