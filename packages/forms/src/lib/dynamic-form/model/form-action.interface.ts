import { DynamicFormElement } from './dynamic-form-element.type';

export const isFormAction = (
  element: DynamicFormElement,
): element is IFormAction => {
  return 'action' in element;
};

export interface IFormAction {
  key: string;
  action: (args?: unknown) => void;
}
