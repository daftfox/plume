import { Type } from '@angular/core';
import {
  AbstractObservableDataSource,
  IReactiveFormElement,
  DynamicReactiveFormElementOptions,
  IReactiveFormElementComponent,
} from '../';

export abstract class AbstractReactiveFormOutput<DT>
  implements IReactiveFormElement<DT>
{
  abstract component: Type<IReactiveFormElementComponent>;
  dataSource: AbstractObservableDataSource<DT>;
  key: string;
  accumulateArguments: boolean;

  constructor(options: DynamicReactiveFormElementOptions<DT>) {
    this.key = options.key;
    this.dataSource = options.dataSource;
    this.accumulateArguments =
      options.accumulateArguments !== null
        ? options.accumulateArguments
        : false;
  }
}
