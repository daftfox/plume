import { ComponentRef, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicFormValues, FormComponent, IDynamicFormElement } from '../';

export interface IFormGroupComponent {
  key: string;
  form: FormGroup;
  get group(): FormGroup | undefined;
  get isValid(): boolean;
  get isDisabled(): boolean;
  get isPristine(): boolean;
  get isDirty(): boolean;
  get value(): Observable<DynamicFormValues>;
  appendFormControlToForm(formElement: IDynamicFormElement): void;
  removeFormControlFromForm(key: string): void;
  createFormComponent(
    component: Type<FormComponent>,
  ): ComponentRef<FormComponent>;
}
