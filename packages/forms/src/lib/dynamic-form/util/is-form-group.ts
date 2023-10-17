import { DynamicFormElement, IFormGroup } from '../model';

export const isFormGroup = (
  element: DynamicFormElement,
): element is IFormGroup => {
  return 'formElements' in element;
};
