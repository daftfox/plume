import { AbstractFormQuestion } from './abstract-form-question';
import { DynamicCheckboxComponent } from '../../component/dynamic-checkbox/dynamic-checkbox.component';
import { DynamicFormQuestionOptions } from '../options/dynamic-form-question-options.interface';

export class DynamicCheckbox extends AbstractFormQuestion<boolean> {
  component = DynamicCheckboxComponent;
  constructor(options: DynamicFormQuestionOptions<boolean>) {
    super(options);

    if (this.value === null) {
      this.value = false;
    }
  }
}
