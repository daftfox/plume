import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component, Input } from '@angular/core';
import { SelectOption } from '../../model';

@Component({
  selector: 'slf-radio-button-form-question',
  templateUrl: './radio-button-form-question.component.html',
  styleUrls: ['../abstract-form-question/abstract-form-question.component.scss', './radio-button-form-question.component.scss'],
})
export class RadioButtonFormQuestionComponent extends AbstractFormQuestionComponent<string> {
  @Input() options: SelectOption<string>[] = [];
}
