import { AsyncValidatorFn, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { SPACER } from './spacer.enum';
import { DynamicFormElementValueType } from './generic-form-values.interface';
import { DynamicFormQuestionOptions } from './options';
import { LinkedElement } from './linked-element.interface';
import { IFormQuestion } from './form-question.interface';
import {
  AbstractReactiveFormQuestionComponent
} from '../component/abstract-reactive-form-question/abstract-reactive-form-question.component';
import { AbstractFormQuestionComponent } from '../component/abstract-form-question/abstract-form-question.component';
import { Type } from '@angular/core';

export type MutatorFn = <T = DynamicFormElementValueType>( linkedElements: LinkedElement[], form: FormGroup, value?: T) => void;

/**
 * Abstract class that forms the basis for all dynamic form questions.
 * Extend this class when adding custom components. Note, this is not the component itself, but
 * the class used to declare it and add it to the dynamic form.
 *
 * Your custom form element should contain a component property to define the component class to instantiate when
 * dynamically building up the form.
 *
 * @example
 * export class CustomFormElement extends AbstractFormQuestion<string> {
 *   component = CustomFormComponent;
 * }
 */
export abstract class AbstractFormQuestion<T = DynamicFormElementValueType> implements IFormQuestion<T> {
  key: string;

  /**
   * Refers to the component class to use when dynamically building up the form.
   */
  abstract component: Type<AbstractFormQuestionComponent | AbstractReactiveFormQuestionComponent<unknown>>;

  /**
   * String to be displayed as the form component's label.
   */
  label: string;

  /**
   * String to be displayed as the form component input's placeholder.
   */
  placeholder: string;

  /**
   * Validator functions pertaining to this form question specifically. E.g. Validators.required, Validators.maxLength(10), etc.
   */
  validators: ValidatorFn | ValidatorFn[];
  asyncValidators: AsyncValidatorFn | AsyncValidatorFn[];

  /**
   * Linked elements are other form elements whose values should be reevaluated or refreshed when this element's value
   * or state changes.
   */
  linkedElements: LinkedElement[];

  /**
   * Mutators are lambdas that are executed serially in order to change a linked element's state or value when this
   * element's value or state changes.
   */
  mutators: MutatorFn[];

  /**
   * Whether the form question is enabled or disabled. Defaults to true
   * @default false
   */
  disabled: boolean;

  /**
   * Value of the form question. Defaults to null
   * @default undefined
   */
  value?: T;

  /**
   * Display a spacer above OR below this form question.
   */
  spacer?: SPACER;

  protected constructor( options: DynamicFormQuestionOptions<T> ) {
    this.value = options.value !== undefined && options.value !== null ? options.value : null;
    this.key = options.key || '';
    this.label = options.label || '';
    this.placeholder = options.placeholder || '';
    this.validators = options.validators || [];
    this.asyncValidators = options.asyncValidators || [];
    this.spacer = typeof options.spacer === 'number' ? options.spacer : null;
    this.disabled = options.disabled === null ? false : options.disabled;
    this.linkedElements = options.linkedElements || [];
    this.mutators = options.mutators || [];
  }

  getFormControl(): FormControl<T> {
    const { value, disabled, validators, asyncValidators } = this;
    return new FormControl<T>(
      { value, disabled },
      validators,
      asyncValidators,
    );
  };
}
