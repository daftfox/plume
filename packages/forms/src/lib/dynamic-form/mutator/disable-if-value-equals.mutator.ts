import { DynamicFormElementValueType, MutatorFn } from '../model';
import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';

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
