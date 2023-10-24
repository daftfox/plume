import { ComponentRef, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponent, IDynamicFormElement } from '../';
import { Observable } from 'rxjs';

export interface IFormGroupComponent {
  key: string;
  form: FormGroup;
  formElements: IDynamicFormElement[] | Observable<IDynamicFormElement[]>;
  appendFormControlToForm(formElement: IDynamicFormElement): void;
  removeFormControlFromForm(key: string): void;
  createFormComponent(
    component: Type<FormComponent>,
  ): ComponentRef<FormComponent>;
}
