import { ThemePalette } from '@angular/material/core';

export interface DynamicFormButtonOptions {
  key: string;
  icon?: string;
  label?: string;
  color?: ThemePalette;
  raised?: boolean;
  action: (args?: unknown) => void;
}
