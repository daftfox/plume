import { Component } from '@angular/core';
import { AbstractFormQuestionComponent, DynamicFormService } from '../../src';
import { mockDynamicFormService } from './dynamic-form.service.mock';

@Component({
  selector: 'plume-mock-form-question-component',
  template: '<span>test</span>',
  standalone: true,
  providers: [
    {
      provide: DynamicFormService,
      useValue: mockDynamicFormService,
    },
  ],
})
export class MockFormQuestionComponent extends AbstractFormQuestionComponent {}
