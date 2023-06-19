import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CheckboxFormQuestion, CombinationFormQuestion,
  DynamicFormModule,
  DynamicFormQuestion,
  FormGroupQuestion,
  TextboxFormQuestion,
  ToggleFormQuestion,
  SPACER
} from '@slodder/forms';
import { FlexModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '../header/header.component';
import { SidebarNavigationComponent } from '../sidebar-navigation.component/sidebar-navigation.component';

@Component({
  standalone: true,
  imports: [ RouterModule, DynamicFormModule, FlexModule, MatSidenavModule, HeaderComponent, SidebarNavigationComponent ],
  selector: 'demo-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <demo-header></demo-header>
    <mat-drawer-container [hasBackdrop]="false">
      <mat-drawer [disableClose]="true" [opened]="true">
        <demo-sidebar-navigation></demo-sidebar-navigation>
      </mat-drawer>
      <mat-drawer-content>
        <div fxLayout fxLayoutAlign="center">
          <div fxFlex="60">
            <router-outlet></router-outlet>
          </div>
        </div>
      </mat-drawer-content>
    </mat-drawer-container>

  `
})
export class AppComponent {
  title = 'forms-demo';

  questions: DynamicFormQuestion[] = [
    new TextboxFormQuestion<string>({
      key: 'name',
      label: 'Please enter your name',
      placeholder: 'Name',
    }),
    new TextboxFormQuestion<string>({
      key: 'disabled',
      label: 'Good luck entering something here',
      disabled: true
    }),
    new FormGroupQuestion({
      key: 'checkboxGroup1',
      label: 'Vertically grouped checkboxes using FormGroupQuestion',
      questions: [
        new CheckboxFormQuestion({
          key: 'checkbox1',
          label: 'Check me in',
          value: false
        }),
        new CheckboxFormQuestion({
          key: 'checkbox2',
          label: 'Check me out',
          value: true,
        })
      ]
    }),
    new CombinationFormQuestion({
      key: 'checkboxGroup2',
      label: 'Horizontally grouped checkboxes using CombinationFormQuestion',
      questions: [
        new CheckboxFormQuestion({
          key: 'checkbox3',
          label: 'Check me in',
          value: false
        }),
        new CheckboxFormQuestion({
          key: 'checkbox4',
          label: 'Check me out',
          value: true,
        })
      ]
    }),
    new ToggleFormQuestion({
      key: 'toggle',
      label: 'Enable awesomeness',
      value: false,
      spacer: SPACER.PREFIX,
    })
  ];
}
