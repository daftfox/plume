import { IDynamicFormElement } from './dynamic-form-element.interface';

export interface IFormAction extends IDynamicFormElement {
  action: (args?: unknown) => void;
}
