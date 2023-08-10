import { DynamicFormButtonOptions } from './options';
import { ThemePalette } from '@angular/material/core';

export class DynamicFormButton {
  icon?: string;
  label?: string;
  color?: ThemePalette;
  raised: boolean;
  action: ( args?: any ) => void;

  constructor( options: DynamicFormButtonOptions ) {
    this.action = options.action;
    this.label = options.label;
    this.icon = options.icon;
    this.color = options.color;
    this.raised = options.raised !== undefined ? options.raised : true;
  }
}
