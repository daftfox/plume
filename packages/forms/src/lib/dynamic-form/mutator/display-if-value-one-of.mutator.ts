import { DynamicFormElementValueType, MutatorFn } from '../model';
import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';

export const displayIfValueOneOf =
  (assertValues: DynamicFormElementValueType[]): MutatorFn =>
  (
    originKey: string,
    targetKey: string,
    service: IDynamicFormService,
    value: DynamicFormElementValueType,
  ) => {
    if (assertValues.includes(value)) {
      service.setElementVisibility(targetKey, true);
    } else {
      service.setElementVisibility(targetKey, false);
    }
  };
