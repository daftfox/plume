import { Directive, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { DynamicFormGroup, IFormAction, IFormQuestion, IFormStatic, IReactiveFormQuestion } from '../../model';

export type DynamicFormElement = IFormQuestion | IReactiveFormQuestion | DynamicFormGroup | IFormStatic | IFormAction;

@Directive()
export abstract class AbstractFormGroupComponent implements OnDestroy {
  @Input() form: FormGroup;
  @Input() key: string;
  @Input() label: string;
  @Input() formElements: Observable<DynamicFormElement[]> | DynamicFormElement[];

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
}
