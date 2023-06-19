import { TextFormQuestion, TextFormQuestionOptions } from './textbox-form-question';

export type TextAreaHint = 'emailPlaceholders';

export interface TextAreaFormQuestionOptions extends TextFormQuestionOptions<string> {
  hint?: TextAreaHint;
  rows?: number;
}

export class TextareaFormQuestion extends TextFormQuestion<string> {
  rows: number;
  hint?: TextAreaHint;

  constructor(options: TextAreaFormQuestionOptions) {
    super(options);

    this.hint = options.hint;
    this.rows = options.rows || 10;
  }
}
