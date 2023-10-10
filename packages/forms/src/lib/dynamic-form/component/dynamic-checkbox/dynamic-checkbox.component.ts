import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { FormErrorsComponent } from '../form-errors/form-errors.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'plume-checkbox-form-question',
  templateUrl: './dynamic-checkbox.component.html',
  styleUrls: ['../abstract-form-question/abstract-form-question.component.scss', './dynamic-checkbox.component.scss'],
  standalone: true,
  imports: [
    FlexLayoutModule,
    FormErrorsComponent,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
  ]
})
export class DynamicCheckboxComponent extends AbstractFormQuestionComponent<boolean> {
  isRequired(): boolean {
    return this.control.hasValidator(Validators.requiredTrue);
  }
}
