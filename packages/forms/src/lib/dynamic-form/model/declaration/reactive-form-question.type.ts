import { IReactiveFormElement } from './reactive-form-element.interface';
import { DynamicFormElementValueType } from '../dynamic-form-values.interface';
import { IFormQuestion } from './form-question.interface';

export type IReactiveFormQuestion<
  DT = unknown,
  T = DynamicFormElementValueType,
> = IFormQuestion<T> & IReactiveFormElement<DT>;
