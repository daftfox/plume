import { DynamicFormElementValueType } from '../model';
import { DynamicFormService } from '../service/dynamic-form.service';

export const hideIfValueOneOf = <AT = DynamicFormElementValueType>(
  assertValues: AT[]
) => <T extends AT>(
  originKey: string,
  targetKey: string,
  service: DynamicFormService,
  value: T
) => {
  if ( assertValues.includes( value ) ) {
    service.setElementVisibility( targetKey, false );
  } else {
    service.setElementVisibility( targetKey, true );
  }
};
