import { AbstractFormQuestion } from './abstract-form-question';
import { SelectOption } from './select-option.interface';
import { DynamicRadioButtonOptions } from './options';
import { DynamicRadioButtonComponent } from '../component/dynamic-radio-button/dynamic-radio-button.component';

export class DynamicRadioButton extends AbstractFormQuestion<string> {
  component = DynamicRadioButtonComponent;
  options: SelectOption<string>[];

  constructor(options: DynamicRadioButtonOptions<string>) {
    super(options);

    this.options = options.options;
  }
}
