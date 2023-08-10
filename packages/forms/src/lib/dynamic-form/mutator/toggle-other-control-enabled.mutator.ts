import { AbstractFormQuestionComponent } from '../component/abstract-form-question/abstract-form-question.component';
import { DynamicFormElementValueType } from '../model';
import {isNullish} from "@slodder/utils";

export const toggleOtherControlEnabled = (scope: AbstractFormQuestionComponent, value?: DynamicFormElementValueType) => {
  scope.linkedElements
    .filter(({ key }) => key !== scope.key)
    .forEach(({ key }) => {
      if (!scope.form) return;

      const otherControl = scope.form.get(key);

      if (!otherControl) return;

      if (!isNullish(value)) {
        otherControl.disable();
      } else {
        otherControl.enable();
      }
    });
};
