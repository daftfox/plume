import { AbstractFormQuestion } from './abstract-form-question';
import { DynamicFormQuestionOptions } from './options';
import { DynamicCheckboxComponent } from '../component/dynamic-checkbox/dynamic-checkbox.component';

export class DynamicCheckbox extends AbstractFormQuestion<boolean> {
  component = DynamicCheckboxComponent;
  constructor( options: DynamicFormQuestionOptions<boolean> ) {
    super( options );

    if ( this.value === undefined ) {
      this.value = false;
    }
  }
}
