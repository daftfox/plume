import { ComponentRef, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynamicFormGroupComponent } from '../component/dynamic-form-group/dynamic-form-group.component';
import { AbstractFormGroupComponent } from '../component/abstract-form-group/abstract-form-group.component';
import { AbstractFormQuestionComponent } from '../component/abstract-form-question/abstract-form-question.component';
import { AbstractReactiveFormQuestionComponent } from '../component/abstract-reactive-form-question/abstract-reactive-form-question.component';
import { AbstractReactiveFormElementComponent } from '../component/abstract-reactive-form-element/abstract-reactive-form-element.component';
import {
  isFormAction,
  isFormGroup,
  isFormQuestion,
  DynamicFormGroup,
  DynamicFormValues,
  IDynamicFormElement
} from '../model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export type FormComponent = AbstractFormGroupComponent |
  AbstractFormQuestionComponent |
  AbstractReactiveFormQuestionComponent<unknown> |
  AbstractReactiveFormElementComponent<unknown>;

interface FormComponentModel<FV = DynamicFormValues> {
  componentRef: ComponentRef<FormComponent>;
  parent: DynamicFormGroupComponent<FV>;
  control: AbstractControl
}

@Injectable()
export class DynamicFormService<FV = DynamicFormValues> {
  private formComponentRefs: Map<string, FormComponentModel<FV>> = new Map();

  constructor( private formInitialised: Observable<null> ) {}

  getFormComponentKeys(): string[] {
    return Array.from(this.formComponentRefs.keys());
  }

  setDisplayedElements( displayedElements: Observable<string[]> ) {
    displayedElements.pipe(
      tap( displayedElements => {
        this.getFormComponentKeys().forEach( key => {
          this.setElementVisibility( key, !displayedElements.includes( key ));
        })
      })
    ).subscribe();
  }

  updateFormControl( key: string  ) {
    const control = this.getFormComponentControl( key );
    if ( control ) {
      control.updateValueAndValidity({ emitEvent: false });
    }
  }

  private addFormComponentRef( key: string, formComponentModel: FormComponentModel<FV> ) {
    this.formComponentRefs.set( key, formComponentModel );
  }

  private getFormComponentModel( key: string ): FormComponentModel<FV> {
    return this.formComponentRefs.get( key );
  }

  private getFormComponentRef( key: string ): ComponentRef<FormComponent> {
    return this.getFormComponentModel( key ).componentRef;
  }

  getFormComponent( key: string ): FormComponent {
    return this.getFormComponentRef( key ).instance;
  }

  getFormComponentControl( key: string ): AbstractControl {
    return this.getFormComponentModel( key ).control;
  }

  destroyFormComponent( key: string ) {
    this.getFormComponentRef( key ).destroy();
    this.deleteFormComponentRef( key );
  }

  setElementVisibility( key: string, isVisible: boolean ) {
    if ( !isVisible ) {
      this.getFormComponentRef(key).location.nativeElement.setAttribute('hidden', '');
    } else {
      this.getFormComponentRef(key).location.nativeElement.removeAttribute('hidden');
    }
  }

  /**
   * Parses formGroupComponent element declarations and either adds them to the formGroupComponent or updates their respective components when they
   * have already been added.
   * @param {FormGroup} formGroupComponent
   * @param {IDynamicFormElement[]} formElements
   * @param {ChangeDetectorRef} changeDetectorRef
   * @private
   */
  updateFormElementComponents(
    formGroupComponent: DynamicFormGroupComponent<FV>,
    formElements: IDynamicFormElement[],
  ) {
    if (!formElements) {
      return;
    }

    // We should keep track of keys to see if a formerly present component should be removed now
    const formElementKeys: string[] = [];

    for ( const formElement of formElements as IDynamicFormElement[] ) {
      // Retrieve the component's reference
      let formComponentModel = this.getFormComponentModel( formElement.key );
      formElementKeys.push( formElement.key );


      // If we don't have a reference to the component, it means we haven't instantiated one yet
      if ( !formComponentModel ) {
        formComponentModel = {
          componentRef: formGroupComponent.createFormComponent( formElement.component ),
          parent: formGroupComponent,
          control: formGroupComponent.form.get( formElement.key )
        };

        this.addFormComponentRef( formElement.key, formComponentModel );
        // this.subscribeToFormComponentOutputs( formComponentModel.componentRef.instance );
      }

      this.setFormComponentInputs( formComponentModel, formElement );
    }

    // @FIXME does not work because the formElements provided by each formGroup differ from group to group
    // // Verify that no formGroupComponent elements have been removed since the last time we parsed them
    // const missingKeys = this.getFormComponentKeys().filter( key => !formElementKeys.includes( key ));
    // if ( missingKeys.length ) {
    //   // Keys were present in the formComponentRef map, but not in the latest set of formGroupComponent elements provided
    //   missingKeys.forEach( missingKey => {
    //     // Remove component
    //     this.destroyFormComponent( missingKey );
    //   });
    // }
  }

