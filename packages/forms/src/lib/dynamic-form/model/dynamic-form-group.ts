import { SPACER } from './spacer.enum';
import { DynamicFormGroupOptions } from './options';
import { DIRECTION, IFormGroup } from './form-group.interface';
import { IDynamicFormElement } from './dynamic-form-element.interface';
import { DynamicFormGroupComponent } from '../component/dynamic-form-group/dynamic-form-group.component';

export class DynamicFormGroup implements IFormGroup {
  component = DynamicFormGroupComponent;
  key: string;
  formElements: IDynamicFormElement[];
  disabled = false;
  label?: string;
  spacer?: SPACER;
  direction: DIRECTION;

  constructor(options: DynamicFormGroupOptions) {
    this.key = options.key;
    this.formElements = options.formElements;

    this.label = options.label;
    this.disabled = options.disabled === undefined || options.disabled === null ? false : options.disabled
    this.spacer = options.spacer;
    this.direction = options.direction;
  }
}
