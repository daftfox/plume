import { SPACER } from '../spacer.enum';
import { IDynamicFormComponent } from '../dynamic-form-component.interface';

export interface DynamicFormGroupOptions {
  key: string;
  formElements: IDynamicFormComponent[];
  label?: string;
  disabled?: boolean;
  spacer?: SPACER;
  direction?: 'row' | 'column';
}
