import { DynamicFormElementValueType } from '../model/generic-form-values.interface';
import { MutatorFn } from '../model/mutator-function.interface';
import { DynamicFormService } from '../service/dynamic-form.service';

export const enableIfValueEquals =
  (assertValue: DynamicFormElementValueType): MutatorFn =>
  (
    originKey: string,
    targetKey: string,
    service: DynamicFormService,
    value: DynamicFormElementValueType,
  ) => {
    const linkedElementControl = service.getFormComponentControl(targetKey);

    if (value === assertValue) {
      linkedElementControl.enable();
    } else {
      linkedElementControl.disable();
    }
  };
