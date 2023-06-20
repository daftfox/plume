import { AbstractFormQuestion, FormQuestionOptions } from './abstract-form-question';
import { MatCalendarView } from '@angular/material/datepicker';

export type DatepickerMode = 'month-year' | 'date';

export interface DatepickerFormQuestionOptions extends FormQuestionOptions<Date> {
  startView?: MatCalendarView;
  mode?: DatepickerMode;
}

export class DatepickerFormQuestion extends AbstractFormQuestion<Date> {
  startView: MatCalendarView;
  mode: DatepickerMode;

  constructor(options: DatepickerFormQuestionOptions) {
    super(options);

    this.startView = options.startView || 'month';
    this.mode = options.mode || 'date';
  }
}
