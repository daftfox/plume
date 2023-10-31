import { MatCalendarView } from '@angular/material/datepicker';
import { AbstractFormQuestion } from './abstract-form-question';
import { DynamicDatepickerComponent } from '../../component/dynamic-datepicker/dynamic-datepicker.component';
import {
  DatepickerFormQuestionOptions,
  DatepickerMode,
} from '../options/dynamic-datepicker-options.interface';

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
