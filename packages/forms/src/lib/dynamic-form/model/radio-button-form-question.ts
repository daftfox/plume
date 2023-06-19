import { AbstractFormQuestion, FormQuestionOptions } from './abstract-form-question';
import { SelectOption } from './select-option.interface';

export interface RadioButtonFormQuestionOptions<T = string | number | boolean> extends FormQuestionOptions<T> {
  options: SelectOption<T>[];
}

export class RadioButtonFormQuestion extends AbstractFormQuestion<string> {
  options: SelectOption<string>[];

  constructor(options: RadioButtonFormQuestionOptions<string>) {
    super(options);

    this.options = options.options;
  }
}
