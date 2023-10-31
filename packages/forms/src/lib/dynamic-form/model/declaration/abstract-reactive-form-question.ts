import { AbstractFormQuestion } from './abstract-form-question';
import { AbstractObservableDataSource } from '../abstract-observable-data-source';
import { DynamicFormElementValueType } from '../dynamic-form-values.interface';
import { Type } from '@angular/core';
import { IReactiveFormQuestionComponent } from '../component/reactive-form-question.component.interface';
import { DynamicReactiveFormQuestionOptions } from '../options/dynamic-reactive-form-question-options.interface';

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
