import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { SPACER } from './spacer.enum';
import { DynamicFormElementValueType } from './generic-form-values.interface';
import { LinkedElement } from './linked-element.interface';
import { AbstractFormQuestionComponent, DynamicFormElement, IDynamicFormComponent, MutatorFn } from '@slodder/forms';
import {
  AbstractReactiveFormQuestionComponent
} from '../component/abstract-reactive-form-question/abstract-reactive-form-question.component';

export const isFormQuestion = ( element: DynamicFormElement ): element is IFormQuestion => {
  return 'validators' in element;
}

export interface IFormQuestion<T = DynamicFormElementValueType>
  extends IDynamicFormComponent<AbstractFormQuestionComponent | AbstractReactiveFormQuestionComponent<unknown>> {
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
}
