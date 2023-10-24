import { DynamicFormElementValueType, MutatorFn } from '../model';
import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { isNullish } from '@plume-org/utils';

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
