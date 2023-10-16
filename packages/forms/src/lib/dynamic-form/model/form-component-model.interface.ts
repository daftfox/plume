import { ComponentRef } from '@angular/core';
import { AbstractFormGroupComponent } from '../component/abstract-form-group/abstract-form-group.component';
import { FormComponent } from './form-component.interface';
import { AbstractControl } from '@angular/forms';

export interface FormComponentModel {
  componentRef: ComponentRef<FormComponent>;
  parent: AbstractFormGroupComponent;
  control: AbstractControl;
}
