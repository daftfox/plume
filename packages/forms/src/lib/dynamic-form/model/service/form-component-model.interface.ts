import { ComponentRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormComponent, IFormGroupComponent } from '../index';

export interface FormComponentModel {
  componentRef: ComponentRef<FormComponent>;
  parent: IFormGroupComponent;
  control: AbstractControl;
}
