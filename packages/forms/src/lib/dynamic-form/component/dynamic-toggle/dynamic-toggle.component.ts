import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component } from '@angular/core';
import { DynamicFormService } from '../../service/dynamic-form.service';

@Component({
  selector: 'plume-toggle-form-question',
  templateUrl: './dynamic-toggle.component.html',
  styleUrls: [
    '../abstract-form-question/abstract-form-question.component.scss',
  ],
})
export class DynamicToggleComponent extends AbstractFormQuestionComponent<boolean> {
  constructor(protected override service: DynamicFormService) {
    super(service);
  }
}
