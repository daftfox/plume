import { Component } from '@angular/core';
import { IFormOutputComponent } from '../../src/lib/dynamic-form/model/component/form-output.component.interface';

@Component({
  selector: 'plume-mock-form-output',
  template: '<span>mock</span>',
  standalone: true,
})
export class MockFormOutputComponent implements IFormOutputComponent {
  key: string;
}
