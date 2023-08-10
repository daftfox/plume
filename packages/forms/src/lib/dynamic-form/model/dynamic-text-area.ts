import { DynamicText } from './dynamic-text-input';
import { DynamicTextAreaOptions } from './options';

export class DynamicTextArea extends DynamicText<string> {
  rows: number;

  constructor(options: DynamicTextAreaOptions) {
    super(options);

    this.rows = options.rows || 10;

    if ( this.value === undefined ) {
      this.value = '';
    }
  }
}
