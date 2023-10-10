import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component, Input } from '@angular/core';
import { SelectOption } from '../../model';

@Component({
  selector: 'plume-radio-button-form-question',
  templateUrl: './dynamic-radio-button.component.html',
  styleUrls: [
    '../abstract-form-question/abstract-form-question.component.scss',
    './dynamic-radio-button.component.scss',
  ],
})
export class DynamicRadioButtonComponent extends AbstractFormQuestionComponent<string> {
  @Input() options: SelectOption<string>[] = [];
}
