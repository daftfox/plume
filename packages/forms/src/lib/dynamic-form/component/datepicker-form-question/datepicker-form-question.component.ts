import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { MatCalendarView, MatDatepicker } from '@angular/material/datepicker';
import { DatepickerMode } from '../../model';

@Component({
  selector: 'slf-datepicker-form-question',
  templateUrl: './datepicker-form-question.component.html',
  styleUrls: ['../abstract-form-question/abstract-form-question.component.scss'],
})
export class DatepickerFormQuestionComponent extends AbstractFormQuestionComponent<Date | moment.Moment> implements OnInit {
  @ViewChild('datePicker') datePicker: MatDatepicker<Date | moment.Moment>;

  @Input() startView: MatCalendarView = 'year';
  @Input() mode: DatepickerMode = 'date';

  setMonthAndYear(date: moment.Moment | Date) {
    if (this.mode === 'month-year') {
      let controlValue: Date | moment.Moment;
      if (moment.isMoment(date)) {
        controlValue = (this.control.value as moment.Moment) || moment();
        controlValue.month(date.month());
        controlValue.year(date.year());
      } else {
        controlValue = (this.control.value as Date) || new Date();
        controlValue.setMonth(date.getMonth());
        controlValue.setFullYear(date.getFullYear());
      }
      this.control.setValue(controlValue);
      this.datePicker.close();
    }
  }
}
