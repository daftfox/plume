import { AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChildren } from '@angular/core';
import { DynamicFormQuestionComponent } from '../dynamic-form-question/dynamic-form-question.component';
import { Subject } from 'rxjs';
import {
  CONTROL_TYPE,
  DynamicFormButton,
  DynamicFormGist,
  DynamicFormGroup,
  DynamicFormHint
} from '../../model';
import { DynamicFormService, DynamicFormElement } from '../../service/dynamic-form.service';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { AbstractFormGroupComponent } from '../abstract-form-group/abstract-form-group.component';
import { FormGroup } from '@angular/forms';
import { AbstractReactiveFormQuestion } from '../../model/abstract-reactive-form-question';
import {
  AbstractReactiveFormQuestionComponent
} from '../abstract-reactive-form-question/abstract-reactive-form-question.component';

@Component({
  selector: 'slf-dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html',
  styleUrls: ['./dynamic-form-group.component.scss'],
})
export class DynamicFormGroupComponent extends AbstractFormGroupComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() id: string;
  @Input() rootNode = true;

  @Input() showControls = false;
  @Input() disabled = false;
  @Input() submitButtonLabel = 'Submit';
  @Input() submitButtonIcon: string;
  @Input() submitButtonBadgeLabel: string | number;
  @Input() cancelButtonLabel = 'Cancel';
  @Input() direction: 'column' | 'row' = 'column';

  // @Input() formErrors: ApiErrorMessages;

  @Output() formSubmit = new Subject<any>();
  @Output() formCancel = new Subject<null>();

  @Output() formValuesChanged = new Subject<any>();

  @ViewChildren(DynamicFormQuestionComponent) dynamicFormQuestionComponents: DynamicFormQuestionComponent[] = [];
  @ViewChildren(DynamicFormGroupComponent) dynamicFormGroupComponents: DynamicFormGroupComponent[] = [];

  // Public redeclaration of enums for use in the template
  CONTROL_TYPE = CONTROL_TYPE;

  getControlType = DynamicFormService.getControlType;

  constructor(
    // private notificationService: NotificationService,
    protected dynamicFormService: DynamicFormService,
  ) {
    super();
  }

  ngAfterViewInit() {
    this.form.valueChanges
      .pipe(
        distinctUntilChanged((previous, current) => JSON.stringify(previous) === JSON.stringify(current)),
        takeUntil(this.unsubscribe),
        tap(() => this.formValuesChanged.next(this.value)),
      )
      .subscribe();
  }

  ngOnInit() {
    if (this.formElements && !this.form) {
      this.unsubscribe.next( null );
      this.initForm();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
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

      const getValuesFromQuestions = ( formGroupQuestions: DynamicFormElement[], newValues: any = {}): any => {
        for (const formQuestion of formGroupQuestions) {
          if ( formQuestion instanceof DynamicFormGroup ) {
            newValues[formQuestion.key] = getValuesFromQuestions(formQuestion.formElements, newValues);
          } else if (
            !(formQuestion instanceof DynamicFormHint)
            && !(formQuestion instanceof DynamicFormButton)
            && !(formQuestion instanceof DynamicFormGist)
          ) {
            newValues[formQuestion.key] = formQuestion.value;
          }
        }

        return newValues;
      };

      this.form.patchValue(getValuesFromQuestions(changes['questions'].currentValue));

      const updateQuestionEnabled = ( formGroupQuestions: DynamicFormElement[], formGroup: FormGroup) => {
        for (const formGroupQuestion of formGroupQuestions) {
          if (
            formGroupQuestion instanceof DynamicFormHint
            || formGroupQuestion instanceof DynamicFormGist
            || formGroupQuestion instanceof DynamicFormButton
          ) continue;

          const question = formGroup.get(formGroupQuestion.key);

          if (!question) return;

          if (question instanceof FormGroup) {
            updateQuestionEnabled((formGroupQuestion as DynamicFormGroup).formElements, question);
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
    if (!this.formElements) {
      return;
    }
    this.form = DynamicFormService.createFormGroup(this.formElements);
  }

  get value(): any {
    const values: any = {};
    if ( this.form ) {
      for (const formElement of [...this.dynamicFormQuestionComponents, ...this.dynamicFormGroupComponents]) {
        values[formElement.key] = formElement.value;
      }
    }

    return values;
  }

  override get isValid(): boolean {
    const children = [...this.dynamicFormQuestionComponents, ...this.dynamicFormGroupComponents];
    // a form without questions is obviously not valid and can't be submitted.
    // throws an ExpressionChangedAfterItHasBeenCheckedError on init otherwise and while this doesn't cause any issues, it looks dirty as
    if (children.length === 0) return false;

    return children.map((fq) => fq.isValid).filter((isValid) => !isValid).length === 0;
  }

  refreshLinkedQuestion( {key, args}: {key: string, args: Map<string, any>} ) {
    const linkedQuestion = this.dynamicFormQuestionComponents.find( formElement =>
      formElement.questionComponent instanceof AbstractReactiveFormQuestionComponent && formElement.key === key
    );

    if ( linkedQuestion ) {
      (linkedQuestion.questionComponent as AbstractReactiveFormQuestionComponent<any>).refresh( args );
    }
  }

  clearArguments( key: string ) {
    const linkedQuestion = this.dynamicFormQuestionComponents.find( formElement =>
      formElement.questionComponent instanceof AbstractReactiveFormQuestionComponent && formElement.key === key
    );

    if ( linkedQuestion ) {
      (linkedQuestion.questionComponent as AbstractReactiveFormQuestionComponent<any>).clearArgs();
    }
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
    this.formSubmit.next(this.value);
  }

  cancel(): void {
    this.formCancel.next(null);
  }
}
