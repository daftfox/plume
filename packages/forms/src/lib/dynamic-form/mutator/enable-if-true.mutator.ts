import { DynamicFormElementValueType, MutatorFn } from '../model';
import { DynamicFormService } from '../service/dynamic-form.service';

export const enableIfTrue: MutatorFn = <T = DynamicFormElementValueType>(
  originKey: string,
  targetKey: string,
  service: DynamicFormService,
  value: T,
) => {
  const linkedElementControl = service.getFormComponentControl(targetKey);

  if (value === false) {
    linkedElementControl.enable();
  } else {
    linkedElementControl.disable();
  }
};
