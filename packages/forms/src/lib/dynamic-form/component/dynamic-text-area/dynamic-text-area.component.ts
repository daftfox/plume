import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DynamicFormService } from '../../service/dynamic-form.service';
import { FormErrorsComponent } from '../form-errors/form-errors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'plume-textarea-form-question',
  templateUrl: './dynamic-text-area.component.html',
  styleUrls: [
    '../abstract-form-question/abstract-form-question.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    FormErrorsComponent,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class DynamicTextAreaComponent extends AbstractFormQuestionComponent<string> {
  @Input() rows: number;
  @Input() maxLength: number;

  constructor(protected override service: DynamicFormService) {
    super(service);

    this.defaultValidationMessages.set(
      'maxlength',
      'Maximum length is {0}, but current input length is {1}',
    );
    this.defaultValidationMessages.set(
      'minlength',
      'Minimum length is {0}, but current input length is {1}',
    );
  }
}
