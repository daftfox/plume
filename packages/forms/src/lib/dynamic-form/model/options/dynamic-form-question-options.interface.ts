import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { DynamicFormElementValueType } from '../generic-form-values.interface';
import { SPACER } from '../spacer.enum';
import { LinkedElement } from '../linked-element.interface';
import { PlumeValidatorFn } from '../../validator';

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
  spacer?: SPACER;
  additionalValidationMessages?: Map<string, string>;
}
