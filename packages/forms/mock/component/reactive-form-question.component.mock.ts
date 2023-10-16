import { Component } from '@angular/core';
import {
  AbstractReactiveFormQuestionComponent,
  DynamicFormService,
} from '../../src';
import { mockDynamicFormService } from './dynamic-form.service.mock';

@Component({
  selector: 'plume-mock-reactive-form-question',
  template: '<span>test</span>',
  standalone: true,
  providers: [
    {
      provide: DynamicFormService,
      useValue: mockDynamicFormService,
    },
  ],
})
export class MockReactiveFormQuestionComponent extends AbstractReactiveFormQuestionComponent<
  string,
  string
> {}
