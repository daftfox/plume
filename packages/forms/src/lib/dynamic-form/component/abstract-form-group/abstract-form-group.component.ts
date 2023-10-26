import {
  AfterViewInit,
  ChangeDetectorRef,
  ComponentRef,
  createEnvironmentInjector,
  Directive,
  EnvironmentInjector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, iif, Observable, of, Subject } from 'rxjs';
import { DynamicFormService } from '../../service/dynamic-form.service';
import { startWith, tap } from 'rxjs/operators';
import { isFormGroup, isFormQuestion } from '../../util';
import {
  AbstractFormQuestion,
  DynamicFormValues,
  FormComponent,
  IDynamicFormElement,
  IFormGroupComponent,
} from '../../model';

@Directive()
export abstract class AbstractFormGroupComponent
  implements OnInit, AfterViewInit, OnDestroy, IFormGroupComponent
{
  @Input() form: FormGroup;
  @Input() key: string;
  @Input() label: string;
  @Input() formElements:
    | Observable<IDynamicFormElement[]>
    | IDynamicFormElement[];
  @Output() valueChanges: BehaviorSubject<DynamicFormValues> =
    new BehaviorSubject<DynamicFormValues>({} as DynamicFormValues);

  protected formOutlet: ViewContainerRef;

  protected childInjector: EnvironmentInjector;
  protected formInitialised = new Subject<null>();
  protected unsubscribe = new Subject<null>();

  protected constructor(
    protected cdRef: ChangeDetectorRef,

    // Only used by root node form group to create an EnvironmentInjector to be shared with downstream components
    protected injector: EnvironmentInjector,

    // Don't look for the DynamicFormService provider in the current ElementInjector
    protected service?: DynamicFormService,
  ) {}

  protected initService() {
    // Create new instance of the DynamicFormService. This is only performed by the root node
    if (!this.service) {
      this.service = new DynamicFormService(
        this.formInitialised.asObservable(),
      );
    }
  }

  ngOnInit() {
    this.childInjector = createEnvironmentInjector(
      [
        {
          provide: DynamicFormService,
          useValue: this.service,
        },
      ],
      this.injector,
    );
  }

  ngAfterViewInit() {
    // Notify subscribers that the formOutlet has been rendered and made available
    this.subscribeToFormElements();
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
  }

  get isValid(): boolean {
    if (!this.form) return false;
    return this.form.valid || this.form.disabled;
  }

  get isDisabled(): boolean {
    if (!this.form) return false;
    return this.form.disabled;
  }

  get value(): Observable<DynamicFormValues> {
    return this.valueChanges.asObservable();
  }

  get isPristine(): boolean {
    if (!this.form) return true;
    return this.form.pristine;
  }

  get isUntouched(): boolean {
    if (!this.form) return true;
    return this.form.untouched;
  }

  get isDirty(): boolean {
    if (!this.form) return false;
    return this.form.dirty;
  }

  /**
   * Initialises the form and its elements by using either an observable stream of element declarations or an array.
   *
   * New emits from the observable stream of element declarations will be parsed subsequently and their respective
   * form elements updated accordingly. When the declarations are passed in as an array, it will be handled through the
   * ngOnChanges life cycle hook.
   * @private
   */
  private subscribeToFormElements() {
    iif(
      () => this.formElements instanceof Observable,
      this.formElements as Observable<IDynamicFormElement[]>,
      of(this.formElements as IDynamicFormElement[]),
    )
      .pipe(this.initialiseForm.bind(this))
      .subscribe();
  }

  private initialiseForm(
    source: Observable<IDynamicFormElement[]>,
  ): Observable<IDynamicFormElement[]> {
    return source.pipe(
      tap((formElements) => {
        if (!this.form) {
          this.form = AbstractFormGroupComponent.createFormGroup(formElements);
          this.form.valueChanges
            .pipe(
              startWith(this.getFormValues(formElements)),
              tap((formValues) => this.valueChanges.next(formValues)),
            )
            .subscribe();

          // Detect changes so our formOutlet ViewContainerRef is rendered, and we can add components to it
          this.cdRef.detectChanges();
        }

        this.service.updateFormElementComponents(
          this,
          formElements as IDynamicFormElement[],
        );
      }),
      tap(() => setTimeout(() => this.formInitialised.next(null))),
    );
  }

  appendFormControlToForm(formElement: IDynamicFormElement) {
    this.form.addControl(
      formElement.key,
      AbstractFormGroupComponent.createAbstractControl(formElement),
    );
  }

  removeFormControlFromForm(key: string) {
    this.form.removeControl(key);
  }

  createFormComponent(
    component: Type<FormComponent>,
  ): ComponentRef<FormComponent> {
    return this.formOutlet.createComponent(component, {
      // Pass the current injector scope down to the component to be created
      injector: this.childInjector,
    });
  }

  protected getFormValues(
    formElements: IDynamicFormElement[],
    accumulator: { [key: string]: unknown } = {},
  ): DynamicFormValues {
    return formElements.reduce((acc, formElement) => {
      if (isFormQuestion(formElement)) {
        acc[formElement.key] = formElement.value;
      } else if (isFormGroup(formElement)) {
        acc[formElement.key] = {};
        Object.assign(
          acc[formElement.key],
          this.getFormValues(
            formElement.formElements,
            acc[formElement.key] as { [key: string]: unknown },
          ),
        );
      }

      return acc;
    }, accumulator) as DynamicFormValues;
  }

  static createAbstractControl(
    formElement: IDynamicFormElement,
  ): AbstractControl {
    let formControl: AbstractControl;
    if (isFormQuestion(formElement)) {
      formControl = AbstractFormGroupComponent.createFormElement(
        formElement as AbstractFormQuestion,
      );
    } else if (isFormGroup(formElement)) {
      formControl = AbstractFormGroupComponent.createFormGroup(
        formElement.formElements,
      );
    }

    return formControl;
  }

  /**
   * Map an array of FormQuestion objects to a FormGroup
   * @param formElements
   */
  static createFormGroup(formElements: IDynamicFormElement[]): FormGroup {
    const group: { [key: string]: AbstractControl } = {};

    for (const formElement of formElements) {
      if (isFormQuestion(formElement)) {
        group[formElement.key] = AbstractFormGroupComponent.createFormElement(
          formElement as AbstractFormQuestion,
        );
      } else if (isFormGroup(formElement)) {
        group[formElement.key] = AbstractFormGroupComponent.createFormGroup(
          formElement.formElements,
        );
      }
    }

    return new FormGroup(group);
  }

  static createFormElement(formElement: AbstractFormQuestion): FormControl {
    return formElement.getFormControl();
  }
}
