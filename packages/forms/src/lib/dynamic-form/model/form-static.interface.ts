import { DynamicFormElement } from '../component/abstract-form-group/abstract-form-group.component';

export const isFormStatic = ( element: DynamicFormElement ): element is IFormStatic => {
  return !('action' in element) && !('validators' in element);
}

export interface IFormStatic {
  key: string;
}
