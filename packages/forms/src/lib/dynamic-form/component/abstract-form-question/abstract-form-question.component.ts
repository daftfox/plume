import { Directive, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject, merge, Observable } from 'rxjs';
import { AsyncValidatorFn, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { filter, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import {
  DynamicFormElementValueType,
  LinkedElement,
  MutatorFn
} from '../../model';
import { DynamicFormService } from '../../service/dynamic-form.service';

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

  @Input() formInitialised: Observable<null>;
  @Input() additionalValidationMessages: Map<string, string>;

  @Output() clearArguments = new Subject<string>();
  @Output() refreshLinkedQuestion = new Subject<{key: string, args: Map<string, unknown>}>();

  defaultValidationMessages = new Map<string, string>([
    [ 'required', 'Required' ],
  ]);

  protected unsubscribe = new Subject<null>();

  constructor( protected service: DynamicFormService ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] && changes['value'].currentValue !== this.control.value) {
      this.control.setValue(changes['value'].currentValue);
    }
  }

  ngOnInit() {
    if ( this.additionalValidationMessages ) {
      this.defaultValidationMessages = new Map([
        ...this.defaultValidationMessages,
        ...this.additionalValidationMessages
      ]);
    }

    this.formInitialised.pipe(
      switchMap(() =>
        merge(this.control.valueChanges, this.control.statusChanges)
          .pipe(
            startWith(this.control.value),
            takeUntil(this.unsubscribe),
            // update value and validity of linked questions on status - and value changes
            tap( this.updateLinkedElementsValueAndValidity.bind(this) ),
            // run mutators for value changes only
            filter((event) => !['VALID', 'INVALID', 'PENDING', 'DISABLED'].includes(event)),
            tap( this.executeMutators.bind( this ) ),
            tap( this.refreshLinkedElementsData.bind( this ) ),
          )
      )
    ).subscribe();

    this.unsubscribe.pipe(tap(() => this.unsubscribe.complete())).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
  }

  get isDisabled(): boolean {
    return this.control.disabled;
  }

  get control(): FormControl {
    return this.service.getFormComponentControl(this.key) as FormControl;
  }

  private updateLinkedElementsValueAndValidity() {
    // if ( !this.form ) return; @TODO required?
    this.linkedElements
      .filter(({ key }) => key !== this.key)
      .forEach(({ key }) => this.service.updateFormControl( key ));
  }

  private refreshLinkedElementsData( value: T ) {
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

  private executeMutators( value: T ) {
    this.mutators.forEach((mutator) => mutator(
      this.linkedElements.filter( ({key}) => key !== this.key ),
      this.form,
      value
    ));
  }
}
