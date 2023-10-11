import { ValidatorFn, Validators } from '@angular/forms';
import { PlumeValidatorFn } from './plume-validator-fn.interface';

/**
 * Checks whether the given validator reference is also found in Angular's Validator class
 * @param validator
 */
export const isAngularValidator = (
  validator: ValidatorFn | PlumeValidatorFn,
): validator is ValidatorFn => {
  return Object.prototype.hasOwnProperty.call(Validators, validator.name);
};
