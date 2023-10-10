import { DynamicFormElement } from '../component/abstract-form-group/abstract-form-group.component';

export const isFormAction = (
  element: DynamicFormElement,
): element is IFormAction => {
  return 'action' in element;
};

export interface IFormAction {
  key: string;
  action: (args?: unknown) => void;
}
