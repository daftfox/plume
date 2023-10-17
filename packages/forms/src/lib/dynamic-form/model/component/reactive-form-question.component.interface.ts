import { AbstractObservableDataSource, IFormQuestionComponent } from '../';

export interface IReactiveFormQuestionComponent extends IFormQuestionComponent {
  dataSource: AbstractObservableDataSource<unknown>;
  accumulateArguments: boolean;
}
