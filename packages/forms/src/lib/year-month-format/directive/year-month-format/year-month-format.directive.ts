import { Directive } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Directive({
  selector: '[slfYearMonthFormat]',
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['MMM YYYY', 'dd/MM/yyyy', 'yyyy-MM-dd'],
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
