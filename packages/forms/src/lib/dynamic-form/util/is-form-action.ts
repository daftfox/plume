import { DynamicFormElement } from '../model/declaration/dynamic-form-element.type';
import { IFormAction } from '../model/declaration/form-action.interface';

export const isFormAction = (
  element: DynamicFormElement,
): element is IFormAction => {
  return 'action' in element;
};
