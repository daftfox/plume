import { ComponentRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormComponent } from '../form-component.type';
import { IFormGroupComponent } from '../component/form-group.component.interface';

export interface FormComponentModel {
  componentRef: ComponentRef<FormComponent>;
  parent: IFormGroupComponent;
  control: AbstractControl;
}
