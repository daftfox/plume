import { IFormOutput } from '../model/declaration/form-output.interface';
import { DynamicFormElement } from '../model/declaration/dynamic-form-element.type';

export const isFormOutput = (
  element: DynamicFormElement,
): element is IFormOutput => {
  return (
    !('action' in element) &&
    !('validators' in element) &&
    !('formElements' in element) &&
    !('dataSource' in element)
  );
};
