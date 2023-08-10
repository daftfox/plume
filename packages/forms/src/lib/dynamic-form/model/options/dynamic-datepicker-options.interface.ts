import { DynamicFormQuestionOptions } from './dynamic-form-question-options.interface';
import { MatCalendarView } from '@angular/material/datepicker';

export type DatepickerMode = 'month-year' | 'date';

export interface DatepickerFormQuestionOptions extends DynamicFormQuestionOptions<Date> {
  startView?: MatCalendarView;
  mode?: DatepickerMode;
}
