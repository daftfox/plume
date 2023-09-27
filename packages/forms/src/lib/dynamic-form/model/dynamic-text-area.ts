import { DynamicTextAreaOptions } from './options';
import { DynamicTextAreaComponent } from '../component/dynamic-text-area/dynamic-text-area.component';
import { DynamicText } from './dynamic-text';

export class DynamicTextArea extends DynamicText<string> {
  component = DynamicTextAreaComponent;
  rows: number;

  constructor(options: DynamicTextAreaOptions) {
    super(options);

    this.rows = options.rows || 10;

    if ( this.value === null ) {
      this.value = '';
    }
  }
}
