import { AbstractFormQuestion } from './abstract-form-question';
import { DynamicFormQuestionOptions } from '../options';
import { DynamicToggleComponent } from '../../component/dynamic-toggle/dynamic-toggle.component';

export class DynamicToggle extends AbstractFormQuestion<boolean> {
  component = DynamicToggleComponent;
  constructor(options: DynamicFormQuestionOptions<boolean>) {
    super(options);

    if (this.value === null) {
      this.value = false;
    }
  }
}
