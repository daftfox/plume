import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import { ThemePalette } from '@angular/material/core';
import { IFormActionComponent } from '../../model/component/form-action.component.interface';

@Component({
  standalone: true,
  selector: 'plume-button',
  imports: [NgIf, MatButtonModule, MatIconModule, NgTemplateOutlet, FlexModule],
  templateUrl: './dynamic-button.component.html',
})
export class DynamicButtonComponent implements IFormActionComponent {
  @Input() key: string;
  @Input() raised: boolean;
  @Input() color: ThemePalette;
  @Input() label: string;
  @Input() icon: string;
  @Input() action: (args?: unknown) => void;
}
