import {
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subject, merge } from 'rxjs';
import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { filter, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { isAngularValidator, PlumeValidatorFn } from '../../validator';
import { LinkedElement } from '../../model/declaration/linked-element.interface';
import { DynamicFormElementValueType } from '../../model/dynamic-form-values.interface';
import { IDynamicFormService } from '../../model/service/dynamic-form.service.interface';
import { IFormQuestionComponent } from '../../model/component/form-question.component.interface';

@Directive()
export abstract class AbstractFormQuestionComponent<
    T extends DynamicFormElementValueType = DynamicFormElementValueType,
  >
  implements OnInit, OnDestroy, OnChanges, IFormQuestionComponent
{
  @Input() key: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() validators:
    | ValidatorFn
    | PlumeValidatorFn
    | (ValidatorFn | PlumeValidatorFn)[] = [];
  @Input() asyncValidators: AsyncValidatorFn | AsyncValidatorFn[] = [];
  @Input() value: T | T[];
  @Input() disabled = false;
  @Input() linkedElements: LinkedElement[] = [];
  @Input() additionalValidationMessages: Map<string, string>;

  defaultValidationMessages = new Map<string, string>([
    ['required', 'Required'],
  ]);

  protected unsubscribe = new Subject<null>();

  constructor(protected service: IDynamicFormService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['value'] &&
      changes['value'].currentValue !== this.control.value
    ) {
      this.control.setValue(changes['value'].currentValue);
    }
  }

  ngOnInit() {
    if (Array.isArray(this.validators)) {
      this.validators
        .filter((validator) => !isAngularValidator(validator))
        .forEach((validator) =>
          this.control.addValidators(
            (validator as PlumeValidatorFn)(this.service),
          ),
        );
    } else if (!isAngularValidator(this.validators)) {
      this.control.addValidators(
        (this.validators as PlumeValidatorFn)(this.service),
      );
    }

    if (this.additionalValidationMessages) {
      this.defaultValidationMessages = new Map([
        ...this.defaultValidationMessages,
        ...this.additionalValidationMessages,
      ]);
    }

    this.service.formInitialised
      .pipe(
        switchMap(() =>
          merge(
            this.control.valueChanges.pipe(startWith(this.control.value)),
            this.control.statusChanges,
          ).pipe(
            takeUntil(this.unsubscribe),
            // update value and validity of linked questions on status - and value changes
            tap(this.updateLinkedElementsValueAndValidity.bind(this)),
            // run mutators for value changes only
            filter(
              (event) =>
                !['VALID', 'INVALID', 'PENDING', 'DISABLED'].includes(event),
            ),
            tap(this.executeLinkedElementsMutators.bind(this)),
          ),
        ),
      )
      .subscribe();
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
    this.linkedElements.forEach(({ key }) =>
      this.service.updateFormControl(key),
    );
  }

  private executeLinkedElementsMutators(value: T) {
    this.linkedElements.forEach((linkedElement) => {
      linkedElement.mutators.forEach((mutatorFn) =>
        mutatorFn(this.key, linkedElement.key, this.service, value),
      );
    });
  }
}
