import {
  DynamicFormElementValueType,
  IDynamicFormElement,
  MutatorFn,
  IDynamicFormService,
} from '../model';

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
