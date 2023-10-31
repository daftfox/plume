import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { IFormOutputComponent } from '../../model/component/form-output.component.interface';

@Component({
  selector: 'plume-form-hint',
  templateUrl: './dynamic-form-hint.component.html',
  standalone: true,
  imports: [NgIf],
})
export class DynamicFormHintComponent implements IFormOutputComponent {
  @Input() key: string;
  @Input() hint: string;
  @Input() heading: string;
}
