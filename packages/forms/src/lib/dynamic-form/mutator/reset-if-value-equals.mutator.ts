import { DynamicFormElementValueType } from '../model';
import { DynamicFormService } from '../service/dynamic-form.service';

export const resetIfValueEquals = <AT = DynamicFormElementValueType>(
  assertValue: AT
) => <T extends AT>(
  originKey: string,
  targetKey: string,
  service: DynamicFormService,
  value: T
) => {
  const linkedElementControl = service.getFormComponentControl( targetKey );

  if ( value === assertValue ) {
    linkedElementControl.reset();
  }
};
