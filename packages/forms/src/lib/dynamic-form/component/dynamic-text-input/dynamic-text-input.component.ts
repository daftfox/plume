import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicFormService } from '../../service/dynamic-form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormErrorsComponent } from '../form-errors/form-errors.component';
import { NgIf } from '@angular/common';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { MatInputModule } from '@angular/material/input';
import { TextBoxType } from '../../model/options/dynamic-text-input-options.interface';

@Component({
  selector: 'plume-text-input-form-question',
  templateUrl: './dynamic-text-input.component.html',
  styleUrls: [
    '../abstract-form-question/abstract-form-question.component.scss',
    './dynamic-text-input.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [
    FormErrorsComponent,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    NgIf,
    ReactiveFormsModule,
    NgxTrimDirectiveModule,
    MatInputModule,
  ],
  standalone: true,
})
export class DynamicTextInputComponent
  extends AbstractFormQuestionComponent<string>
  implements OnInit
{
  @Input() type: TextBoxType = 'text';
  @Input() icon: string;
  @Input() maxLength: number;

  passwordVisible = false;

  constructor(protected override service: DynamicFormService) {
    super(service);

    this.defaultValidationMessages.set(
      'maxlength',
      'The maximum length is {0}, but you entered {1} characters',
    );
    this.defaultValidationMessages.set(
      'minlength',
      'The minimum length is {0}, but you entered {1} characters',
    );
  }

  override ngOnInit() {
    super.ngOnInit();

    if (this.maxLength) {
      this.control.addValidators([Validators.maxLength(this.maxLength)]);
    }
  }

  toggleDisplayPassword() {
    this.passwordVisible = !this.passwordVisible;
  }
}
