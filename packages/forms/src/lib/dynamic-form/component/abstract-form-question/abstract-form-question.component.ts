import { Directive, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { AsyncValidatorFn, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { filter, takeUntil, tap } from 'rxjs/operators';
import {
  DynamicFormElementValueType,
  LinkedElement,
  MutatorFn
} from '../../model';

@Directive()
export abstract class AbstractFormQuestionComponent<T = DynamicFormElementValueType> implements OnInit, OnDestroy, OnChanges {
  @Input() form: FormGroup;
  @Input() key: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() validators: ValidatorFn | ValidatorFn[] = [];
  @Input() asyncValidators: AsyncValidatorFn | AsyncValidatorFn[] = [];
  @Input() value: T;
  @Input() disabled = false;
  @Input() linkedElements: LinkedElement[] = [];
  @Input() mutators: MutatorFn[] = [];

  @Output() clearArguments = new Subject<string>();
  @Output() refreshLinkedQuestion = new Subject<{key: string, args: Map<string, any>}>();

  unsubscribe = new Subject<null>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] && changes['value'].currentValue !== this.control.value) {
      this.control.setValue(changes['value'].currentValue);
    }
  }

  ngOnInit() {
    merge(this.control.valueChanges, this.control.statusChanges)
      .pipe(
        takeUntil(this.unsubscribe),
        // update value and validity of linked questions on status - and value changes
        tap(() => this.updateLinkedQuestionsValueAndValidity() ),
        // run mutators for value changes
        filter((event) => !['VALID', 'INVALID', 'PENDING', 'DISABLED'].includes(event)),
        tap((value: DynamicFormElementValueType) => {
          this.mutators.forEach((mutator) => mutator(this.linkedElements.filter( ({key}) => key !== this.key ), this.form, value as T));
        }),
        tap( this.refreshLinkedQuestionsData.bind(this) ),
      )
      .subscribe();

    this.unsubscribe.pipe(tap(() => this.unsubscribe.complete())).subscribe();
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

  get control(): FormControl {
    return this.form.get(this.key) as FormControl;
  }

  private updateLinkedQuestionsValueAndValidity() {
    if ( !this.form ) return;
    this.linkedElements
      .filter(({ key }) => key !== this.key)
      .forEach(({ key }) => this.form.get(key).updateValueAndValidity({ emitEvent: false }));
  }

  private refreshLinkedQuestionsData( value: DynamicFormElementValueType ) {
    this.linkedElements
      .forEach(({ key, refreshOnValueChange, clearAccumulatedArgumentsOnValueChange }) => {
        if ( key === this.key ) return;
        if ( clearAccumulatedArgumentsOnValueChange ) {
          this.clearArguments.next(key);
        }

        if ( refreshOnValueChange) {
          this.refreshLinkedQuestion.next({key, args: new Map([[this.key, value]])});
        }
      });
  }
}
