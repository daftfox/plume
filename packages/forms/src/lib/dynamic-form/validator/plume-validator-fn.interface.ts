import { DynamicFormService } from '../service/dynamic-form.service';
import { ValidatorFn, Validators } from '@angular/forms';

export const isAngularValidator = (
  validator: ValidatorFn | PlumeValidatorFn,
): validator is ValidatorFn => {
  return Object.prototype.hasOwnProperty.call(Validators, validator.name);
};

export interface PlumeValidatorFn {
  (service: DynamicFormService): ValidatorFn;
}
