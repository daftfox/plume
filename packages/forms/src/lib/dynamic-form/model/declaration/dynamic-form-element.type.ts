import {
  IFormAction,
  IFormGroup,
  IFormOutput,
  IFormQuestion,
  IReactiveFormElement,
  IReactiveFormQuestion,
} from '../';

export type DynamicFormElement =
  | IFormQuestion
  | IReactiveFormQuestion
  | IReactiveFormElement
  | IFormGroup
  | IFormOutput
  | IFormAction;
