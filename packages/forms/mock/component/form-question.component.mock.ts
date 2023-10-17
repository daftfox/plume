import { Component } from '@angular/core';
import { DynamicFormService } from '../../src/lib/dynamic-form/service/dynamic-form.service';
import { AbstractFormQuestionComponent } from '../../src/lib/dynamic-form/component/abstract-form-question/abstract-form-question.component';

@Component({
  selector: 'plume-mock-form-question-component',
  template: '<span>test</span>',
  standalone: true,
  providers: [
    {
      provide: DynamicFormService,
      useValue: {},
    },
  ],
})
export class MockFormQuestionComponent extends AbstractFormQuestionComponent {
  constructor(protected override service: DynamicFormService) {
    super(service);
  }
}
