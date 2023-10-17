import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { PlumeValidatorFn } from '../../validator';
import { DynamicFormElementValueType, LinkedElement } from '../';

export interface IFormQuestionComponent {
  key: string;
  label: string;
  placeholder: string;
  validators:
    | ValidatorFn
    | PlumeValidatorFn
    | (ValidatorFn | PlumeValidatorFn)[];
  asyncValidators: AsyncValidatorFn | AsyncValidatorFn[];
  value: DynamicFormElementValueType | DynamicFormElementValueType[];
  disabled: boolean;
  linkedElements: LinkedElement[];
}
