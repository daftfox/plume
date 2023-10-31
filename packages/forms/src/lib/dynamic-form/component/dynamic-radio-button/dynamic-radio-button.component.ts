import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component, Input } from '@angular/core';
import { DynamicFormService } from '../../service/dynamic-form.service';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { SelectOption } from '../../model/select-option.interface';

@Component({
  selector: 'plume-radio-button-form-question',
  templateUrl: './dynamic-radio-button.component.html',
  styleUrls: [
    '../abstract-form-question/abstract-form-question.component.scss',
    './dynamic-radio-button.component.scss',
  ],
  standalone: true,
  imports: [FormsModule, MatRadioModule, NgForOf, ReactiveFormsModule],
})
export class DynamicRadioButtonComponent extends AbstractFormQuestionComponent<string> {
  @Input() options: SelectOption<string>[] = [];

  constructor(protected override service: DynamicFormService) {
    super(service);
  }
}
