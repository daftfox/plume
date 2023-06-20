import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicFormModule, TextboxFormQuestion } from '@slodder/forms';
import { AbstractDemoComponent } from '../abstract-demo/abstract-demo.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'demo-textbox',
  imports: [CommonModule, DynamicFormModule],
  templateUrl: '../abstract-demo/abstract-demo.component.html'
})
export class TextboxDemoComponent extends AbstractDemoComponent {
  public override title = 'Textbox';
  public override questions = [
    new TextboxFormQuestion<string>({
      key: 'defaultTextbox',
      label: 'Default textbox',
      placeholder: 'Enter text',
    }),
    new TextboxFormQuestion<number>({
      key: 'numberTextbox',
      label: 'Number textbox',
      placeholder: 'Enter a number',
      type: 'number',
    }),
    new TextboxFormQuestion<string>({
      key: 'passwordTextBox',
      label: 'Password textbox',
      placeholder: 'Enter password',
      type: 'password',
    }),
    new TextboxFormQuestion<string>({
      key: 'disabledTextBox',
      label: 'Disabled textbox',
      disabled: true,
    }),
    new TextboxFormQuestion<string>({
      key: 'iconTextbox',
      label: 'Icon textbox',
      placeholder: 'I have an icon :)',
      icon: 'search',
    }),
    new TextboxFormQuestion<string>({
      key: 'requiredTextbox',
      label: 'Required textbox',
      placeholder: 'Enter text',
      validators: [Validators.required]
    }),
    new TextboxFormQuestion<string>({
      key: 'maxLengthTextbox',
      label: 'Max length textbox',
      placeholder: 'Enter text',
      maxLength: 25,
    }),
  ];
}
