import { Component, Input } from '@angular/core';
import { IFormOutputComponent } from '../../model';

@Component({
  selector: 'plume-form-hint',
  templateUrl: './dynamic-form-hint.component.html',
})
export class DynamicFormHintComponent implements IFormOutputComponent {
  @Input() key: string;
  @Input() hint: string;
  @Input() heading: string;
}
