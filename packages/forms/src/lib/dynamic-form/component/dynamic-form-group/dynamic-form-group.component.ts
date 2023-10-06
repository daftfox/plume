import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef, createEnvironmentInjector, EnvironmentInjector,
  Input,
  OnChanges,
  OnInit, Optional,
  Output,
  SimpleChanges, SkipSelf, Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { BehaviorSubject, iif, Observable, of, ReplaySubject, Subject } from 'rxjs';
import {
  AbstractFormQuestion,
  DynamicFormGroup,
  DynamicFormValues, IDynamicFormElement,
  isFormGroup, isFormQuestion,
} from '../../model';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbstractFormGroupComponent } from '../abstract-form-group/abstract-form-group.component';
import { DynamicFormService, FormComponent } from '../../service/dynamic-form.service';
import { CommonModule, NgIf } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

@Component( {
  selector: 'plume-dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html',
  styleUrls: [ './dynamic-form-group.component.scss' ],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatBadgeModule,
    MatIconModule,
    NgIf,
    ReactiveFormsModule,
  ],
})
export class DynamicFormGroupComponent<FV = DynamicFormValues> extends AbstractFormGroupComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() rootNode = true;
  @Input() showControls = false;
  @Input() disabled = false;
  @Input() submitButtonLabel = 'Submit';
  @Input() submitButtonIcon: string;
  @Input() submitButtonBadgeLabel: string | number;
  @Input() cancelButtonLabel = 'Cancel';
  @Input() direction: 'column' | 'row' = 'column';
  @Input() displayedElements?: Observable<string[]>;

  @Output() formSubmit = new Subject<FV>();
  @Output() formCancel = new Subject<null>();
  @Output() valueChanges: BehaviorSubject<FV> = new BehaviorSubject<FV>( {} as FV );

  @ViewChild('formOutlet', { read: ViewContainerRef }) formOutlet: ViewContainerRef;

  private viewInitialised = new ReplaySubject<boolean>();

  childInjector: EnvironmentInjector;

  constructor(
    private cdRef: ChangeDetectorRef,

    // Don't look for the DynamicFormService provider in the current ElementInjector
    @SkipSelf() @Optional() private service: DynamicFormService<FV>,

    // Only used by root node form group to create an EnvironmentInjector to be shared with downstream components
    private injector: EnvironmentInjector
  ) {
    super();

    // Create new instance of the DynamicFormService. This is only performed by the root node
    if ( !this.service ) {
      this.service = new DynamicFormService(this);
    }
  }

  ngOnInit() {
    // The root node of this form instance shares its EnvironmentInjector to ensure all downstream components use
    // the same instance of DynamicFormService
    if ( this.rootNode ) {
      this.childInjector = createEnvironmentInjector([
        {
          provide: DynamicFormService,
          useValue: this.service
        }
      ], this.injector);
    }

    this.initialiseFormElements();

    if ( this.displayedElements ) {
      this.service.setDisplayedElements( this.displayedElements );
    }
  }

  ngAfterViewInit() {
    // Notify subscribers that the formOutlet has been rendered and made available
    this.viewInitialised.next( true );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formElements']) {
      return;
    }
  }

  /**
   * Initialises the form and its elements by using either an observable stream of element declarations or an array,
   * but we have to ensure the template (and thus the ViewContainerRef) has been initialised before we attempt to
   * dynamically add components to it.
   *
   * New emits from the observable stream of element declarations will be parsed subsequently and their respective
   * form elements updated accordingly. When the declarations are passed in as an array, it will be handled through the
   * ngOnChanges life cycle hook.
   * @private
   */
  private initialiseFormElements() {
    this.viewInitialised.pipe(
      switchMap( () => iif(
        () => this.formElements instanceof Observable,
        this.formElements as Observable<IDynamicFormElement[]>,
        of(this.formElements as IDynamicFormElement[])
      )),
      this.initialiseForm.bind(this)
    ).subscribe();
  }

  private initialiseForm( source: Observable<IDynamicFormElement[]> ): Observable<IDynamicFormElement[]> {
    return source.pipe(
      tap( formElements => {
        if ( !this.form ) {
          this.form = DynamicFormGroupComponent.createFormGroup( formElements );
          this.form.valueChanges.pipe(
            startWith( this.getFormValues( formElements ) ),
            tap( formValues => this.valueChanges.next( formValues ) ),
          ).subscribe();

          // Detect changes so our formOutlet ViewContainerRef is rendered, and we can add components to it
          this.cdRef.detectChanges();
        }

        this.service.updateFormElementComponents( this, formElements as IDynamicFormElement[], this.cdRef );
      }),
    );
  }

  private getFormValues( formElements: IDynamicFormElement[], accumulator: {[key: string]: unknown} = {} ): FV {
    return formElements.reduce( ( acc, formElement ) => {
      if ( isFormQuestion( formElement ) ) {
        acc[formElement.key] = formElement.value;
      } else if ( isFormGroup( formElement )) {
        acc[formElement.key] = {};
        Object.assign( acc[formElement.key], this.getFormValues( formElement.formElements, acc[formElement.key] as {[key: string]: unknown} ));
      }

      return acc;
    }, accumulator) as FV;
  }

  get value(): Observable<FV> {
    return this.valueChanges.asObservable();
  }

  get pristine(): boolean {
    if ( !this.form ) return true;
    return this.form.pristine;
  }

  get dirty(): boolean {
    if ( !this.form ) return false;
    return this.form.dirty;
  }

  /**
   * Wrapper method to emit new form values on submit
   */
  submit(): void {
    this.formSubmit.next(this.form.getRawValue());
  }

  cancel(): void {
    this.formCancel.next(null);
  }

  createFormComponent( component: Type<FormComponent> ): ComponentRef<FormComponent> {
    return this.formOutlet.createComponent(
      component, {
      // Pass the current injector scope down to the component to be created
      injector: this.rootNode ? this.childInjector : this.injector
    });
  }

  /**
   * Map an array of FormQuestion objects to a FormGroup
   * @param formElements
   */
  static createFormGroup( formElements: IDynamicFormElement[]): FormGroup {
    const group: { [key: string]: AbstractControl } = {};

    for (const formElement of formElements) {
      if (formElement instanceof AbstractFormQuestion) {
        group[formElement.key] = formElement.getFormControl();
      } else if (formElement instanceof DynamicFormGroup) {
        group[formElement.key] = DynamicFormGroupComponent.createFormGroup(formElement.formElements);
      }
    }

    return new FormGroup(group);
  }
}
