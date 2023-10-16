import { DynamicFormElementValueType, IDynamicFormElement } from '../model';
import { DynamicFormService } from '../service/dynamic-form.service';
import { MutatorFn } from '../model/mutator-function.interface';

export const addFormElementsToFormGroupIfValueEquals =
  (
    assertValue: DynamicFormElementValueType,
    formElements: IDynamicFormElement[],
    formGroupKey: string,
  ): MutatorFn =>
  (
    originKey: string,
    targetKey: string,
    service: DynamicFormService,
    value: DynamicFormElementValueType,
  ) => {
    if (value === assertValue) {
      service.addFormElementsToFormGroup(formElements, formGroupKey);
    } else {
      service.removeFormElementsFromFormGroup(formElements, formGroupKey);
    }
  };
