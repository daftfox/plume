import { DynamicFormElementValueType } from '../model/generic-form-values.interface';
import { MutatorFn } from '../model/mutator-function.interface';
import { DynamicFormService } from '../service/dynamic-form.service';

export const hideIfValueEquals =
  (assertValue: DynamicFormElementValueType): MutatorFn =>
  (
    originKey: string,
    targetKey: string,
    service: DynamicFormService,
    value: DynamicFormElementValueType,
  ) => {
    if (value === assertValue) {
      service.setElementVisibility(targetKey, false);
    } else {
      service.setElementVisibility(targetKey, true);
    }
  };
