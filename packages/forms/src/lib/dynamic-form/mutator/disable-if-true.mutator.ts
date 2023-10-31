import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { MutatorFn } from '../model/declaration/mutator-function.interface';
import { DynamicFormElementValueType } from '../model/dynamic-form-values.interface';

export const disableIfTrue: MutatorFn = (
  originKey: string,
  targetKey: string,
  service: IDynamicFormService,
  value: DynamicFormElementValueType,
) => {
  const linkedElementControl = service.getFormComponentControl(targetKey);

  if (value === true) {
    linkedElementControl.disable();
  } else {
    linkedElementControl.enable();
  }
};
