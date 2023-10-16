import { DynamicFormElementValueType } from '../model/generic-form-values.interface';
import { MutatorFn } from '../model/mutator-function.interface';
import { DynamicFormService } from '../service/dynamic-form.service';

export const displayIfValueOneOf =
  (assertValues: DynamicFormElementValueType[]): MutatorFn =>
  (
    originKey: string,
    targetKey: string,
    service: DynamicFormService,
    value: DynamicFormElementValueType,
  ) => {
    if (assertValues.includes(value)) {
      service.setElementVisibility(targetKey, true);
    } else {
      service.setElementVisibility(targetKey, false);
    }
  };
