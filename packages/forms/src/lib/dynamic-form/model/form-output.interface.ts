import { DynamicFormElement } from './dynamic-form-element.type';

export const isFormOutput = (
  element: DynamicFormElement,
): element is IFormOutput => {
  return !('action' in element) && !('validators' in element);
};

export interface IFormOutput {
  key: string;
}
