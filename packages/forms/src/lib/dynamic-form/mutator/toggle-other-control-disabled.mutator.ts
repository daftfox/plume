import {DynamicFormElementValueType, LinkedElement} from '../model';
import {isNullish} from "@slodder/utils";
import {FormGroup} from "@angular/forms";

export const toggleOtherControlDisabled = <T = DynamicFormElementValueType>(linkedElements: LinkedElement[], form: FormGroup, value?: T) => {
  linkedElements
    .forEach(({ key }) => {
      if (!form) return;

      const otherControl = form.get(key);

      if (!otherControl) return;

      if ( typeof value === 'boolean' ) {
        value ? otherControl.enable() : otherControl.disable();
      } else if (
        !isNullish(value)
      ) {
        otherControl.enable();
      } else {
        otherControl.disable();
      }
    });
};
