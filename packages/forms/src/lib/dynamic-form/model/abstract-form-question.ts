import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { AbstractFormQuestionComponent } from '../component/abstract-form-question/abstract-form-question.component';
import { LinkedQuestion } from './linked-question.interface';
import { SPACER } from './spacer.enum';
import { FormQuestionValueType } from './generic-form-values.interface';

export type MutatorFn = <T = FormQuestionValueType>(scope: AbstractFormQuestionComponent<T>, value?: FormQuestionValueType) => void;

export interface FormQuestionOptions<T = FormQuestionValueType> {
  value?: T;
  key?: string;
  label?: string;
  placeholder?: string;
  validators?: ValidatorFn | ValidatorFn[];
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
  linkedQuestions?: LinkedQuestion[];
  /**
   * @deprecated
   */
  index?: number;
  disabled?: boolean;
  spacer?: SPACER;
  mutators?: MutatorFn[];
}

export abstract class AbstractFormQuestion<T = FormQuestionValueType> {
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
  linkedQuestions: LinkedQuestion[];
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

  constructor(options: FormQuestionOptions<T>) {
    this.value = options.value || undefined;
    this.key = options.key || '';
    this.label = options.label || '';
    this.placeholder = options.placeholder || '';
    this.validators = options.validators || [];
    this.asyncValidators = options.asyncValidators || [];
    this.spacer = typeof options.spacer === 'number' ? options.spacer : undefined;
    this.disabled = options.disabled === undefined ? false : options.disabled;
    this.linkedQuestions = options.linkedQuestions || [];
    this.mutators = options.mutators || [];
  }
}
