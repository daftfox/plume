import { Component } from '@angular/core';
import { DynamicFormModule } from '@slodder/forms';
import { AbstractDemoComponent, Example } from '../abstract-demo/abstract-demo.component';
import {
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { HighlightModule } from 'ngx-highlightjs';
import { ObserveVisibilityDirective } from '../../directive/observe-visibility.directive';

@Component({
  standalone: true,
  selector: 'demo-datepicker',
  imports: [ CommonModule, DynamicFormModule, MatButtonModule, MatExpansionModule, HighlightModule, ObserveVisibilityDirective ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-NZ'
    }
  ],
  templateUrl: '../abstract-demo/abstract-demo.component.html',
})
export class DatepickerDemoComponent extends AbstractDemoComponent {
  public override title = 'Datepicker';
  public override examples: Example[] = [
    // new DynamicDatepicker({
    //   key: 'defaultDatepicker',
    //   label: 'Default datepicker',
    // }),

    // @fixme doesn't work anymore. why? Should format as 'FEB 2022' instead of '23/02/2023'
    // Something to do with slfMonthYearDirective?
    // new DatepickerFormQuestion({
    //   key: 'monthYearDatepicker',
    //   label: 'Month year datepicker',
    //   mode: 'month-year',
    //   startView: 'multi-year'
    // }),
  ];
}
