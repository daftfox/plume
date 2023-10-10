import { DynamicFormElementValueType } from '../model';
import { DynamicFormService } from '../service/dynamic-form.service';

export const disableIfValueOneOf =
  <AT = DynamicFormElementValueType>(assertValues: AT[]) =>
  <T extends AT>(
    originKey: string,
    targetKey: string,
    service: DynamicFormService,
    value: T,
  ) => {
    const linkedElementControl = service.getFormComponentControl(targetKey);

    if (assertValues.includes(value)) {
      linkedElementControl.disable();
    } else {
      linkedElementControl.enable();
    }
  };
