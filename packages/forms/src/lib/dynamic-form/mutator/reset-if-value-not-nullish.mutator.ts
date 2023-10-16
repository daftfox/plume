import { DynamicFormElementValueType } from '../model/generic-form-values.interface';
import { MutatorFn } from '../model/mutator-function.interface';
import { DynamicFormService } from '../service/dynamic-form.service';
import { isNullish } from '@plume-org/utils';

export const resetIfValueNotNullishMutator: MutatorFn = (
  originKey: string,
  targetKey: string,
  service: DynamicFormService,
  value?: DynamicFormElementValueType,
) => {
  const linkedElement = service.getFormComponentControl(targetKey);

  if (!isNullish(value)) {
    linkedElement.reset();
  }
};
