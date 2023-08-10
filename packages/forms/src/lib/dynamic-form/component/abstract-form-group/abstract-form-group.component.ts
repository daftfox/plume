import { Directive, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormElement, DynamicQuestion } from '../../service/dynamic-form.service';
import { Subject } from 'rxjs';
import { DynamicFormButton, DynamicFormGist, DynamicFormGroup, DynamicFormHint } from '../../model';

@Directive()
export abstract class AbstractFormGroupComponent implements OnDestroy {
  @Input() form: FormGroup;
  @Input() key: string;
  @Input() label: string;
  @Input() formElements: DynamicFormElement[] = [];

  unsubscribe = new Subject<null>();

  get group(): FormGroup | undefined {
    return this.form.get(this.key) as FormGroup;
  }

  groupByKey(key: string): FormGroup | undefined {
    return this.form.get(key) as FormGroup;
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
  }

  get isValid(): boolean {
    return this.control.valid || this.control.disabled;
  }

  get isDisabled(): boolean {
    return this.control.disabled;
  }

  get control(): FormControl | undefined {
    return this.form.get(this.key) as FormControl;
  }

  /*
   * The methods below are required to retain strict template checking while still being able to use a mixed type array
   * for the questions in the ngSwitchCase. It is up to the developer to make sure the methods below are not abused.
   */
  asFormGroupQuestion( formQuestionGroup: DynamicFormElement ): DynamicFormGroup {
    return formQuestionGroup as DynamicFormGroup;
  }

  asFormQuestion( formQuestion: DynamicFormElement ): DynamicQuestion {
    return formQuestion as DynamicQuestion;
  }

  asFormHint( formHint: DynamicFormElement ): DynamicFormHint {
    return formHint as DynamicFormHint;
  }

  asGist( gist: DynamicFormElement ): DynamicFormGist {
    return gist as DynamicFormGist;
  }

  asButton( button: DynamicFormElement ): DynamicFormButton {
    return button as DynamicFormButton;
  }
}
