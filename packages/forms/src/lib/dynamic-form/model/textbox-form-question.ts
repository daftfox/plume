import { AbstractFormQuestion, FormQuestionOptions } from './abstract-form-question';
import { Validators } from '@angular/forms';

export type TextBoxType = 'string' | 'number' | 'email' | 'password' | 'tel' | 'url';

export interface TextFormQuestionOptions<T = string | number> extends FormQuestionOptions<T> {
  maxLength?: number;
}

export interface TextboxFormQuestionOptions<T = string | number> extends TextFormQuestionOptions<T> {
  icon?: string;
  type?: TextBoxType;
}

export abstract class TextFormQuestion<T = string | number> extends AbstractFormQuestion<T> {
  maxLength?: number;

  protected constructor(options: TextFormQuestionOptions<T>) {
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

export class TextboxFormQuestion<T = string | number> extends TextFormQuestion<T> {
  type: TextBoxType;
  icon?: string;

  constructor(options: TextboxFormQuestionOptions<T>) {
    super(options);

    this.type = options.type || 'string';
    this.icon = options.icon;
  }
}
