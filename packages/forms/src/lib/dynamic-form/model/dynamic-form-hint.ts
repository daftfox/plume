import { SPACER } from './spacer.enum';
import { DynamicFormHintOptions } from './options';
import { IFormOutput } from './form-output.interface';

export class DynamicFormHint implements IFormOutput {
  key: string;
  hint?: string;
  heading?: string;
  spacer?: SPACER;

  constructor(options: DynamicFormHintOptions) {
    this.key = options.key;
    this.hint = options.hint;
    this.heading = options.heading;
    this.spacer = options.spacer;
  }
}
