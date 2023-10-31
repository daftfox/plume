import { IDynamicFormElement } from './dynamic-form-element.interface';
import { SPACER } from './spacer.enum';
import { IFormGroupComponent } from '../component/form-group.component.interface';
import { DIRECTION } from './direction.enum';

export interface IFormGroup extends IDynamicFormElement<IFormGroupComponent> {
  formElements: IDynamicFormElement[];
  disabled: boolean;
  label?: string;
  spacer?: SPACER;
  direction: DIRECTION;
}
