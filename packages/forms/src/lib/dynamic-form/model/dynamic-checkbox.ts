import { AbstractFormQuestion } from './abstract-form-question';
import { DynamicFormQuestionOptions } from './options';

export class DynamicCheckbox extends AbstractFormQuestion<boolean> {
  constructor( options: DynamicFormQuestionOptions<boolean> ) {
    super( options );

    if ( this.value === undefined ) {
      this.value = false;
    }
  }
}
