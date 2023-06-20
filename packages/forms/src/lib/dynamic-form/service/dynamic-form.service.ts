import {
  AbstractControl,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Injectable } from '@angular/core';
import {
  CheckboxFormQuestion,
  CombinationFormQuestion,
  CONTROL_TYPE, DatepickerFormQuestion,
  DropdownFormQuestion, FormGroupQuestion,
  FormHint, RadioButtonFormQuestion,
  SelectOptionValueType, TextareaFormQuestion, TextboxFormQuestion, ToggleFormQuestion
} from '../model';

export type FormQuestion =
  TextboxFormQuestion
  | DropdownFormQuestion
  | CheckboxFormQuestion
  | RadioButtonFormQuestion
  | DatepickerFormQuestion
  | ToggleFormQuestion
  | TextareaFormQuestion;

export type FormQuestionGroup =
  FormGroupQuestion
  | CombinationFormQuestion;

export type DynamicFormQuestion = FormQuestion | FormQuestionGroup | FormHint;

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  static findQuestionByKey(
    formQuestions: (FormQuestion | FormQuestionGroup)[],
    key: string
  ): FormQuestion | FormQuestionGroup | null {
    for (const formQuestion of formQuestions) {
      if ( formQuestion instanceof FormGroupQuestion ) {
        const r = DynamicFormService.findQuestionByKey(formQuestion.questions, key);
        if (r) {
          return r;
        }
      }

      if (formQuestion.key === key) {
        return formQuestion;
      }
    }
    return null;
  }

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
  static createFormGroup( formQuestions: (FormHint | FormQuestion | FormQuestionGroup)[]): FormGroup {
    const group: { [key: string]: AbstractControl } = {};

    for (const formQuestion of formQuestions) {
      if (!(formQuestion instanceof FormHint)) {
        group[formQuestion.key] =
          formQuestion instanceof FormGroupQuestion
            ? (group[formQuestion.key] = DynamicFormService.createFormGroup(formQuestion.questions))
            : (group[formQuestion.key] = DynamicFormService.createTypedFormControl(formQuestion));
      }
    }

    return new FormGroup(group);
  }

  static getControlType(formQuestion: FormHint | FormQuestion | FormQuestionGroup): CONTROL_TYPE {
    if (formQuestion instanceof TextboxFormQuestion) {
      return CONTROL_TYPE.TEXTBOX;
    } else if (formQuestion instanceof TextareaFormQuestion) {
      return CONTROL_TYPE.TEXTAREA;
    } else if (formQuestion instanceof FormHint) {
      return CONTROL_TYPE.FORM_HINT;
    } else if (formQuestion instanceof ToggleFormQuestion) {
      return CONTROL_TYPE.TOGGLE;
    } else if (formQuestion instanceof CheckboxFormQuestion) {
      return CONTROL_TYPE.CHECKBOX;
    } else if (formQuestion instanceof DropdownFormQuestion) {
      return CONTROL_TYPE.DROPDOWN;
    } else if (formQuestion instanceof DatepickerFormQuestion) {
      return CONTROL_TYPE.DATEPICKER;
    } else if (formQuestion instanceof RadioButtonFormQuestion) {
      return CONTROL_TYPE.RADIO;
    } else {
      return formQuestion instanceof CombinationFormQuestion ? CONTROL_TYPE.COMBINATION : CONTROL_TYPE.FORM_GROUP;
    }
  }

  static createTypedFormControl( formQuestion: FormQuestion ): FormControl {
    const {disabled, validators, asyncValidators} = formQuestion;
    if (
      formQuestion instanceof TextboxFormQuestion ||
      formQuestion instanceof TextareaFormQuestion
    ) {
      return new FormControl<string | number | undefined>(
        { value: formQuestion.value, disabled },
        validators,
        asyncValidators,
      );
    } else if ( formQuestion instanceof RadioButtonFormQuestion ) {
      return new FormControl<string | undefined>(
        { value: formQuestion.value, disabled },
        validators,
        asyncValidators,
      );
    } else if ( formQuestion instanceof CheckboxFormQuestion || formQuestion instanceof ToggleFormQuestion ) {
      return new FormControl<boolean | undefined>(
        { value: formQuestion.value, disabled },
        validators,
        asyncValidators,
      );
    } else if ( formQuestion instanceof DropdownFormQuestion ) {
      return new FormControl<SelectOptionValueType>(
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
