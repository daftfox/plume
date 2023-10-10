import { DynamicFormElementValueType, MutatorFn } from '../model';
import { DynamicFormService } from '../service/dynamic-form.service';
import { isNullish } from '@plume/utils';

export const resetIfValueNotNullishMutator: MutatorFn = <T = DynamicFormElementValueType>(
  originKey: string,
  targetKey: string,
  service: DynamicFormService,
  value?: T
) => {
  const linkedElement = service.getFormComponentControl( targetKey );

  if ( !isNullish(value) ) {
    linkedElement.reset();
  }
};
