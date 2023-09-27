import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

/**
 * Component to easily display errors for a given form control.
 *
 */
@Component({
  selector: 'plume-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
  standalone: true,
  imports: [ NgFor, NgIf ],
})
export class FormErrorsComponent {
  /**
   * The FormControl to display errors for.
   */
  @Input() control?: FormControl = undefined;
  @Input() validationMessages?: Map<string, string>;

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
   * Wild card character '{n}' will be replaced with the ValidationErrors value for the given key.
   */
  @Input() messages: any = {};

  errorMessage?: string = null;

  // constructor(private formErrorService: FormErrorService) {}

  /**
   * Array of error messages for the given control
   */
  get errorMessages(): string[] {
    const messages: string[] = [];

    if ( !this.control ) return [];

    for (const propertyName in this.control.errors) {
      messages.push(
        this.formatValidationMessage( this.validationMessages.get(propertyName), this.control.errors[propertyName])
      );
    }
    return messages;
  }

  formatValidationMessage( message: string, values: any ): string {
    let params: string[];
    if ( Array.isArray( values ) ) {
      params = values;
    } else if ( typeof values === 'object' ) {
      params = Object.values(values);
    } else {
      params = [values];
    }

    return message.replace(/{(\d+)}/g, ( match, index ) => {
      return params[index] !== null ? params[ index ] : match;
    });
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
