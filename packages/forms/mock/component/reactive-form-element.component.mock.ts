import { Component } from '@angular/core';
import { AbstractReactiveFormElementComponent } from '../../src/lib/dynamic-form/component/abstract-reactive-form-element/abstract-reactive-form-element.component';

@Component({
  selector: 'plume-mock-reactive-form-element',
  template: '<span>test</span>',
  standalone: true,
})
export class MockReactiveFormElementComponent extends AbstractReactiveFormElementComponent<string> {}
