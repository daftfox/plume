import { AbstractFormQuestionComponent } from '../component/abstract-form-question/abstract-form-question.component';
import { FormQuestionValueType } from '../model';

export const toggleOtherControlDisabled = (scope: AbstractFormQuestionComponent, value?: FormQuestionValueType) => {
  scope.linkedQuestions
    .filter(({ key }) => key !== scope.key)
    .forEach(({ key }) => {
      if (!scope.form) return;

      const otherControl = scope.form.get(key);

      if (!otherControl) return;
      if (value) {
        otherControl.enable();
      } else {
        otherControl.disable();
      }
    });
};
