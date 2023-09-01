import { SPACER } from './spacer.enum';
import { DynamicFormHintOptions } from './options';
import { IFormStatic } from './form-static.interface';

export class DynamicFormHint implements IFormStatic {
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
