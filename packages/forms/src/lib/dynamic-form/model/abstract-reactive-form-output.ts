import { IReactiveFormElement } from './reactive-form-element.interface';
import { AbstractObservableDataSource } from './abstract-observable-data-source';
import { Type } from '@angular/core';
import { AbstractReactiveFormElementComponent } from '../component/abstract-reactive-form-element/abstract-reactive-form-element.component';
import { DynamicReactiveFormElementOptions } from './options/dynamic-reactive-form-element-options.interface';

export abstract class AbstractReactiveFormOutput<DT>
  implements IReactiveFormElement<DT>
{
  abstract component: Type<AbstractReactiveFormElementComponent<DT>>;
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
