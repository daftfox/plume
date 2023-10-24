import { FormControl, ValidationErrors } from '@angular/forms';
import { DynamicFormService } from '../service/dynamic-form.service';
import { validateIsBeforeOrOn } from './is-before-or-on.validator';

const mockDynamicFormService = {
  getFormComponentControl() {
    return {
      value: new Date(1672534800000), // 01/01/2023 01:00:00
    };
  },
} as unknown as DynamicFormService;

describe('isBeforeOrOn', () => {
  it.each([
    [new Date(1672621200000), { dateIsNotOnOrBefore: '01/01/2023' }], //// 02/01/2023 01:00:00
    [new Date(1672538400000), { dateIsNotOnOrBefore: '01/01/2023' }], //// 01/01/2023 02:00:00
    [new Date(1672448400000), null], //// 31/12/2022 01:00:00
  ])(
    "should return control's date value is before or on the other control's value",
    (date: Date, expectedValue: null | ValidationErrors) => {
      const curriedValidator = validateIsBeforeOrOn('test')(
        mockDynamicFormService,
      );
      const mockFormControl = new FormControl(date);
      expect(curriedValidator(mockFormControl)).toEqual(expectedValue);
    },
  );
});
