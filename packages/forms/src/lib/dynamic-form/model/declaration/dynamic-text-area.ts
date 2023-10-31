import { DynamicText } from './dynamic-text';
import { DynamicTextAreaComponent } from '../../component/dynamic-text-area/dynamic-text-area.component';
import { DynamicTextAreaOptions } from '../options/dynamic-text-area-options.interface';

export class DynamicTextArea extends DynamicText<string> {
  component = DynamicTextAreaComponent;
  rows: number;

  constructor(options: DynamicTextAreaOptions) {
    super(options);
    this.inputKeys.push('rows');

    this.rows = options.rows || 10;

    if (this.value === null) {
      this.value = '';
    }
  }
}
