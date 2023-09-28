import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'demo-sidebar-navigation',
  imports: [
    MatListModule,
    RouterLink,
    RouterLinkActive,
    NgForOf,
    MatIconModule
  ],
  template: `
    <mat-nav-list>
      <mat-list-item>
<!--        <mat-icon matListItemIcon>play_circle_outline</mat-icon>-->
        Getting started
      </mat-list-item>

      <mat-list-item class="indent">
<!--        <mat-icon matListItemIcon>question_mark</mat-icon>-->
        What is Plume forms?
      </mat-list-item>

      <mat-list-item class="indent">
<!--        <mat-icon matListItemIcon>install_desktop</mat-icon>-->
        Setup
      </mat-list-item>
      <mat-divider></mat-divider>

      <mat-list-item routerLink="validation">
<!--        <mat-icon matListItemIcon>playlist_add_check</mat-icon>-->
        Validation
      </mat-list-item>

      <mat-list-item>
<!--        <mat-icon matListItemIcon>change_circle</mat-icon>-->
        Mutation
      </mat-list-item>

      <mat-list-item routerLink="linked-element">
<!--        <mat-icon matListItemIcon>link</mat-icon>-->
        Linked elements
      </mat-list-item>

      <mat-list-item>
<!--        <mat-icon matListItemIcon>inventory</mat-icon>-->
        Form components
      </mat-list-item>
      <mat-list-item *ngFor="let navigationItem of navigationItems"
                     class="indent"
                     [routerLink]="[{outlets: {primary: ['form-components', navigationItem.path]}}]"
                     routerLinkActive="active">
<!--        <mat-icon matListItemIcon>{{ navigationItem.icon }}</mat-icon>-->
        {{ navigationItem.label }}
      </mat-list-item>
      <mat-divider></mat-divider>

      <mat-list-item>
<!--        <mat-icon matListItemIcon>api</mat-icon>-->
        API reference
      </mat-list-item>
    </mat-nav-list>
  `,
  styleUrls: [
    './sidebar-navigation.component.scss'
  ]
})
export class SidebarNavigationComponent {
  navigationItems = [
    {
      path: 'text-input-demo',
      icon: 'text_fields',
      label: 'Text input',
      aside: 'select'
    }, {
      path: 'checkbox-demo',
      icon: 'check_box',
      label: 'Checkbox',
      aside: 'select'
    }, {
      path: 'datepicker-demo',
      icon: 'calendar_month',
      label: 'Datepicker',
      aside: 'select'
    }, {
      path: 'select-demo',
      icon: 'list_alt',
      label: 'Select',
      aside: 'select'
    }
  ];
}
