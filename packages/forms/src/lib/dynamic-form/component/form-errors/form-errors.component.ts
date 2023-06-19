import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

// import { ValidationErrorMessages, ValidationService } from '../../../../service/validation/validation.service';

/**
 * Component to easily display errors for a given form control.
 *
 * Validation messages are stored centrally in ValidationService.
 *
 * See https://coryrylan.com/blog/angular-form-builder-and-validation-management for the inspiration.
 */

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'slf-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
})
export class FormErrorsComponent {
  /**
   * The FormControl to display errors for.
   */
  @Input() control?: FormControl = undefined;

  /**
   * If set false (default), will concatenate errors into a single line joined by commas. Useful for
   * Fields in a Material form, where error messages should fit on one line.
   *
   * If set true, will show one error per line, Useful for things like CSV uploads, where the API
   * could return a very large number of error messages.
   */
  @Input() showOneErrorPerLine = false;

  /**
   * Allows overriding the displayed error messages for specific fields in a form.
   *
   * Keys in this object match keys in the attached FormControl's ValidationErrors object. Values
   * are the displayed message to use.  Messages will fall back to the defaults if not specified.
   *
   * Wild card character '%' will be replaced with the ValidationErrors value for the given key.
   */
  @Input() messages: any = {};
  // @Input() messages: ValidationErrorMessages = {};

  errorMessage?: string = undefined;

  // constructor(private validationService: ValidationService) {}

  /**
   * Array of error messages for the given control
   */
  get errorMessages(): string[] {
    const messages: string[] = [];

    if ( !this.control ) return [];

    for (const propertyName in this.control.errors) {
      if (Object.prototype.hasOwnProperty.call(this.control.errors, propertyName)) {
        // let errors: string | string[] = this.control.errors[propertyName];
        // if (!(errors instanceof Array)) {
        //   errors = [errors];
        // }
        // for (let i = 0, ii = errors.length; i < ii; i++) {
        //   messages.push(this.validationService.getValidatorErrorMessage(propertyName, errors[i], this.messages));
        // }
      }
    }
    return messages;
  }

  /**
   * Single line formatted errors, suitable for outputting as a Material form field error line.
   *
   * Material recommends keeping all error messages to a single line.
   */
  get formattedErrors(): string {
    const formattedMessages: string[] = [];
    this.errorMessages.forEach((message: string, index: number) => {
      if (index !== 0 && message !== '' && (message.length < 2 || message.charAt(1) !== message.charAt(1).toUpperCase())) {
        // lowercase the first character, leave the first message as-is
        message = message.charAt(0).toLowerCase() + message.substr(1);
      }
      if (!message) {
        return;
      }
      formattedMessages.push(message);
    });
    return formattedMessages.join(', ');
  }
}
