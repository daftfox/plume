import { DynamicFormElement, IFormQuestion } from '../model';

export const isFormQuestion = (
  element: DynamicFormElement,
): element is IFormQuestion => {
  return 'validators' in element;
};
