import { SPACER } from './spacer.enum';

export interface FormHintOptions {
  hint: string;
  key: string;
  heading?: string;
  spacer?: SPACER;
}

export class FormHint {
  hint: string;
  heading?: string;
  key: string;
  spacer?: SPACER;

  constructor(options: FormHintOptions) {
    this.hint = options.hint;
    this.heading = options.heading;
    this.key = options.key;
    this.spacer = options.spacer;
  }
}
