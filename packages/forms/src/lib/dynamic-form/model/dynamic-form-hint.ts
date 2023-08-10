import { SPACER } from './spacer.enum';
import { DynamicFormHintOptions } from './options';

export class DynamicFormHint {
  hint?: string;
  heading?: string;
  spacer?: SPACER;

  constructor(options: DynamicFormHintOptions) {
    this.hint = options.hint;
    this.heading = options.heading;
    this.spacer = options.spacer;
  }
}
