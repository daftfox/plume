import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component } from '@angular/core';
import { DynamicFormService } from '../../service/dynamic-form.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'plume-toggle-form-question',
  templateUrl: './dynamic-toggle.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatSlideToggleModule],
  styleUrls: [
    '../abstract-form-question/abstract-form-question.component.scss',
  ],
})
export class DynamicToggleComponent extends AbstractFormQuestionComponent<boolean> {
  constructor(protected override service: DynamicFormService) {
    super(service);
  }
}
