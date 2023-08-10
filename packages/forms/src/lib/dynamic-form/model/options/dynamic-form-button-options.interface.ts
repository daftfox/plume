import { ThemePalette } from '@angular/material/core';

export interface DynamicFormButtonOptions {
  icon?: string;
  label?: string;
  color?: ThemePalette;
  raised?: boolean;
  action: ( args?: any ) => void
}
