import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { isNullish } from '@plume-org/utils';
import { MutatorFn } from '../model/declaration/mutator-function.interface';
import { DynamicFormElementValueType } from '../model/dynamic-form-values.interface';

export const resetIfValueNotNullish: MutatorFn = (
  originKey: string,
  targetKey: string,
  service: IDynamicFormService,
  value?: DynamicFormElementValueType,
) => {
  const linkedElement = service.getFormComponentControl(targetKey);

  if (!isNullish(value)) {
    linkedElement.reset();
  }
};
