import {
  IDynamicFormElement,
  IFormGroupComponent,
  SPACER,
  DIRECTION,
} from '../';

export interface IFormGroup extends IDynamicFormElement<IFormGroupComponent> {
  formElements: IDynamicFormElement[];
  disabled: boolean;
  label?: string;
  spacer?: SPACER;
  direction: DIRECTION;
}
