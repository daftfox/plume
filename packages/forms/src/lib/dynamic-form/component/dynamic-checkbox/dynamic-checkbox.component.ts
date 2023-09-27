import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component } from '@angular/core';

@Component({
  selector: 'plume-checkbox-form-question',
  templateUrl: './dynamic-checkbox.component.html',
  styleUrls: ['../abstract-form-question/abstract-form-question.component.scss', './dynamic-checkbox.component.scss'],
})
export class DynamicCheckboxComponent extends AbstractFormQuestionComponent<boolean> {}
