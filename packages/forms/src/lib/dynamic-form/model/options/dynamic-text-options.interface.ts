import { DynamicFormQuestionOptions } from './dynamic-form-question-options.interface';

export interface DynamicTextOptions<T = string | number> extends DynamicFormQuestionOptions<T> {
  maxLength?: number;
}
