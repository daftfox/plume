import {
  DynamicFormElement,
  IReactiveFormElement,
  IReactiveFormQuestion,
} from '../model';

export const isReactiveFormElement = (
  element: DynamicFormElement,
): element is IReactiveFormElement | IReactiveFormQuestion => {
  return 'dataSource' in element;
};
