import { Component, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormElement, DynamicFormService, DynamicQuestion } from '../../service/dynamic-form.service';
import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import {
  DynamicCheckbox,
  CONTROL_TYPE,
  DynamicDatepicker, DynamicSelect, DynamicFormButton,
  DynamicFormHint, DynamicFormGist, DynamicRadioButton,
  SPACER, DynamicTextArea,
  DynamicTextInput, DynamicToggle, DynamicFormElementValueType
} from '../../model';
import { Subject } from 'rxjs';

@Component({
  selector: 'slf-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss'],
})
export class DynamicFormQuestionComponent {
  @Input() question: DynamicQuestion;
  @Input() form: FormGroup;
  @Output() clearArguments = new Subject<string>();
  @Output() refreshLinkedQuestion = new Subject<{key: string, args: Map<string, any>}>();

  SPACER = SPACER;

  @ViewChild('questionComponent') questionComponent: AbstractFormQuestionComponent;

  CONTROL_TYPE = CONTROL_TYPE;

  getControlType = DynamicFormService.getControlType;

  get isValid(): boolean {
    return this.question instanceof DynamicFormHint
      || this.question instanceof DynamicFormGist
      || this.question instanceof DynamicFormButton
      || this.questionComponent.isValid;
  }

  get control(): FormControl {
    return this.questionComponent.control;
  }

  get value(): DynamicFormElementValueType {
    return this.control.getRawValue();
  }

  get key(): string {
    return this.question.key;
  }

  /*
   * The methods below are required to retain strict template checking while still being able to use a mixed type array
   * for the questions in the ngSwitchCase. It is up to the developer to make sure the methods below are not abused.
   */

  asCheckbox( checkboxFormQuestion: DynamicFormElement ): DynamicCheckbox {
    return checkboxFormQuestion as DynamicCheckbox;
  }

  asDatepicker( datepickerFormQuestion: DynamicFormElement ): DynamicDatepicker {
    return datepickerFormQuestion as DynamicDatepicker;
  }

  asSelect( dropdownFormQuestion: DynamicFormElement ): DynamicSelect {
    return dropdownFormQuestion as DynamicSelect;
  }

  asRadioButton( radioButtonFormQuestion: DynamicFormElement ): DynamicRadioButton {
    return radioButtonFormQuestion as DynamicRadioButton;
  }

  asTextarea( textareaFormQuestion: DynamicFormElement ): DynamicTextArea {
    return textareaFormQuestion as DynamicTextArea;
  }

  asTextbox( textboxFormQuestion: DynamicFormElement ): DynamicTextInput {
    return textboxFormQuestion as DynamicTextInput;
  }

  asToggle( toggleFormQuestion: DynamicFormElement ): DynamicToggle {
    return toggleFormQuestion as DynamicToggle;
  }
}
