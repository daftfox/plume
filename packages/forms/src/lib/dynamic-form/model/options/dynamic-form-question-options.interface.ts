import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { DynamicFormElementValueType } from '../dynamic-form-values.interface';
import { LinkedElement } from '../declaration/linked-element.interface';
import { PlumeValidatorFn } from '../../validator/plume-validator-function.interface';

export interface DynamicFormQuestionOptions<T = DynamicFormElementValueType> {
  value?: T;
  key?: string;
  label?: string;
  placeholder?: string;
  validators?:
    | ValidatorFn
    | PlumeValidatorFn
    | (ValidatorFn | PlumeValidatorFn)[];
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
  linkedElements?: LinkedElement[];
  /**
   * @TODO not implemented yet
   */
  index?: number;
  disabled?: boolean;
  additionalValidationMessages?: Map<string, string>;
}
