import { ValidatorFn, Validators } from '@angular/forms';
import { PlumeValidatorFn } from './plume-validator-fn.interface';

export const isAngularValidator = (
  validator: ValidatorFn | PlumeValidatorFn,
): validator is ValidatorFn => {
  return Object.prototype.hasOwnProperty.call(Validators, validator.name);
};
