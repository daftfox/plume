import { SPACER } from './spacer.enum';
import { DynamicFormGroupOptions } from './options';
import { IFormGroup } from './form-group.interface';
import { IDynamicFormComponent } from './dynamic-form-component.interface';
import { DynamicFormGroupComponent } from '../component/dynamic-form-group/dynamic-form-group.component';

export class DynamicFormGroup implements IFormGroup {
  component = DynamicFormGroupComponent;
  key: string;
  formElements: IDynamicFormComponent[];
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
