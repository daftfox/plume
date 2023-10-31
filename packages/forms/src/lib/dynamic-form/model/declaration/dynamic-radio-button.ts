import { AbstractFormQuestion } from './abstract-form-question';
import { SelectOption } from '../select-option.interface';
import { DynamicRadioButtonComponent } from '../../component/dynamic-radio-button/dynamic-radio-button.component';
import { DynamicRadioButtonOptions } from '../options/dynamic-radio-button-options.interface';

export class DynamicRadioButton extends AbstractFormQuestion<string> {
  component = DynamicRadioButtonComponent;
  options: SelectOption<string>[];

  constructor(options: DynamicRadioButtonOptions<string>) {
    super(options);
    this.inputKeys.push('options');

    this.options = options.options;
  }
}
