import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { format } from 'date-fns';
import { isAfterOrOn } from '@plume-org/utils';
import { PlumeValidatorFn } from './plume-validator-function.interface';
import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';

export const validateIsAfterOrOn =
  (targetKey: string): PlumeValidatorFn =>
  (service: IDynamicFormService): ValidatorFn =>
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
