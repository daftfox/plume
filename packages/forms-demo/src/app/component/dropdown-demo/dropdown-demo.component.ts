import { Component } from '@angular/core';
import { CheckboxFormQuestion, DynamicFormModule } from '@slodder/forms';
import { AbstractDemoComponent } from '../abstract-demo/abstract-demo.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'demo-checkbox',
  imports: [CommonModule, DynamicFormModule],
  templateUrl: '../abstract-demo/abstract-demo.component.html',
})
export class DropdownDemoComponent extends AbstractDemoComponent {
  public override title = 'Checkbox';
  public override questions = [
    new CheckboxFormQuestion({
      key: 'defaultCheckbox',
      label: 'Default textbox',
    }),
    new CheckboxFormQuestion({
      key: 'disabledCheckbox',
      label: 'Disabled textbox',
      disabled: true
    }),
  ];
}
