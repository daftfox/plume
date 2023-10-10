import { ValidatorFn, Validators } from '@angular/forms';
import { PlumeValidatorFn } from '@plume/forms';

export const isAngularValidator = (
  validator: ValidatorFn | PlumeValidatorFn,
): validator is ValidatorFn => {
  return Object.prototype.hasOwnProperty.call(Validators, validator.name);
};
