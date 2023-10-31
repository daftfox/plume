import { IReactiveFormElement } from './reactive-form-element.interface';
import { IReactiveFormQuestion } from './reactive-form-question.type';
import { IFormOutput } from './form-output.interface';
import { IFormAction } from './form-action.interface';
import { IFormGroup } from './form-group.interface';
import { IFormQuestion } from './form-question.interface';

export type DynamicFormElement =
  | IFormQuestion
  | IReactiveFormQuestion
  | IReactiveFormElement
  | IFormGroup
  | IFormOutput
  | IFormAction;
