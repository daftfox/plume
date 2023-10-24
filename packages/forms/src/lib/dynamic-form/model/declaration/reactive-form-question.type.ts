import {
  DynamicFormElementValueType,
  IFormQuestion,
  IReactiveFormElement,
} from '../';

export type IReactiveFormQuestion<
  DT = unknown,
  T = DynamicFormElementValueType,
> = IFormQuestion<T> & IReactiveFormElement<DT>;
