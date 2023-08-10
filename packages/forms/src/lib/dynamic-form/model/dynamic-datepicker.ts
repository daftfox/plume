import { AbstractFormQuestion } from './abstract-form-question';
import { MatCalendarView } from '@angular/material/datepicker';
import { DatepickerFormQuestionOptions, DatepickerMode } from './options';

export class DynamicDatepicker extends AbstractFormQuestion<Date> {
  startView: MatCalendarView;
  mode: DatepickerMode;

  constructor(options: DatepickerFormQuestionOptions) {
    super(options);

    this.startView = options.startView || 'month';
    this.mode = options.mode || 'date';
  }
}
