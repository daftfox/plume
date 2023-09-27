import { Component, Input } from '@angular/core';

@Component({
  selector: 'plume-form-hint',
  templateUrl: './dynamic-form-hint.component.html',
})
export class DynamicFormHintComponent {
  @Input() hint: string;
  @Input() heading: string;
}
