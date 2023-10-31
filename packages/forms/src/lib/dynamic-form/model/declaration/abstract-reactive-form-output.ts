import { Type } from '@angular/core';
import { AbstractObservableDataSource } from '../abstract-observable-data-source';
import { IReactiveFormElement } from './reactive-form-element.interface';
import { IReactiveFormElementComponent } from '../component/reactive-form-element.component.interface';
import { DynamicReactiveFormElementOptions } from '../options/dynamic-reactive-form-element-options.interface';

export abstract class AbstractReactiveFormOutput<DT>
  implements IReactiveFormElement<DT>
{
  abstract component: Type<IReactiveFormElementComponent>;
  dataSource: AbstractObservableDataSource<DT>;
  key: string;
  accumulateArguments: boolean;
  inputKeys = ['key', 'dataSource', 'accumulateArguments'];

  constructor(options: DynamicReactiveFormElementOptions<DT>) {
    this.key = options.key;
    this.dataSource = options.dataSource;
    this.accumulateArguments =
      options.accumulateArguments !== null
        ? options.accumulateArguments
        : false;
  }
}
