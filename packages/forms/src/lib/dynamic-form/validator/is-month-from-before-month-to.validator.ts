import { AbstractControl } from '@angular/forms';

export const validateIsMonthFromBeforeMonthTo = (control: AbstractControl) => {
  if (
    !control.parent || // parent doesn't exist
    control.value === undefined || // current control value is undefined
    control.value === null || // current control value is null
    (control === control.parent.get('monthFrom') && !control.parent.get('monthTo')) || // monthTo control doesn't exist
    (control === control.parent.get('monthTo') && !control.parent.get('monthFrom')) || // monthFrom control doesn't exist
    (control === control.parent.get('monthFrom') && control.parent.get('monthTo').value === undefined) || // monthTo value is undefined
    (control === control.parent.get('monthTo') && control.parent.get('monthFrom').value === undefined) || // monthFrom value is undefined
    (control === control.parent.get('monthFrom') && control.parent.get('monthTo').value === null) || // monthTo value is undefined
    (control === control.parent.get('monthTo') && control.parent.get('monthFrom').value === null) // monthFrom value is undefined
  )
    return null;

  let monthFromValue = control.parent.get('monthFrom').value;
  let monthToValue = control.parent.get('monthTo').value;
  monthFromValue = monthFromValue >= 9 ? monthFromValue - 9 : monthFromValue + 3;
  monthToValue = monthToValue >= 9 ? monthToValue - 9 : monthToValue + 3;

  return monthToValue > monthFromValue ? null : { monthIsBefore: true };
};
