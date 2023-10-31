import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { PlumeValidatorFn } from '../../validator/plume-validator-function.interface';
import { LinkedElement } from '../declaration/linked-element.interface';
import { DynamicFormElementValueType } from '../dynamic-form-values.interface';

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
