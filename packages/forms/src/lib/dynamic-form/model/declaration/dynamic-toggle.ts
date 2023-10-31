import { AbstractFormQuestion } from './abstract-form-question';
import { DynamicToggleComponent } from '../../component/dynamic-toggle/dynamic-toggle.component';
import { DynamicFormQuestionOptions } from '../options/dynamic-form-question-options.interface';

export class DynamicToggle extends AbstractFormQuestion<boolean> {
  component = DynamicToggleComponent;
  constructor(options: DynamicFormQuestionOptions<boolean>) {
    super(options);

    if (this.value === null) {
      this.value = false;
    }
  }
}
