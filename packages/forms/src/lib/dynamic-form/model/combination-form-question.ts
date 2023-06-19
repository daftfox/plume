import { FormGroupQuestion, FormGroupQuestionOptions } from './form-group-question';

export interface CombinationQuestionOptions extends FormGroupQuestionOptions {
  separators?: string[];
}

export class CombinationFormQuestion extends FormGroupQuestion {
  separators: string[];

  constructor(options: CombinationQuestionOptions) {
    super(options);

    this.separators = options.separators || [];
  }
}
