import { DynamicFormElementValueType, MutatorFn } from '../model';
import { DynamicFormService } from '../service/dynamic-form.service';

export const disableIfTrue: MutatorFn = <T = DynamicFormElementValueType>(
  originKey: string,
  targetKey: string,
  service: DynamicFormService,
  value: T,
) => {
  const linkedElementControl = service.getFormComponentControl(targetKey);

  if (value === true) {
    linkedElementControl.enable();
  } else {
    linkedElementControl.disable();
  }
};
