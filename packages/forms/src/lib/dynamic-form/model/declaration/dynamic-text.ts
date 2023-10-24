import { Validators } from '@angular/forms';
import { AbstractFormQuestion } from './abstract-form-question';
import { DynamicTextOptions } from '../options';

export abstract class DynamicText<
  T = string | number,
> extends AbstractFormQuestion<T> {
  maxLength?: number;

  protected constructor(options: DynamicTextOptions<T>) {
    super(options);
    this.inputKeys.push('maxLength');

    this.maxLength = options.maxLength;

    if (this.maxLength) {
      if (Array.isArray(this.validators)) {
        this.validators.push(Validators.maxLength(this.maxLength));
      } else if (typeof this.validators === 'function') {
        this.validators = [
          this.validators,
          Validators.maxLength(this.maxLength),
        ];
      }
    }
  }
}
