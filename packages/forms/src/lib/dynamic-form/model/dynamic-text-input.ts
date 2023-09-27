import { DynamicTextInputOptions, TextBoxType } from './options';
import { DynamicTextInputComponent } from '../component/dynamic-text-input/dynamic-text-input.component';
import { DynamicText } from './dynamic-text';

export class DynamicTextInput extends DynamicText<string> {
  component = DynamicTextInputComponent;
  type: TextBoxType;
  icon?: string;

  constructor(options: DynamicTextInputOptions<string>) {
    super(options);

    this.type = options.type || 'text';
    this.icon = options.icon;

    if ( this.value === null ) {
      this.value = '';
    }
  }
}
