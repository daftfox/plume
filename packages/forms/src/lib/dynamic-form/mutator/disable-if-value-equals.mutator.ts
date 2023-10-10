import { DynamicFormElementValueType } from '../model';
import { DynamicFormService } from '../service/dynamic-form.service';

export const disableIfValueEquals = <AT = DynamicFormElementValueType>(
  assertValue: AT
) => <T extends AT>(
  originKey: string,
  targetKey: string,
  service: DynamicFormService,
  value: T
) => {
  const linkedElementControl = service.getFormComponentControl( targetKey );

  if ( value === assertValue ) {
    linkedElementControl.disable();
  } else {
    linkedElementControl.enable();
  }
};
