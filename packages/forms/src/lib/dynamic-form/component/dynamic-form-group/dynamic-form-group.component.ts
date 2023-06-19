import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChildren } from '@angular/core';
import { DynamicFormQuestionComponent } from '../dynamic-form-question/dynamic-form-question.component';
import { Subject } from 'rxjs';
import { CONTROL_TYPE, FormGroupQuestion, FormHint } from '../../model';
import { DynamicFormService, FormQuestion, FormQuestionGroup } from '../../service/dynamic-form.service';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { AbstractFormGroupComponent } from '../abstract-form-group/abstract-form-group.component';
// import { ApiErrorMessage, ApiErrorMessages, ApiErrorProperty } from '../../../../service/validation/validation.service';
// import { NotificationService } from '../../../../service/notification/notification.service';
import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { CombinationFormQuestionComponent } from '../combination-form-question/combination-form-question.component';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'slf-dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html',
  styleUrls: ['./dynamic-form-group.component.scss'],
})
export class DynamicFormGroupComponent extends AbstractFormGroupComponent implements OnInit, OnChanges {
  @Input() rootNode = false;

  @Input() showControls = false;
  @Input() disabled = false;
  @Input() submitButtonLabel = 'Submit';
  @Input() submitButtonIcon: string;
  @Input() submitButtonBadgeLabel: string | number;
  @Input() cancelButtonLabel = 'Cancel';

  // @Input() formErrors: ApiErrorMessages;

  @Output() formSubmit = new Subject<any>();
  @Output() formCancel = new Subject<null>();

  @Output() formValuesChanged = new Subject<any>();

  @ViewChildren(DynamicFormQuestionComponent) formQuestionComponents: AbstractFormQuestionComponent[] = [];
  @ViewChildren(CombinationFormQuestionComponent) combinationFormGroupComponents: AbstractFormGroupComponent[] = [];
  @ViewChildren(DynamicFormGroupComponent) dynamicFormGroupComponents: AbstractFormGroupComponent[] = [];

  // Public redeclaration of enums for use in the template
  CONTROL_TYPE = CONTROL_TYPE;

  private asyncValidatorControls: AbstractControl[] = [];

  getControlType = DynamicFormService.getControlType;

  constructor(
    // private notificationService: NotificationService,
    protected dynamicFormService: DynamicFormService,
  ) {
    super();
  }

  ngOnInit() {
    if (this.questions) {
      this.unsubscribe.next( null );
      this.initForm();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['questions'] && this.rootNode && !this.form) {
    //   // rebuild the form if the questions are updated on the root node
    //   if (this.questions) {
    //     this.unsubscribe.next( null );
    //     this.initForm();
    //   }
    // } else
    if (changes['formErrors']) {
      const unmatchedErrors: string[] = [];
      // this.formErrors.properties.forEach((property: ApiErrorProperty) => {
      //   // Transform the server errors into an array of strings
      //   const errorMessages: string[] = property.errors.map((errorMessage: ApiErrorMessage) => errorMessage.message);
      //   const control = DynamicFormService.findControlByKey(this.form, property.propertyName);
      //   if (!control || control.disabled) {
      //     unmatchedErrors.push(`${property.propertyName} - ${errorMessages.join(', ')}`);
      //     return;
      //   }
      //
      //   // Add errors to the form control
      //   control.markAsDirty({ onlySelf: false });
      //   control.markAsTouched({ onlySelf: false });
      //   control.setErrors({ apiErrors: errorMessages });
      //   return;
      // });

      // Any unmatched errors are notified
      // if (unmatchedErrors.length > 0 && this.notificationService) {
      //   this.notificationService.showNotification(unmatchedErrors.join('\n'));
      // }
    } else if (changes['questions']) {
      // update form controls
      if (!this.form) {
        return;
      }

      const getValuesFromQuestions = (formGroupQuestions: FormQuestion[], newValues: any = {}): any => {
        for (const formQuestion of formGroupQuestions) {
          if ( formQuestion instanceof FormGroupQuestion ) {
            newValues[formQuestion.key] = getValuesFromQuestions(formQuestion.questions, newValues);
          } else if (!(formQuestion instanceof FormHint)) {
            newValues[formQuestion.key] = formQuestion.value;
          }
        }

        return newValues;
      };

      this.form.patchValue(getValuesFromQuestions(changes['questions'].currentValue));

      const updateQuestionEnabled = (formGroupQuestions: (FormQuestion | FormQuestionGroup)[], formGroup: FormGroup) => {
        for (const formGroupQuestion of formGroupQuestions) {
          const question = formGroup.get(formGroupQuestion.key);

          if (!question) return;

          if (question instanceof FormGroup) {
            updateQuestionEnabled((formGroupQuestion as FormGroupQuestion).questions, question);
          } else {
            question.disabled ? question.disable() : question.enable();
          }
        }
      };

      updateQuestionEnabled(changes['questions'].currentValue, this.form);

      this.form.reset();
    }
  }

  /**
   * Map an observable array of FormQuestion objects to a FormGroup and assign it to the local form property.
   * Takes into account that questions may be nested and appends these in nested FormGroups accordingly.
   */
  initForm(): void {
    if (!this.questions) {
      return;
    }
    this.form = DynamicFormService.createFormGroup(this.questions);
    this.form.valueChanges
      .pipe(
        distinctUntilChanged((previous, current) => JSON.stringify(previous) === JSON.stringify(current)),
        takeUntil(this.unsubscribe),
        tap((valueChanges) => this.formValuesChanged.next(valueChanges)),
      )
      .subscribe();
  }

  override get isValid(): boolean {
    const children = [...this.formQuestionComponents, ...this.combinationFormGroupComponents, ...this.dynamicFormGroupComponents];
    // a form without questions is obviously not valid and can't be submitted.
    // throws an ExpressionChangedAfterItHasBeenCheckedError on init otherwise and while this doesn't cause any issues, it looks dirty as
    if (children.length === 0) return false;

    return children.map((fq) => fq.isValid).filter((isValid) => !isValid).length === 0;
  }

  get isPristine(): boolean {
    return this.form.pristine;
  }

  markAsPristine() {
    this.form.markAsPristine();
  }
  /**
   * Wrapper method to emit new form values on submit
   */
  submit(): void {
    this.formSubmit.next(this.form.value);
  }

  cancel(): void {
    this.formCancel.next(null);
  }
}
