import { AbstractFormQuestion } from './abstract-form-question';
import { SelectOption } from './select-option.interface';
import { DynamicRadioButtonOptions } from './options';

export class DynamicRadioButton extends AbstractFormQuestion<string> {
  options: SelectOption<string>[];

  constructor(options: DynamicRadioButtonOptions<string>) {
    super(options);

    this.options = options.options;
  }
}
