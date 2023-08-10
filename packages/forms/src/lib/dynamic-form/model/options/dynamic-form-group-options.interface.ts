import { DynamicFormElement } from '../../service/dynamic-form.service';
import { SPACER } from '../spacer.enum';

export interface DynamicFormGroupOptions {
  key: string;
  formElements: DynamicFormElement[];
  label?: string;
  disabled?: boolean;
  spacer?: SPACER;
  direction?: 'row' | 'column';
}
