import { DynamicFormElement, IFormAction } from '../model';

export const isFormAction = (
  element: DynamicFormElement,
): element is IFormAction => {
  return 'action' in element;
};
