import { SPACER } from './spacer.enum';

export interface FormHintOptions {
  hint: string;
  heading?: string;
  spacer?: SPACER;
}

export class FormHint {
  hint: string;
  heading?: string;
  spacer?: SPACER;

  constructor(options: FormHintOptions) {
    this.hint = options.hint;
    this.heading = options.heading;
    this.spacer = options.spacer;
  }
}
