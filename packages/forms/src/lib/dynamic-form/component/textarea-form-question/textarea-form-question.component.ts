import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'slf-textarea-form-question',
  templateUrl: './textarea-form-question.component.html',
  styleUrls: ['../abstract-form-question/abstract-form-question.component.scss'],
})
export class TextareaFormQuestionComponent extends AbstractFormQuestionComponent<string> {
  @Input() rows: number;
  @Input() maxLength: number;
}
