import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { MutatorFn } from '../model/declaration/mutator-function.interface';
import { DynamicFormElementValueType } from '../model/dynamic-form-values.interface';

export const disableIfValueOneOf =
  (assertValues: DynamicFormElementValueType[]): MutatorFn =>
  (
    originKey: string,
    targetKey: string,
    service: IDynamicFormService,
    value: DynamicFormElementValueType,
  ) => {
    const linkedElementControl = service.getFormComponentControl(targetKey);

    if (assertValues.includes(value)) {
      linkedElementControl.disable();
    } else {
      linkedElementControl.enable();
    }
  };
