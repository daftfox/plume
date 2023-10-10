import { DynamicFormElementValueType } from '../model';
import { DynamicFormService } from '../service/dynamic-form.service';

export const displayIfValueEquals =
  <AT = DynamicFormElementValueType>(assertValue: AT) =>
  <T extends AT>(
    originKey: string,
    targetKey: string,
    service: DynamicFormService,
    value: T,
  ) => {
    if (value === assertValue) {
      service.setElementVisibility(targetKey, true);
    } else {
      service.setElementVisibility(targetKey, false);
    }
  };
