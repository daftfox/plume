import {AsyncValidatorFn, FormGroup, ValidatorFn} from '@angular/forms';
import { SPACER } from './spacer.enum';
import { DynamicFormElementValueType } from './generic-form-values.interface';
import { DynamicFormQuestionOptions } from './options';
import { LinkedElement } from './linked-element.interface';

export type MutatorFn = <T = DynamicFormElementValueType>( linkedElements: LinkedElement[], form: FormGroup, value?: T) => void;

export abstract class AbstractFormQuestion<T = DynamicFormElementValueType> {
  /**
   * The key corresponds to the property name on the formValues. It is advisable to ensure the key corresponds to the property name of the
   * final entity you wish to construct
   */
  key: string;

  label: string;
  placeholder: string;

  /**
   * Validator functions pertaining to this form question specifically. E.g. Validators.required, Validators.maxLength(10), etc.
   */
  validators: ValidatorFn | ValidatorFn[];
  asyncValidators: AsyncValidatorFn | AsyncValidatorFn[];
  linkedElements: LinkedElement[];
  mutators: MutatorFn[];

  /**
   * Whether the form question is enabled or disabled. Defaults to true
   * @default false
   */
  disabled: boolean;

  /**
   * Value of the form question. Defaults to undefined
   * @default undefined
   */
  value?: T;

  /**
   * Display a spacer above OR below this form question.
   */
  spacer?: SPACER;

  protected constructor( options: DynamicFormQuestionOptions<T> ) {
    this.value = options.value !== undefined ? options.value : undefined;
    this.key = options.key || '';
    this.label = options.label || '';
    this.placeholder = options.placeholder || '';
    this.validators = options.validators || [];
    this.asyncValidators = options.asyncValidators || [];
    this.spacer = typeof options.spacer === 'number' ? options.spacer : undefined;
    this.disabled = options.disabled === undefined ? false : options.disabled;
    this.linkedElements = options.linkedElements || [];
    this.mutators = options.mutators || [];
  }
}
