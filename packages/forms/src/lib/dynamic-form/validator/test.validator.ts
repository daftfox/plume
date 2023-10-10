import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DynamicFormService } from '../service/dynamic-form.service';
import { take, tap } from 'rxjs/operators';
import { PlumeValidatorFn } from './plume-validator-fn.interface';

export const validateTest =
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

    return !targetControl.value ? { wat: true } : null;
  };
