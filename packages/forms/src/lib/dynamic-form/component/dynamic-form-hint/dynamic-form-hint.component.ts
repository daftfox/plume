import { Component, Input } from '@angular/core';
import { IFormOutputComponent } from '../../model';
import { NgIf } from '@angular/common';

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
