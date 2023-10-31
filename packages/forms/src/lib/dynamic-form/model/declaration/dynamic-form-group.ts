import { DynamicFormGroupComponent } from '../../component/dynamic-form-group/dynamic-form-group.component';
import { DynamicFormGroupOptions } from '../options/dynamic-form-group-options.interface';
import { IDynamicFormElement } from './dynamic-form-element.interface';
import { DIRECTION } from './direction.enum';
import { IFormGroup } from './form-group.interface';

export class DynamicFormGroup implements IFormGroup {
  component = DynamicFormGroupComponent;
  inputKeys = ['key', 'formElements', 'label', 'disabled', 'direction'];
  key: string;
  formElements: IDynamicFormElement[];
  disabled = false;
  label?: string;
  direction: DIRECTION;

  constructor(options: DynamicFormGroupOptions) {
    this.key = options.key;
    this.formElements = options.formElements;

    this.label = options.label;
    this.disabled =
      options.disabled === undefined || options.disabled === null
        ? false
        : options.disabled;
    this.direction = options.direction;
  }
}
