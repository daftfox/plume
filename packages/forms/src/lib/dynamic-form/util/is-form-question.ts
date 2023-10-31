import { DynamicFormElement } from '../model/declaration/dynamic-form-element.type';
import { IFormQuestion } from '../model/declaration/form-question.interface';

export const isFormQuestion = (
  element: DynamicFormElement,
): element is IFormQuestion => {
  return 'validators' in element;
};
