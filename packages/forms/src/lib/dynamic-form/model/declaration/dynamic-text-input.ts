import { DynamicText } from './dynamic-text';
import { DynamicTextInputComponent } from '../../component/dynamic-text-input/dynamic-text-input.component';
import {
  DynamicTextInputOptions,
  TextBoxType,
} from '../options/dynamic-text-input-options.interface';

export class DynamicTextInput extends DynamicText<string> {
  component = DynamicTextInputComponent;
  type: TextBoxType;
  icon?: string;

  constructor(options: DynamicTextInputOptions<string>) {
    super(options);
    this.inputKeys.push('type', 'icon');

    this.type = options.type || 'text';
    this.icon = options.icon;

    if (this.value === null) {
      this.value = '';
    }
  }
}
