import { Component } from '@angular/core';
import { DatepickerFormQuestion, DynamicFormModule } from '@slodder/forms';
import { AbstractDemoComponent } from '../abstract-demo/abstract-demo.component';
import {
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'demo-datepicker',
  imports: [CommonModule, DynamicFormModule, MatNativeDateModule],
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
  public override questions = [
    new DatepickerFormQuestion({
      key: 'defaultDatepicker',
      label: 'Default datepicker',
    }),

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