  // private subscribeToFormComponentOutputs(
  //   formComponent: FormComponent
  // ) {
  //   if ( formComponent instanceof AbstractFormQuestionComponent ) {
  //     formComponent.refreshLinkedQuestion.pipe(
  //       tap( this.refreshLinkedQuestion.bind( this ) )
  //     ).subscribe();
  //
  //     formComponent.clearArguments.pipe(
  //       tap( this.clearArguments.bind( this ) )
  //     ).subscribe();
  //   }
  // }

  private clearArguments<T = unknown>( key: string ) {
    const linkedQuestion = this.getFormComponentRef( key );
    (linkedQuestion.instance as AbstractReactiveFormQuestionComponent<T>).clearArgs();
  }

  private deleteFormComponentRef( key: string ) {
    this.formComponentRefs.delete( key );
  }

  private setFormComponentInputs( { componentRef, parent }: FormComponentModel<FV>, formElement: IDynamicFormElement ) {
    componentRef.setInput( 'key', formElement.key );

    // this is an element implementing the IFormQuestion interface
    if ( isFormQuestion( formElement ) ) {
      componentRef.setInput( 'formInitialised', this.formInitialised );
      componentRef.setInput( 'validators', formElement.validators );
      componentRef.setInput( 'asyncValidators', formElement.asyncValidators );
      componentRef.setInput( 'label', formElement.label );
      componentRef.setInput( 'value', formElement.value );
      componentRef.setInput( 'disabled', formElement.disabled );
      componentRef.setInput( 'linkedElements', formElement.linkedElements );

      if ( 'maxLength' in formElement ) {
        componentRef.setInput( 'maxLength', formElement['maxLength'] );
      }
      if ( 'additionalValidationMessages' in formElement ) {
        componentRef.setInput( 'additionalValidationMessages', formElement['additionalValidationMessages'] );
      }
      if ( 'type' in formElement ) {
        componentRef.setInput( 'type', formElement['type'] );
      }
      if ( 'icon' in formElement ) {
        componentRef.setInput( 'icon', formElement['icon'] );
      }
      if ( 'rows' in formElement ) {
        componentRef.setInput( 'rows', formElement['rows'] );
      }

      if ( 'allowMultiple' in formElement ) {
        componentRef.setInput( 'allowMultiple', formElement['allowMultiple'] );
      }
      if ( 'nullable' in formElement ) {
        componentRef.setInput( 'nullable', formElement['nullable'] );
      }
      if ( 'useSelectAll' in formElement ) {
        componentRef.setInput( 'useSelectAll', formElement['useSelectAll'] );
      }
      if ( 'noEntriesFoundLabel' in formElement ) {
        componentRef.setInput( 'noEntriesFoundLabel', formElement['noEntriesFoundLabel'] );
      }
      if ( 'useFilter' in formElement ) {
        componentRef.setInput( 'useFilter', formElement['useFilter'] );
      }
      if ( 'options' in formElement ) {
        componentRef.setInput( 'options', formElement['options'] );
      }

      if ( 'startView' in formElement ) {
        componentRef.setInput( 'startView', formElement['startView'] );
      }
      if ( 'mode' in formElement ) {
        componentRef.setInput( 'mode', formElement['mode'] );
      }
    }

    // this is an element implementing the IReactiveFormElement interface

    if ( 'dataSource' in formElement ) {
      componentRef.setInput( 'dataSource', formElement['dataSource'] );
    }
    if ( 'accumulateArguments' in formElement ) {
      componentRef.setInput( 'accumulateArguments', formElement['accumulateArguments'] );
    }

    // this is an element implementing the IFormAction interface
    if ( isFormAction( formElement ) ) {
      componentRef.setInput( 'action', formElement.action );

      if ( 'color' in formElement ) {
        componentRef.setInput( 'color', formElement['color'] );
      }
      if ( 'icon' in formElement ) {
        componentRef.setInput( 'icon', formElement['icon'] );
      }
      if ( 'raised' in formElement ) {
        componentRef.setInput( 'raised', formElement['raised'] );
      }
    }

    // form group
    if ( isFormGroup( formElement ) ) {
      componentRef.setInput( 'rootNode', false );
      componentRef.setInput( 'formElements', (formElement as DynamicFormGroup).formElements );
      componentRef.setInput( 'direction', (formElement as DynamicFormGroup).direction );

      // provide form group
      componentRef.setInput( 'form', parent.form.get( formElement.key ) );
    }
  }
}
