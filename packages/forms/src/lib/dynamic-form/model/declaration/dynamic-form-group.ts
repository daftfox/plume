import {
  DynamicFormGroupOptions,
  DIRECTION,
  IDynamicFormElement,
  IFormGroup,
} from '../';
import { DynamicFormGroupComponent } from '../../component/dynamic-form-group/dynamic-form-group.component';

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
