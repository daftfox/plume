import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { IReactiveFormQuestionComponent } from '../component/reactive-form-question.component.interface';
import { IDynamicFormElement } from './dynamic-form-element.interface';
import { SPACER } from './spacer.enum';
import { IFormQuestionComponent } from '../component/form-question.component.interface';
import { PlumeValidatorFn } from '../../validator/plume-validator-function.interface';
import { LinkedElement } from './linked-element.interface';
import { DynamicFormElementValueType } from '../dynamic-form-values.interface';

export interface IFormQuestion<T = DynamicFormElementValueType>
  extends IDynamicFormElement<
    IFormQuestionComponent | IReactiveFormQuestionComponent
  > {
  label: string;
  placeholder: string;

  /**
   * Validator functions pertaining to this form question specifically. E.g. Validators.required, Validators.maxLength(10), etc.
   */
  validators:
    | ValidatorFn
    | PlumeValidatorFn
    | (ValidatorFn | PlumeValidatorFn)[];
  asyncValidators: AsyncValidatorFn | AsyncValidatorFn[];
  linkedElements: LinkedElement[];

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
}
