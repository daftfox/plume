import {
  AfterViewInit, ChangeDetectorRef, Component, ComponentRef, Inject, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild, ViewContainerRef
} from '@angular/core';
import { iif, Observable, ReplaySubject, Subject, switchMap } from 'rxjs';
import {
  AbstractFormQuestion,
  DynamicFormGroup,
  DynamicFormValues, IDynamicFormComponent,
  isFormAction, isFormGroup, isFormQuestion,
} from '../../model';
import { tap } from 'rxjs/operators';
import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import {
  AbstractReactiveFormQuestionComponent
} from '../abstract-reactive-form-question/abstract-reactive-form-question.component';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AbstractFormGroupComponent } from '../abstract-form-group/abstract-form-group.component';

@Component({
  selector: 'slf-dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html',
  styleUrls: ['./dynamic-form-group.component.scss'],
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

  @Output() formSubmit = new Subject<FV>();
  @Output() formCancel = new Subject<null>();
  @Output() valueChanges: Observable<FV>;

  @ViewChild('formOutlet', { read: ViewContainerRef }) formOutlet: ViewContainerRef;

  private formComponentRef: Map<
    string,
    ComponentRef<
      AbstractFormGroupComponent |
      AbstractFormQuestionComponent |
      AbstractReactiveFormQuestionComponent<unknown>
    >> = new Map();
  private viewInitialised = new ReplaySubject<boolean>();

  constructor( @Inject(ChangeDetectorRef) private cdRef: ChangeDetectorRef ) {
    super();
  }

  ngOnInit() {
    this.initialiseFormElements();
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
    iif(
      () => this.formElements instanceof Observable,
      this.viewInitialised.pipe(
        switchMap( () => this.formElements ),
        tap(( formElements ) => this.initialiseForm( formElements as IDynamicFormComponent[] )),
        tap( ( formElements ) => this.parseFormElements( formElements as IDynamicFormComponent[] )),
      ),
      this.viewInitialised.pipe(
        tap( () => this.initialiseForm( this.formElements as IDynamicFormComponent[] )),
        tap( () => this.parseFormElements( this.formElements as IDynamicFormComponent[] )),
      )
    ).subscribe();
  }

  /**
   * Parses form element declarations and either adds them to the form or updates their respective components when they
   * have already been added.
   * @param {IDynamicFormComponent[]} formElements
   * @private
   */
  private parseFormElements( formElements: IDynamicFormComponent[] ) {
    if (!formElements) {
      return;
    }

    // We should keep track of keys to see if a formerly present component should be removed now
    const keys: string[] = [];

    for ( const element of this.formElements as IDynamicFormComponent[] ) {
      // Retrieve the component's reference
      let componentRef = this.formComponentRef.get( element.key );

      keys.push( element.key );

      // If we don't have a reference to the component, it means we haven't instantiated one yet
      if ( !componentRef ) {
        componentRef = this.addComponent( element );
        this.subscribeToComponentOutputs( componentRef );
      }

      this.setComponentInputs( componentRef, element );
    }

    // Verify that no form elements have been removed since the last time we parsed them
    const missingKeys = Array.from( this.formComponentRef.keys() ).filter( key => !keys.includes( key ));
    if ( missingKeys.length ) {
      // Keys were present in the formComponentRef map, but not in the latest set of form elements provided
      missingKeys.forEach( key => {
        // Remove component
        this.formComponentRef.get( key ).destroy();
      });
    }
  }

  /**
   * Initialises the local form instance and subscribes to value changes so these can be passed upwards.
   * @param {IDynamicFormComponent[]} formElements
   */
  private initialiseForm( formElements: IDynamicFormComponent[] ): void {
    if ( !this.form ) {
      this.form = DynamicFormGroupComponent.createFormGroup( formElements );

      // Detect changes so our formOutlet ViewContainerRef is rendered, and we can add components to it
      this.cdRef.detectChanges();
    }
  }

  get value(): FV {
    if ( !this.form ) return {} as FV;
    return this.form.value;
  }

  get valid(): boolean {
    if ( !this.form ) return true;
    return this.form.valid;
  }

  get pristine(): boolean {
    if ( !this.form ) return true;
    return this.form.pristine;
  }

  get dirty(): boolean {
    if ( !this.form ) return false;
    return this.form.dirty;
  }

  private refreshLinkedQuestion<T = unknown>( {key, args}: {key: string, args: Map<string, T>} ) {
    const linkedQuestion = this.formComponentRef.get( key );
    (linkedQuestion.instance as AbstractReactiveFormQuestionComponent<T>).refresh( args );
  }

  private clearArguments<T = unknown>( key: string ) {
    const linkedQuestion = this.formComponentRef.get( key );
    (linkedQuestion.instance as AbstractReactiveFormQuestionComponent<T>).clearArgs();
  }

  /**
   * Wrapper method to emit new form values on submit
   */
  submit(): void {
    this.formSubmit.next(this.value);
  }

  cancel(): void {
    this.formCancel.next(null);
  }

  private addComponent( formElement: IDynamicFormComponent ): ComponentRef<
    AbstractReactiveFormQuestionComponent<unknown> |
    AbstractFormQuestionComponent |
    AbstractFormGroupComponent>
  {
    const ref = this.formOutlet.createComponent( formElement.component );
    this.formComponentRef.set(formElement.key, ref);
    return ref;
  }

  private setComponentInputs(
    ref: ComponentRef<
      AbstractReactiveFormQuestionComponent<unknown> |
      AbstractFormQuestionComponent |
      AbstractFormGroupComponent
    >,
    formElement: IDynamicFormComponent
  ) {
    ref.setInput( 'key', formElement.key );

    // this is an element implementing the IFormQuestion interface
    if ( isFormQuestion( formElement ) ) {
      ref.setInput( 'validators', formElement.validators );
      ref.setInput( 'asyncValidators', formElement.asyncValidators );
      ref.setInput( 'label', formElement.label );
      ref.setInput( 'value', formElement.value );
      ref.setInput( 'disabled', formElement.disabled );
      ref.setInput( 'linkedElements', formElement.linkedElements );
      ref.setInput( 'mutators', formElement.mutators );

      // provide the form component's parent form group instance
      ref.setInput( 'form', this.form );

      if ( 'maxLength' in formElement ) {
        ref.setInput( 'maxLength', formElement['maxLength'] );
      }
      if ( 'type' in formElement ) {
        ref.setInput( 'type', formElement['type'] );
      }
      if ( 'icon' in formElement ) {
        ref.setInput( 'icon', formElement['icon'] );
      }
      if ( 'rows' in formElement ) {
        ref.setInput( 'rows', formElement['rows'] );
      }

      // this is an element implementing the IReactiveFormQuestion interface
      if ( 'dataSource' in formElement ) {
        ref.setInput( 'dataSource', formElement['dataSource'] );
      }
      if ( 'allowMultiple' in formElement ) {
        ref.setInput( 'allowMultiple', formElement['allowMultiple'] );
      }
      if ( 'nullable' in formElement ) {
        ref.setInput( 'nullable', formElement['nullable'] );
      }
      if ( 'useSelectAll' in formElement ) {
        ref.setInput( 'useSelectAll', formElement['useSelectAll'] );
      }
      if ( 'noEntriesFoundLabel' in formElement ) {
        ref.setInput( 'noEntriesFoundLabel', formElement['noEntriesFoundLabel'] );
      }
      if ( 'useFilter' in formElement ) {
        ref.setInput( 'useFilter', formElement['useFilter'] );
      }
      if ( 'options' in formElement ) {
        ref.setInput( 'options', formElement['options'] );
      }

      if ( 'startView' in formElement ) {
        ref.setInput( 'startView', formElement['startView'] );
      }
      if ( 'mode' in formElement ) {
        ref.setInput( 'mode', formElement['mode'] );
      }
    }

    // this is an element implementing the IFormAction interface
    if ( isFormAction( formElement ) ) {
      ref.setInput( 'action', formElement.action );

      if ( 'color' in formElement ) {
        ref.setInput( 'color', formElement['color'] );
      }
      if ( 'icon' in formElement ) {
        ref.setInput( 'icon', formElement['icon'] );
      }
      if ( 'raised' in formElement ) {
        ref.setInput( 'raised', formElement['raised'] );
      }
    }

    // form group
    if ( isFormGroup( formElement ) ) {
      ref.setInput( 'formElements', (formElement as DynamicFormGroup).formElements );
      ref.setInput( 'direction', (formElement as DynamicFormGroup).direction );

      // provide form group
      ref.setInput( 'form', this.form.get(formElement.key) );
    }

    this.cdRef.detectChanges();
  }

  private subscribeToComponentOutputs(
    ref: ComponentRef<
      AbstractReactiveFormQuestionComponent<unknown> |
      AbstractFormQuestionComponent |
      AbstractFormGroupComponent
    >
  ) {
    if ( ref.instance instanceof AbstractFormQuestionComponent ) {
      ref.instance.refreshLinkedQuestion.pipe(
        tap( this.refreshLinkedQuestion.bind( this ) )
      ).subscribe();

      ref.instance.clearArguments.pipe(
        tap( this.clearArguments.bind( this ) )
      ).subscribe();
    }
  }

  /**
   * Map an array of FormQuestion objects to a FormGroup
   * @param formElements
   */
  static createFormGroup( formElements: IDynamicFormComponent[]): FormGroup {
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
