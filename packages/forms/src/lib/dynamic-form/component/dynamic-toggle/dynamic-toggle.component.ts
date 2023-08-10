import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component } from '@angular/core';

@Component({
  selector: 'slf-toggle-form-question',
  templateUrl: './dynamic-toggle.component.html',
  styleUrls: ['../abstract-form-question/abstract-form-question.component.scss'],
})
export class DynamicToggleComponent extends AbstractFormQuestionComponent<boolean> {}
