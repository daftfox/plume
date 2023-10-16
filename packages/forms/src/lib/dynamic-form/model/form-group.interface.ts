import { AbstractFormGroupComponent } from '../component/abstract-form-group/abstract-form-group.component';
import { IDynamicFormElement } from './dynamic-form-element.interface';
import { SPACER } from './spacer.enum';
import { DynamicFormElement } from './dynamic-form-element.type';

export const isFormGroup = (
  element: DynamicFormElement,
): element is IFormGroup => {
  return 'formElements' in element;
};

export enum DIRECTION {
  ROW = 'row',
  COLUMN = 'column',
}

export interface IFormGroup
  extends IDynamicFormElement<AbstractFormGroupComponent> {
  formElements: IDynamicFormElement[];
  disabled: boolean;
  label?: string;
  spacer?: SPACER;
  direction: DIRECTION;
}
