import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component } from '@angular/core';

@Component({
  selector: 'slf-checkbox-form-question',
  templateUrl: './checkbox-form-question.component.html',
  styleUrls: ['../abstract-form-question/abstract-form-question.component.scss', './checkbox-form-question.component.scss'],
})
export class CheckboxFormQuestionComponent extends AbstractFormQuestionComponent<boolean> {}
