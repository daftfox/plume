import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { MutatorFn } from '../model/declaration/mutator-function.interface';
import { DynamicFormElementValueType } from '../model/dynamic-form-values.interface';

export const disableIfValueEquals =
  (assertValue: DynamicFormElementValueType): MutatorFn =>
  (
    originKey: string,
    targetKey: string,
    service: IDynamicFormService,
    value: DynamicFormElementValueType,
  ) => {
    const linkedElementControl = service.getFormComponentControl(targetKey);

    if (value === assertValue) {
      linkedElementControl.disable();
    } else {
      linkedElementControl.enable();
    }
  };
