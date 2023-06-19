import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'demo-sidebar-navigation',
  imports: [
    MatListModule,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <mat-nav-list>
      <mat-list-item [routerLink]="['textbox']" routerLinkActive="active">Textbox</mat-list-item>
    </mat-nav-list>
  `,
  styles: [
    `
       mat-list-item.active span {
         color: red!important;
       }
    `
  ]
})
export class SidebarNavigationComponent {}
