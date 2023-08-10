import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'slf-textarea-form-question',
  templateUrl: './dynamic-text-area.component.html',
  styleUrls: ['../abstract-form-question/abstract-form-question.component.scss'],
})
export class DynamicTextAreaComponent extends AbstractFormQuestionComponent<string> {
  @Input() rows: number;
  @Input() maxLength: number;
}
