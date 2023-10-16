import { ValidatorFn, Validators } from '@angular/forms';
import { PlumeValidatorFn } from './plume-validator-fn.interface';

/**
 * Checks whether the given validator reference is also found in Angular's Validator class
 * @param validator
 */
export const isAngularValidator = (
  validator: ValidatorFn | PlumeValidatorFn,
): validator is ValidatorFn => {
  return (
    Object.prototype.hasOwnProperty.call(Validators, validator.name) ||
    (getMethodArgumentNames(validator).length &&
      getMethodArgumentNames(validator)[0].indexOf(
        getMethodArgumentNames(Validators.required)[0],
      ) === 0)
  );
};

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getMethodArgumentNames = (func: (arg: any) => any): string[] => {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let result: string[] = fnStr
    .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
    .match(ARGUMENT_NAMES);
  if (result === null) result = [];
  return result;
};
