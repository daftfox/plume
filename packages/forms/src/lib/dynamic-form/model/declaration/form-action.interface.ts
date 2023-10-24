import { IDynamicFormElement } from '../';

export interface IFormAction extends IDynamicFormElement {
  action: (args?: unknown) => void;
}
