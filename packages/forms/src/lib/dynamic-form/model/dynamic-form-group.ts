import { DynamicFormElement } from '../service/dynamic-form.service';
import { SPACER } from './spacer.enum';
import { DynamicFormGroupOptions } from './options';

export class DynamicFormGroup {
  key: string;
  formElements: DynamicFormElement[];
  disabled = false;
  label?: string;
  spacer?: SPACER;
  direction: 'row' | 'column' = 'column';

  constructor(options: DynamicFormGroupOptions) {
    this.key = options.key;
    this.formElements = options.formElements;

    this.label = options.label;
    this.disabled = options.disabled !== undefined && options.disabled;
    this.spacer = options.spacer;
    this.direction = options.direction;
  }
}
