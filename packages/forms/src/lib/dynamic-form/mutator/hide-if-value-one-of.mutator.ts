import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { MutatorFn } from '../model/declaration/mutator-function.interface';
import { DynamicFormElementValueType } from '../model/dynamic-form-values.interface';

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
