import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatCalendarView, MatDatepicker } from '@angular/material/datepicker';
import { DatepickerMode } from '../../model';
import { DynamicFormService } from '../../service/dynamic-form.service';

@Component({
  selector: 'plume-datepicker-form-question',
  templateUrl: './dynamic-datepicker.component.html',
  styleUrls: [
    '../abstract-form-question/abstract-form-question.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicDatepickerComponent extends AbstractFormQuestionComponent<Date> {
  @ViewChild('datePicker') datePicker: MatDatepicker<Date>;

  @Input() startView: MatCalendarView;
  @Input() mode: DatepickerMode;

  constructor(protected override service: DynamicFormService) {
    super(service);
  }

  setMonthAndYear(date: Date) {
    if (this.mode === 'month-year') {
      const controlValue = this.control.value || new Date();
      controlValue.setMonth(date.getMonth());
      controlValue.setFullYear(date.getFullYear());
      controlValue.setHours(0, 0, 0, 0);
      this.control.setValue(controlValue);
      this.datePicker.close();
    }
  }
}
