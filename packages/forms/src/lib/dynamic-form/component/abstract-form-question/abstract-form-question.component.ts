import { Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject, merge, Observable } from 'rxjs';
import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { filter, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import {
  DynamicFormElementValueType,
  LinkedElement,
} from '../../model';
import { DynamicFormService } from '../../service/dynamic-form.service';
import { isAngularValidator, PlumeValidatorFn } from '../../validator';

@Directive()
export abstract class AbstractFormQuestionComponent<T = DynamicFormElementValueType> implements OnInit, OnDestroy, OnChanges {
  @Input() key: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() validators: ValidatorFn | PlumeValidatorFn | (ValidatorFn | PlumeValidatorFn)[] = [];
  @Input() asyncValidators: AsyncValidatorFn | AsyncValidatorFn[] = [];
  @Input() value: T;
  @Input() disabled = false;
  @Input() linkedElements: LinkedElement[] = [];

  @Input() formInitialised: Observable<null>;
  @Input() additionalValidationMessages: Map<string, string>;

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
    if ( Array.isArray( this.validators ) ) {
      this.validators
        .filter( (validator) => !isAngularValidator(validator))
        .forEach( (validator) => this.control.addValidators((validator as PlumeValidatorFn)(this.service)))
    } else if (!isAngularValidator(this.validators)) {
      this.control.addValidators((this.validators as PlumeValidatorFn)(this.service))
    }

    if ( this.additionalValidationMessages ) {
      this.defaultValidationMessages = new Map([
        ...this.defaultValidationMessages,
        ...this.additionalValidationMessages
      ]);
    }

    this.formInitialised.pipe(
      switchMap(() =>
        merge(
          this.control.valueChanges.pipe(startWith(this.control.value)),
          this.control.statusChanges
        ).pipe(
          takeUntil(this.unsubscribe),
          // update value and validity of linked questions on status - and value changes
          tap( this.updateLinkedElementsValueAndValidity.bind(this) ),
          // run mutators for value changes only
          filter((event) => !['VALID', 'INVALID', 'PENDING', 'DISABLED'].includes(event)),
          tap( this.executeLinkedElementsMutators.bind( this ) ),
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
    this.linkedElements.forEach(({ key }) => this.service.updateFormControl( key ));
  }

  private executeLinkedElementsMutators( value: T ) {
    this.linkedElements.forEach( linkedElement => {
      linkedElement.mutators.forEach( mutatorFn => mutatorFn( this.key, linkedElement.key, this.service, value ));
    });
  }
}
