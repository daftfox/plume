import { FormQuestion } from '../service/dynamic-form.service';
import { SPACER } from './spacer.enum';

export interface FormGroupQuestionOptions {
  key: string;
  questions: FormQuestion[];
  label?: string;
  disabled?: boolean;
  spacer?: SPACER;
}

export class FormGroupQuestion {
  key: string;
  questions: FormQuestion[];
  disabled = false;
  label?: string;
  spacer?: SPACER;

  constructor(options: FormGroupQuestionOptions) {
    this.key = options.key;
    this.questions = options.questions;

    this.label = options.label;
    this.disabled = options.disabled !== undefined && options.disabled;
    this.spacer = options.spacer;
  }
}
