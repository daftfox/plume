import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TextBoxType } from '../../model/options';
import { Validators } from '@angular/forms';

@Component({
  selector: 'slf-textbox-form-question',
  templateUrl: './dynamic-text-input.component.html',
  styleUrls: [
    '../abstract-form-question/abstract-form-question.component.scss',
    './dynamic-text-input.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicTextInputComponent extends AbstractFormQuestionComponent<string> implements OnInit {
  @Input() type: TextBoxType = 'text';
  @Input() icon: string;
  @Input() maxLength: number;

  passwordVisible = false;

  constructor() {
    super();

    this.validationMessages.set('maxlength', 'Maximum length is {0}, but current input length is {1}');
    this.validationMessages.set('minlength', 'Minimum length is {0}, but current input length is {1}');
  }

  override ngOnInit() {
    super.ngOnInit();

    if ( this.maxLength ) {
      this.control.addValidators([Validators.maxLength(this.maxLength)])
    }
  }

  toggleDisplayPassword() {
    this.passwordVisible = !this.passwordVisible;
  }
}
