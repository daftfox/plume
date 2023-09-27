import { Directive } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Directive({
  selector: '[plumeYearMonthFormat]',
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: {
            month: 'short',
            year: 'numeric',
          },
        },
        display: {
          dateInput: 'MMM YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      }
    }
  ]
})
export class YearMonthFormatDirective {}
