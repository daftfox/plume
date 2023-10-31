import { Type } from '@angular/core';
import { FormComponent } from '../form-component.type';

/**
 * Base interface for any dynamic component to be rendered within the form.
 */
export interface IDynamicFormElement<C = FormComponent> {
  /**
   * The key corresponds to the property name on the formValues.
   */
  key: string;

  /**
   * The component class to use when dynamically instantiating the form component.
   */
  component: Type<C>;

  inputKeys: string[];
}
