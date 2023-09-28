import { AbstractControl, ValidatorFn } from '@angular/forms';
import { format } from 'date-fns';
import { isAfterOrOn } from '@plume/utils';

export const validateIsAfterOrEqual =
  (controlKey: string): ValidatorFn =>
  (control: AbstractControl) => {
    if (
      !control.parent || // parent doesn't exist
      !control.parent.get(controlKey) || // other control doesn't exist
      control.parent.get(controlKey).value === null || // other control value is null
      control.value === null // current control value is null
    )
      return null;
    return isAfterOrOn(control.value, control.parent.get(controlKey).value)
      ? null
      : { dateIsNotOnOrAfter: format(control.parent.get(controlKey).value, 'dd/MM/yyyy') };
  };