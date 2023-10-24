import { Component } from '@angular/core';
import { DynamicFormService } from '../../src/lib/dynamic-form/service/dynamic-form.service';
import { AbstractReactiveFormQuestionComponent } from '../../src/lib/dynamic-form/component/abstract-reactive-form-question/abstract-reactive-form-question.component';

@Component({
  selector: 'plume-mock-reactive-form-question',
  template: '<span>test</span>',
  standalone: true,
})
export class MockReactiveFormQuestionComponent extends AbstractReactiveFormQuestionComponent<
  string,
  string
> {
  constructor(protected override service: DynamicFormService) {
    super(service);
  }
}
