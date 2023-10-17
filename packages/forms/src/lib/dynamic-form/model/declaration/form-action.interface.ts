import { IDynamicFormElement } from '../';

export interface IFormAction extends IDynamicFormElement {
  key: string;
  action: (args?: unknown) => void;
}
