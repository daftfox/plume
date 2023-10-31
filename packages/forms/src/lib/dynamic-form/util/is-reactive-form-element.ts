import { IReactiveFormElement } from '../model/declaration/reactive-form-element.interface';
import { IReactiveFormQuestion } from '../model/declaration/reactive-form-question.type';
import { DynamicFormElement } from '../model/declaration/dynamic-form-element.type';

export const isReactiveFormElement = (
  element: DynamicFormElement,
): element is IReactiveFormElement | IReactiveFormQuestion => {
  return 'dataSource' in element;
};
