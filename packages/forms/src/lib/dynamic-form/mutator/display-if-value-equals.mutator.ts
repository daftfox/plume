import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { MutatorFn } from '../model/declaration/mutator-function.interface';
import { DynamicFormElementValueType } from '../model/dynamic-form-values.interface';

export const displayIfValueEquals =
  (assertValue: DynamicFormElementValueType): MutatorFn =>
  (
    originKey: string,
    targetKey: string,
    service: IDynamicFormService,
    value: DynamicFormElementValueType,
  ) => {
    if (value === assertValue) {
      service.setElementVisibility(targetKey, true);
    } else {
      service.setElementVisibility(targetKey, false);
    }
  };
