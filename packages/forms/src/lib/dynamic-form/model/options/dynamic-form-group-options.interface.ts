import { SPACER } from '../declaration/spacer.enum';
import { IDynamicFormElement } from '../declaration/dynamic-form-element.interface';
import { DIRECTION } from '@plume-org/forms';

export interface DynamicFormGroupOptions {
  key: string;
  formElements: IDynamicFormElement[];
  label?: string;
  disabled?: boolean;
  spacer?: SPACER;
  direction?: DIRECTION;
}
