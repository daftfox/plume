import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component, Input, OnInit } from '@angular/core';
import { TextBoxType } from '../../model';
import { Validators } from '@angular/forms';

@Component({
  selector: 'slf-textbox-form-question',
  templateUrl: './textbox-form-question.component.html',
  styleUrls: [
    '../abstract-form-question/abstract-form-question.component.scss',
    './textbox-form-question.component.scss'
  ],
})
export class TextboxFormQuestionComponent extends AbstractFormQuestionComponent<string | number> implements OnInit {
  @Input() type: TextBoxType = 'string';
  @Input() icon: string;
  @Input() maxLength: number;

  override ngOnInit() {
    super.ngOnInit();

    if ( this.maxLength ) {
      this.control.addValidators([Validators.maxLength(this.maxLength)])
    }
  }
}
