import { DynamicFormButtonOptions, IFormAction } from '../';
import { ThemePalette } from '@angular/material/core';
import { DynamicButtonComponent } from '../../component/dynamic-button/dynamic-button.component';

export class DynamicButton implements IFormAction {
  key: string;
  label?: string;
  icon?: string;
  color?: ThemePalette;
  raised: boolean;
  action: (args?: unknown) => void;
  component = DynamicButtonComponent;

  constructor(options: DynamicFormButtonOptions) {
    this.key = options.key;
    this.action = options.action;
    this.label = options.label;
    this.icon = options.icon;
    this.color = options.color;
    this.raised = options.raised !== null ? options.raised : true;
  }
}
