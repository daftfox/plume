import { Directive, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  IFormAction, IFormGroup, IFormQuestion, IFormOutput, IReactiveFormQuestion, IDynamicFormElement,
} from '../../model';

export type DynamicFormElement = IFormQuestion | IReactiveFormQuestion | IFormGroup | IFormOutput | IFormAction;

@Directive()
export abstract class AbstractFormGroupComponent implements OnDestroy {
  @Input() form: FormGroup;
  @Input() key: string;
  @Input() label: string;
  @Input() formElements: Observable<IDynamicFormElement[]> | IDynamicFormElement[];

  protected unsubscribe = new Subject<null>();

  get group(): FormGroup | undefined {
    return this.form.get(this.key) as FormGroup;
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
  }

  get isValid(): boolean {
    return this.group.valid || this.group.disabled;
  }

  get isDisabled(): boolean {
    return this.group.disabled;
  }
}
