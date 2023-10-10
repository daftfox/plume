import { DynamicFormElementValueType } from '../model';
import { DynamicFormService } from '../service/dynamic-form.service';

export const hideIfValueEquals = <AT = DynamicFormElementValueType>(
  assertValue: AT
) => <T extends AT>(
  originKey: string,
  targetKey: string,
  service: DynamicFormService,
  value: T
) => {
  if ( value === assertValue ) {
    service.setElementVisibility( targetKey, false );
  } else {
    service.setElementVisibility( targetKey, true );
  }
};
