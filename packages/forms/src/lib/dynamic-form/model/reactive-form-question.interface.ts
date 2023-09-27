import { DynamicFormElementValueType } from './generic-form-values.interface';
import { IFormQuestion } from './form-question.interface';
import { IReactiveFormElement } from './reactive-form-element.interface';

export type IReactiveFormQuestion<DT = unknown, T = DynamicFormElementValueType> = IFormQuestion<T> & IReactiveFormElement<DT>;
