import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  standalone: true,
  selector: 'demo-header',
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <span>Slodder forms</span>
        <span class="example-spacer"></span>
      </mat-toolbar-row>
    </mat-toolbar>
  `
})
export class HeaderComponent {}
