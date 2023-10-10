import { NgModule } from '@angular/core';
import { YearMonthFormatDirective } from './directive/year-month-format/year-month-format.directive';

@NgModule({
  declarations: [YearMonthFormatDirective],
  exports: [YearMonthFormatDirective],
})
export class YearMonthFormatModule {}
