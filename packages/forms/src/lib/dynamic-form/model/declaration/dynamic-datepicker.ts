import { MatCalendarView } from '@angular/material/datepicker';
import { AbstractFormQuestion } from './abstract-form-question';
import { DatepickerMode, DatepickerFormQuestionOptions } from '../options';
import { DynamicDatepickerComponent } from '../../component/dynamic-datepicker/dynamic-datepicker.component';

export class DynamicDatepicker extends AbstractFormQuestion<Date> {
  component = DynamicDatepickerComponent;
  startView: MatCalendarView;
  mode: DatepickerMode;

  constructor(options: DatepickerFormQuestionOptions) {
    super(options);
    this.inputKeys.push('startView', 'mode');

    this.startView = options.startView || 'month';
    this.mode = options.mode || 'date';
  }
}
