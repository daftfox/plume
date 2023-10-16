import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { format } from 'date-fns';
import { isAfterOrOn } from '@plume-org/utils';
import { DynamicFormService } from '../service/dynamic-form.service';
import { PlumeValidatorFn } from './plume-validator-fn.interface';

export const validateIsAfterOrOn =
  (targetKey: string): PlumeValidatorFn =>
  (service: DynamicFormService): ValidatorFn =>
  (originControl: AbstractControl): ValidationErrors | null => {
    let targetControl: AbstractControl;
    try {
      targetControl = service.getFormComponentControl(targetKey);
    } catch (e) {
      return null;
    }

    return isAfterOrOn(originControl.value, targetControl.value)
      ? null
      : {
          dateIsNotOnOrAfter: format(targetControl.value, 'dd/MM/yyyy'),
        };
  };
