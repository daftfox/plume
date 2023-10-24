import { Component } from '@angular/core';
import { IFormActionComponent } from '../../src/lib/dynamic-form/model/component/form-action.component.interface';

@Component({
  selector: 'plume-mock-form-action-element',
  template: '<button>mock</button>',
  standalone: true,
})
export class MockFormActionComponent implements IFormActionComponent {
  key: string;
  action(_args?: unknown): void {}
}
