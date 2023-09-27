import { SPACER } from '../spacer.enum';
import { IDynamicFormElement } from '../dynamic-form-element.interface';
import { DIRECTION } from '../form-group.interface';

export interface DynamicFormGroupOptions {
  key: string;
  formElements: IDynamicFormElement[];
  label?: string;
  disabled?: boolean;
  spacer?: SPACER;
  direction?: DIRECTION;
}
