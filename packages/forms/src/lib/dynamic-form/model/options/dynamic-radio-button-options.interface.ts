import { DynamicFormQuestionOptions } from './dynamic-form-question-options.interface';
import { SelectOption } from '../select-option.interface';

export interface DynamicRadioButtonOptions<T = string | number | boolean> extends DynamicFormQuestionOptions<T> {
  options: SelectOption<T>[];
}
