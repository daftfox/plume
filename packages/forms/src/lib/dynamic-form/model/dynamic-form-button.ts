import { DynamicFormButtonOptions } from './options';
import { ThemePalette } from '@angular/material/core';
import { IFormAction } from './form-action.interface';

export class DynamicFormButton implements IFormAction {
  key: string;
  action: ( args?: unknown ) => void;
  label?: string;
  icon?: string;
  color?: ThemePalette;
  raised: boolean;

  constructor( options: DynamicFormButtonOptions ) {
    this.key = options.key;
    this.action = options.action;
    this.label = options.label;
    this.icon = options.icon;
    this.color = options.color;
    this.raised = options.raised !== undefined ? options.raised : true;
  }
}
