import { DynamicFormElementValueType, MutatorFn } from '../model';
import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';

export const enableIfValueOneOf =
  (assertValues: DynamicFormElementValueType[]): MutatorFn =>
  (
    originKey: string,
    targetKey: string,
    service: IDynamicFormService,
    value: DynamicFormElementValueType,
  ) => {
    const linkedElementControl = service.getFormComponentControl(targetKey);

    if (assertValues.includes(value)) {
      linkedElementControl.enable();
    } else {
      linkedElementControl.disable();
    }
  };
