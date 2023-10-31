import { ComponentRef, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormComponent } from '../form-component.type';
import { IDynamicFormElement } from '../declaration/dynamic-form-element.interface';

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
