import { Component, Input } from '@angular/core';
import { AbstractFormGroupComponent } from '../abstract-form-group/abstract-form-group.component';

@Component({
  selector: 'slf-combination-form-question',
  templateUrl: './combination-form-question.component.html',
  styleUrls: ['../abstract-form-question/abstract-form-question.component.scss'],
})
export class CombinationFormQuestionComponent extends AbstractFormGroupComponent {
  @Input() separators: string[] = [];

  get controlWidth(): number {
    return (100 - this.separators.length * 15) / this.questions.length;
  }
}
