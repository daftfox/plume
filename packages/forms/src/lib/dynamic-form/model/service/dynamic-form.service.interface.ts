import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { FormComponent } from '../form-component.type';
import { IDynamicFormElement } from '../declaration/dynamic-form-element.interface';
import { IFormGroupComponent } from '../component/form-group.component.interface';

export interface IDynamicFormService {
  formInitialised: Observable<null>;
  getFormComponentKeys(): string[];
  updateFormControl(key: string): void;
  getFormComponent(key: string): FormComponent;
  getFormComponentControl(key: string): AbstractControl;
  destroyFormComponent(key: string): void;
  setElementVisibility(key: string, isVisible: boolean): void;
  addFormElementsToFormGroup(
    formElements: IDynamicFormElement[],
    formGroupKey: string,
  ): void;
  removeFormElementsFromFormGroup(
    formElements: IDynamicFormElement[],
    formGroupKey: string,
  ): void;
  updateFormElementComponents(
    formGroupComponent: IFormGroupComponent,
    formElements: IDynamicFormElement[],
  ): void;
}
