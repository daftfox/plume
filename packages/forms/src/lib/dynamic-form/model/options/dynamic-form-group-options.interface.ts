import { IDynamicFormElement } from '../declaration/dynamic-form-element.interface';
import { DIRECTION } from '../declaration';

export interface DynamicFormGroupOptions {
  key: string;
  formElements: IDynamicFormElement[];
  label?: string;
  disabled?: boolean;
  direction?: DIRECTION;
}
