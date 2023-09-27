import { Type } from '@angular/core';
import {
  AbstractReactiveFormQuestionComponent
} from '../component/abstract-reactive-form-question/abstract-reactive-form-question.component';
import { AbstractFormQuestionComponent } from '../component/abstract-form-question/abstract-form-question.component';
import { AbstractFormGroupComponent } from '../component/abstract-form-group/abstract-form-group.component';
import {
  AbstractReactiveFormElementComponent
} from '../component/abstract-reactive-form-element/abstract-reactive-form-element.component';

/**
 * Base interface for any dynamic component to be rendered within the form.
 */
export interface IDynamicFormElement<C = AbstractFormQuestionComponent | AbstractReactiveFormQuestionComponent<unknown> | AbstractFormGroupComponent | AbstractReactiveFormElementComponent<unknown>> {
  /**
   * The key corresponds to the property name on the formValues.
   */
  key: string;

  /**
   * The component class to use when dynamically instantiating the form component.
   */
  component: Type<C>;
}
