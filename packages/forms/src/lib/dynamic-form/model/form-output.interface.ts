import { DynamicFormElement } from '../component/abstract-form-group/abstract-form-group.component';

export const isFormOutput = ( element: DynamicFormElement ): element is IFormOutput => {
  return !('action' in element) && !('validators' in element);
}

export interface IFormOutput {
  key: string;
}
