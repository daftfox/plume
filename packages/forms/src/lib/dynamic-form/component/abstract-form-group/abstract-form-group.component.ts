import { Directive, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormQuestion, FormQuestionGroup } from '../../service/dynamic-form.service';
import { Subject } from 'rxjs';
import { CombinationFormQuestion, FormGroupQuestion, FormHint } from '../../model';

@Directive()
export abstract class AbstractFormGroupComponent implements OnDestroy {
  @Input() form: FormGroup;
  @Input() key: string;
  @Input() label: string;
  @Input() questions: (FormHint | FormQuestion | FormQuestionGroup)[] = [];

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
  asFormGroupQuestion( formQuestionGroup: FormHint | FormQuestion | FormQuestionGroup ): FormGroupQuestion {
    return formQuestionGroup as FormGroupQuestion;
  }

  asCombinationFormQuestion( combinationFormQuestion: FormHint | FormQuestion | FormQuestionGroup ): CombinationFormQuestion {
    return combinationFormQuestion as CombinationFormQuestion;
  }

  asFormQuestion( formQuestion: FormHint | FormQuestion | FormQuestionGroup ): FormQuestion {
    return formQuestion as FormQuestion;
  }
}
