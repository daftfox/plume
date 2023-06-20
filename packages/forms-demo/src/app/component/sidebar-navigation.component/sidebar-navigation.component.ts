import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgForOf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'demo-sidebar-navigation',
  imports: [
    MatListModule,
    RouterLink,
    RouterLinkActive,
    NgForOf
  ],
  template: `
    <mat-nav-list>
      <mat-list-item *ngFor="let navigationItem of navigationItems"
                     [routerLink]="navigationItem.path"
                     routerLinkActive="active">{{ navigationItem.label }}</mat-list-item>
    </mat-nav-list>
  `,
  styles: [
    `
      mat-list-item.active {
        font-weight: bold;
        background-color: rgba(63, 81, 181, 0.38);
      }
    `
  ]
})
export class SidebarNavigationComponent {
  navigationItems = [
    {
      path: 'textbox-demo',
      label: 'Textbox'
    }, {
      path: 'checkbox-demo',
      label: 'Checkbox'
    }, {
      path: 'datepicker-demo',
      label: 'Datepicker'
    }
  ];
}
