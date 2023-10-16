import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { format } from 'date-fns';
import { isBeforeOrOn } from '@plume-org/utils';
import { DynamicFormService } from '../service/dynamic-form.service';
import { PlumeValidatorFn } from './plume-validator-fn.interface';

export const validateIsBeforeOrOn =
  (targetKey: string): PlumeValidatorFn =>
  (service: DynamicFormService): ValidatorFn =>
  (originControl: AbstractControl): ValidationErrors | null => {
    let targetControl: AbstractControl;
    try {
      targetControl = service.getFormComponentControl(targetKey);
    } catch (e) {
      return null;
    }

    return isBeforeOrOn(originControl.value, targetControl.value)
      ? null
      : {
          dateIsNotOnOrBefore: format(targetControl.value, 'dd/MM/yyyy'),
        };
  };
