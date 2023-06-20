import { Component } from '@angular/core';
import { DynamicFormModule, DynamicFormQuestion, GenericFormValues } from '@slodder/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  templateUrl: './abstract-demo.component.html',
  imports: [CommonModule, DynamicFormModule],
})
export abstract class AbstractDemoComponent {
  public title = '';
  public questions: DynamicFormQuestion[] = [];
  public formValues: GenericFormValues = {};
  public formValuesChanged( formValues: GenericFormValues ) {
    this.formValues = formValues;
  }
}
