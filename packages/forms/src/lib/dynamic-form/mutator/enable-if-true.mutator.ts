import { DynamicFormElementValueType } from '../model/generic-form-values.interface';
import { MutatorFn } from '../model/mutator-function.interface';
import { DynamicFormService } from '../service/dynamic-form.service';

export const enableIfTrue: MutatorFn = (
  originKey: string,
  targetKey: string,
  service: DynamicFormService,
  value: DynamicFormElementValueType,
) => {
  const linkedElementControl = service.getFormComponentControl(targetKey);

  if (value === false) {
    linkedElementControl.enable();
  } else {
    linkedElementControl.disable();
  }
};
