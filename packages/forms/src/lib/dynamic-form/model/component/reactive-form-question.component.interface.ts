import { AbstractObservableDataSource } from '../abstract-observable-data-source';
import { IFormQuestionComponent } from './form-question.component.interface';

export interface IReactiveFormQuestionComponent extends IFormQuestionComponent {
  dataSource: AbstractObservableDataSource<unknown>;
  accumulateArguments: boolean;
}
