import {
  AbstractControl,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Injectable } from '@angular/core';
import {
  DynamicCheckbox,
  CONTROL_TYPE, DynamicDatepicker,
  DynamicSelect, DynamicFormButton, DynamicFormGroup,
  DynamicFormHint, DynamicFormGist, DynamicRadioButton,
  SelectOptionValueType, DynamicTextArea, DynamicTextInput, DynamicToggle
} from '../model';

export type DynamicQuestion =
  DynamicTextInput
  | DynamicSelect
  | DynamicCheckbox
  | DynamicRadioButton
  | DynamicDatepicker
  | DynamicToggle
  | DynamicTextArea;

export type DynamicFormQuestionGroup =
  DynamicFormGroup;

export type DynamicFormElement = DynamicQuestion | DynamicFormQuestionGroup | DynamicFormHint | DynamicFormGist | DynamicFormButton;

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  static findControlByKey(formGroup: FormGroup, key: string): AbstractControl | null {
    for (const controlKey of Object.keys(formGroup.controls)) {
      if (formGroup.controls[controlKey] instanceof FormGroup) {
        const c = DynamicFormService.findControlByKey(formGroup.get(controlKey) as FormGroup, key);
        if (c) {
          return c;
        }
      }

      if (controlKey === key) {
        return formGroup.get(controlKey);
      }
    }
    return null;
  }

  /**
   * Map an array of FormQuestion objects to a FormGroup
   * @param formQuestions
   */
  static createFormGroup( formQuestions: DynamicFormElement[]): FormGroup {
    const group: { [key: string]: AbstractControl } = {};

    for (const formQuestion of formQuestions) {
      if (!(formQuestion instanceof DynamicFormHint) && !(formQuestion instanceof DynamicFormGist) && !(formQuestion instanceof DynamicFormButton)) {
        group[formQuestion.key] =
          formQuestion instanceof DynamicFormGroup
            ? (group[formQuestion.key] = DynamicFormService.createFormGroup(formQuestion.formElements))
            : (group[formQuestion.key] = DynamicFormService.createTypedFormControl(formQuestion));
      }
    }

    return new FormGroup(group);
  }

  static getControlType(formQuestion: DynamicFormElement): CONTROL_TYPE {
    if (formQuestion instanceof DynamicTextInput) {
      return CONTROL_TYPE.TEXTBOX;
    } else if (formQuestion instanceof DynamicTextArea) {
      return CONTROL_TYPE.TEXTAREA;
    } else if (formQuestion instanceof DynamicFormHint) {
      return CONTROL_TYPE.FORM_HINT;
    } else if (formQuestion instanceof DynamicFormGist) {
      return CONTROL_TYPE.GIST;
    } else if (formQuestion instanceof DynamicFormButton) {
      return CONTROL_TYPE.BUTTON;
    } else if (formQuestion instanceof DynamicToggle) {
      return CONTROL_TYPE.TOGGLE;
    } else if (formQuestion instanceof DynamicCheckbox) {
      return CONTROL_TYPE.CHECKBOX;
    } else if (formQuestion instanceof DynamicSelect) {
      return CONTROL_TYPE.DROPDOWN;
    } else if (formQuestion instanceof DynamicDatepicker) {
      return CONTROL_TYPE.DATEPICKER;
    } else if (formQuestion instanceof DynamicRadioButton) {
      return CONTROL_TYPE.RADIO;
    } else {
      return CONTROL_TYPE.FORM_GROUP;
    }
  }

  static createTypedFormControl( formQuestion: DynamicQuestion ): FormControl {
    const {disabled, validators, asyncValidators} = formQuestion;
    if (
      formQuestion instanceof DynamicTextInput ||
      formQuestion instanceof DynamicTextArea
    ) {
      return new FormControl<string | number | undefined>(
        { value: formQuestion.value, disabled },
        validators,
        asyncValidators,
      );
    } else if ( formQuestion instanceof DynamicRadioButton ) {
      return new FormControl<string | undefined>(
        { value: formQuestion.value, disabled },
        validators,
        asyncValidators,
      );
    } else if ( formQuestion instanceof DynamicCheckbox || formQuestion instanceof DynamicToggle ) {
      return new FormControl<boolean | undefined>(
        { value: formQuestion.value, disabled },
        validators,
        asyncValidators,
      );
    } else if ( formQuestion instanceof DynamicSelect ) {
      return new FormControl<SelectOptionValueType | SelectOptionValueType[]>(
        { value: formQuestion.value, disabled },
        validators,
        asyncValidators,
      );
    } else {
      return new FormControl<Date | undefined>(
        { value: formQuestion.value, disabled },
        validators,
        asyncValidators,
      );
    }
  }

  // refreshQuestionData(key: string, args: any[]) {
  //   this.currentForm
  //     .pipe(
  //       take(1),
  //       map((currentForm: AbstractFormGroupComponent) => DynamicFormService.findQuestionByKey(currentForm.questions, key)),
  //       // for now we only support dropdowns
  //       filter((question: FormQuestion) => question instanceof DropdownFormQuestion),
  //       tap((question: DropdownFormQuestion) => question.dataSource.loadList(...args)),
  //     )
  //     .subscribe();
  // }
}
