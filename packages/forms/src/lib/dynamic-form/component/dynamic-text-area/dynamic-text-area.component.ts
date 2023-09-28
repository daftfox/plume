import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'plume-textarea-form-question',
  templateUrl: './dynamic-text-area.component.html',
  styleUrls: ['../abstract-form-question/abstract-form-question.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DynamicTextAreaComponent extends AbstractFormQuestionComponent<string> {
  @Input() rows: number;
  @Input() maxLength: number;

  constructor() {
    super();

    this.defaultValidationMessages.set('maxlength', 'Maximum length is {0}, but current input length is {1}');
    this.defaultValidationMessages.set('minlength', 'Minimum length is {0}, but current input length is {1}');
  }
}
