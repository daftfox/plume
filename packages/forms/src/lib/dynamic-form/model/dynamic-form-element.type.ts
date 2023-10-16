import { IFormQuestion } from './form-question.interface';
import { IReactiveFormQuestion } from './reactive-form-question.interface';
import { IFormGroup } from './form-group.interface';
import { IFormOutput } from './form-output.interface';
import { IFormAction } from './form-action.interface';

export type DynamicFormElement =
  | IFormQuestion
  | IReactiveFormQuestion
  | IFormGroup
  | IFormOutput
  | IFormAction;
