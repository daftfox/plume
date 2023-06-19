import { Component, Input } from '@angular/core';

@Component({
  selector: 'slf-form-hint',
  templateUrl: './form-hint.component.html',
})
export class FormHintComponent {
  @Input() hint: string;
  @Input() heading: string;
}
