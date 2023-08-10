import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { DynamicFormElementValueType } from '../generic-form-values.interface';
import { SPACER } from '../spacer.enum';
import { MutatorFn } from '../abstract-form-question';
import { LinkedElement } from '../linked-element.interface';

export interface DynamicFormQuestionOptions<T = DynamicFormElementValueType> {
  value?: T;
  key?: string;
  label?: string;
  placeholder?: string;
  validators?: ValidatorFn | ValidatorFn[];
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
  linkedElements?: LinkedElement[];
  /**
   * @deprecated
   */
  index?: number;
  disabled?: boolean;
  spacer?: SPACER;
  mutators?: MutatorFn[];
}
