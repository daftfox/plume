import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PlumeValidatorFn } from './plume-validator-fn.interface';
import { isAngularValidator } from './is-angular-validator';
import { DynamicFormService } from '../service/dynamic-form.service';
import { take, tap } from 'rxjs/operators';

const mockValidator =
  (targetKey: string): PlumeValidatorFn =>
  (service: DynamicFormService): ValidatorFn =>
  (originControl: AbstractControl): ValidationErrors | null => {
    let targetControl: AbstractControl;
    try {
      targetControl = service.getFormComponentControl(targetKey);
    } catch (e) {
      return null;
    }

    targetControl.statusChanges
      .pipe(
        take(1),
        // Update the origin control's validity when the target control's validity is updated
        tap(() => {
          originControl.updateValueAndValidity();
        }),
      )
      .subscribe();

    return !targetControl.value ? { mockValidationError: true } : null;
  };

describe('isAngularValidator', () => {
  it.each([
    [Validators.min(10), true],
    [Validators.max(10), true],
    [Validators.required, true],
    [Validators.requiredTrue, true],
    [Validators.email, true],
    [Validators.minLength(10), true],
    [Validators.maxLength(10), true],
    [Validators.pattern(/[a-z]/), true],
    [Validators.nullValidator, true],
    [mockValidator('test'), false],
  ])(
    'should return whether the passed validator is an Angular built-in validator or not',
    (validatorFn: ValidatorFn | PlumeValidatorFn, expectedValue: boolean) => {
      expect(isAngularValidator(validatorFn)).toEqual(expectedValue);
    },
  );
});