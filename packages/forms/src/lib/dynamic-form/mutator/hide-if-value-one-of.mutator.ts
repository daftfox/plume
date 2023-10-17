import { DynamicFormElementValueType, MutatorFn } from '../model';
import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';

export const hideIfValueOneOf =
  (assertValues: DynamicFormElementValueType[]): MutatorFn =>
  (
    originKey: string,
    targetKey: string,
    service: IDynamicFormService,
    value: DynamicFormElementValueType,
  ) => {
    if (assertValues.includes(value)) {
      service.setElementVisibility(targetKey, false);
    } else {
      service.setElementVisibility(targetKey, true);
    }
  };
