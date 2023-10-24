import { DynamicFormElement, IFormOutput } from '../model';

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
