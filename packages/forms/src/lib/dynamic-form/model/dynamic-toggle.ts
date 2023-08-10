import { AbstractFormQuestion } from './abstract-form-question';
import { DynamicFormQuestionOptions } from './options';

export class DynamicToggle extends AbstractFormQuestion<boolean> {
  constructor(options: DynamicFormQuestionOptions<boolean>) {
    super( options );

    if ( this.value === undefined ) {
      this.value = false;
    }
  }
}
