import { IReactiveFormQuestionComponent } from '../component';
import { AbstractFormQuestion } from './abstract-form-question';
import { AbstractObservableDataSource } from '../abstract-observable-data-source';
import { DynamicReactiveFormQuestionOptions } from '../options';
import { DynamicFormElementValueType } from '../dynamic-form-values.interface';
import { Type } from '@angular/core';

export abstract class AbstractReactiveFormQuestion<
  DT,
  VT = DynamicFormElementValueType,
> extends AbstractFormQuestion<VT> {
  dataSource: AbstractObservableDataSource<DT>;
  accumulateArguments: boolean;
  abstract override component: Type<IReactiveFormQuestionComponent>;
  protected constructor(options: DynamicReactiveFormQuestionOptions<DT, VT>) {
    super(options);
    this.inputKeys.push('dataSource', 'accumulateArguments');

    this.dataSource = options.dataSource;
    this.accumulateArguments = options.accumulateArguments || false;
  }
}
