import { IDynamicFormElement } from '../model/declaration/dynamic-form-element.interface';
import { MutatorFn } from '../model/declaration/mutator-function.interface';
import { DynamicFormElementValueType } from '../model/dynamic-form-values.interface';
import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';

export const addFormElementsIfValueEquals =
  (
    assertValue: DynamicFormElementValueType,
    formElements: IDynamicFormElement[],
    formGroupKey: string,
  ): MutatorFn =>
  (
    originKey: string,
    targetKey: string,
    service: IDynamicFormService,
    value: DynamicFormElementValueType,
  ) => {
    if (value === assertValue) {
      service.addFormElementsToFormGroup(formElements, formGroupKey);
    } else {
      service.removeFormElementsFromFormGroup(formElements, formGroupKey);
    }
  };
