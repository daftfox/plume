import { AbstractFormQuestionComponent } from '../component/abstract-form-question/abstract-form-question.component';
import { DynamicFormElementValueType } from '../model';

export const allowOneOfLinkedQuestions = (scope: AbstractFormQuestionComponent, value?: DynamicFormElementValueType) => {
  scope.linkedElements
    .filter(({ key }) => key !== scope.key)
    .forEach(({ key }) => {
      if (!scope.form) return;

      const otherControl = scope.form.get(key);

      if (!otherControl) return;

      if (value && otherControl.value) {
        if (Array.isArray(value) && value.length > 0 && Array.isArray(otherControl.value) && otherControl.value.length > 0) {
          otherControl.setValue([]);
        }
        // todo check for other value types (string, number, etc.)
      }
    });
};
