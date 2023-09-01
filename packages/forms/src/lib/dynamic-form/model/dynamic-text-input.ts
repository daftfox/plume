import { AbstractFormQuestion } from './abstract-form-question';
import { Validators } from '@angular/forms';
import { DynamicTextInputOptions, TextBoxType, DynamicTextOptions } from './options';
import { DynamicTextInputComponent } from '../component/dynamic-text-input/dynamic-text-input.component';

export abstract class DynamicText<T = string | number> extends AbstractFormQuestion<T> {
  maxLength?: number;

  protected constructor(options: DynamicTextOptions<T>) {
    super(options);

    this.maxLength = options.maxLength;

    if (this.maxLength) {
      if (Array.isArray(this.validators)) {
        this.validators.push(Validators.maxLength(this.maxLength));
      } else if (typeof this.validators === 'function') {
        this.validators = [this.validators, Validators.maxLength(this.maxLength)];
      }
    }
  }
}

export class DynamicTextInput extends DynamicText<string> {
  component = DynamicTextInputComponent;
  type: TextBoxType;
  icon?: string;

  constructor(options: DynamicTextInputOptions<string>) {
    super(options);

    this.type = options.type || 'text';
    this.icon = options.icon;

    if ( this.value === undefined ) {
      this.value = '';
    }
  }
}
