import {
  AbstractFormGroupComponent,
  DynamicFormElement
} from '../component/abstract-form-group/abstract-form-group.component';
import { IDynamicFormComponent } from './dynamic-form-component.interface';
import { SPACER } from './spacer.enum';

export const isFormGroup = ( element: DynamicFormElement ): element is IFormGroup => {
  return 'formElements' in element;
}

export interface IFormGroup extends IDynamicFormComponent<AbstractFormGroupComponent> {
  formElements: DynamicFormElement[];
  disabled: boolean;
  label?: string;
  spacer?: SPACER;
  direction: 'row' | 'column';
}
