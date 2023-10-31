import { DynamicFormElement } from '../model/declaration/dynamic-form-element.type';
import { IFormGroup } from '../model/declaration/form-group.interface';

export const isFormGroup = (
  element: DynamicFormElement,
): element is IFormGroup => {
  return 'formElements' in element;
};
