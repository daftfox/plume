import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormService, FormQuestion } from '../../service/dynamic-form.service';
import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import {
  CheckboxFormQuestion,
  CONTROL_TYPE,
  DatepickerFormQuestion, DropdownFormQuestion,
  FormHint, RadioButtonFormQuestion,
  SPACER, TextareaFormQuestion,
  TextboxFormQuestion, ToggleFormQuestion
} from '../../model';

@Component({
  selector: 'slf-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss'],
})
export class DynamicFormQuestionComponent {
  @Input() question: FormQuestion;
  @Input() form: FormGroup;

  SPACER = SPACER;

  @ViewChild('questionComponent') questionComponent: AbstractFormQuestionComponent;

  CONTROL_TYPE = CONTROL_TYPE;

  getControlType = DynamicFormService.getControlType;

  get isValid(): boolean {
    return this.question instanceof FormHint || this.questionComponent.isValid;
  }

  get control(): FormControl {
    return this.questionComponent.control;
  }

  /*
   * The methods below are required to retain strict template checking while still being able to use a mixed type array
   * for the questions in the ngSwitchCase. It is up to the developer to make sure the methods below are not abused.
   */

  asFormHint( formHint: FormQuestion ): FormHint {
    return formHint as FormHint;
  }

  asCheckboxFormQuestion( checkboxFormQuestion: FormQuestion ): CheckboxFormQuestion {
    return checkboxFormQuestion as CheckboxFormQuestion;
  }

  asDatepickerFormQuestion( datepickerFormQuestion: FormQuestion ): DatepickerFormQuestion {
    return datepickerFormQuestion as DatepickerFormQuestion;
  }

  asDropdownFormQuestion( dropdownFormQuestion: FormQuestion ): DropdownFormQuestion {
    return dropdownFormQuestion as DropdownFormQuestion;
  }

  asRadioButtonFormQuestion( radioButtonFormQuestion: FormQuestion ): RadioButtonFormQuestion {
    return radioButtonFormQuestion as RadioButtonFormQuestion;
  }

  asTextareaFormQuestion( textareaFormQuestion: FormQuestion ): TextareaFormQuestion {
    return textareaFormQuestion as TextareaFormQuestion;
  }

  asTextboxFormQuestion( textboxFormQuestion: FormQuestion ): TextboxFormQuestion {
    return textboxFormQuestion as TextboxFormQuestion;
  }

  asToggleFormQuestion( toggleFormQuestion: FormQuestion ): ToggleFormQuestion {
    return toggleFormQuestion as ToggleFormQuestion;
  }
}
