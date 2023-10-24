import { ComponentRef, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  FormComponent,
  FormComponentModel,
  IDynamicFormElement,
  IDynamicFormService,
  IFormGroupComponent,
} from '../model';
import { Observable } from 'rxjs';
import { AbstractFormGroupComponent } from '../component/abstract-form-group/abstract-form-group.component';
import { isFormGroup } from '../util';

@Injectable()
export class DynamicFormService implements IDynamicFormService {
  private formComponentRefs: Map<string, FormComponentModel> = new Map();

  constructor(public formInitialised: Observable<null>) {}

  getFormComponentKeys(): string[] {
    return Array.from(this.formComponentRefs.keys());
  }

  updateFormControl(key: string) {
    const control = this.getFormComponentControl(key);
    if (control) {
      control.updateValueAndValidity({ emitEvent: false });
    }
  }

  private addFormComponentModel(
    key: string,
    formComponentModel: FormComponentModel,
  ) {
    this.formComponentRefs.set(key, formComponentModel);
  }

  private getFormComponentModel(key: string): FormComponentModel {
    return this.formComponentRefs.get(key);
  }

  private getFormComponentRef(key: string): ComponentRef<FormComponent> | null {
    const formComponentModel = this.getFormComponentModel(key);
    return formComponentModel ? formComponentModel.componentRef : null;
  }

  getFormComponent(key: string): FormComponent | null {
    const formComponentRef = this.getFormComponentRef(key);
    return formComponentRef ? formComponentRef.instance : null;
  }

  getFormComponentControl(key: string): AbstractControl | null {
    const formComponentModel = this.getFormComponentModel(key);
    return formComponentModel ? formComponentModel.control : null;
  }

  destroyFormComponent(key: string) {
    const formComponentModel = this.getFormComponentModel(key);
    formComponentModel.parent.removeFormControlFromForm(key);
    formComponentModel.componentRef.destroy();
    this.deleteFormComponentRef(key);
  }

  setElementVisibility(key: string, isVisible: boolean) {
    if (!isVisible) {
      this.getFormComponentRef(key).location.nativeElement.setAttribute(
        'hidden',
        '',
      );
    } else {
      this.getFormComponentRef(key).location.nativeElement.removeAttribute(
        'hidden',
      );
    }
  }

  addFormElementsToFormGroup(
    formElements: IDynamicFormElement[],
    formGroupKey: string,
  ) {
    const formGroup = this.getFormComponentRef(formGroupKey)
      .instance as IFormGroupComponent;
    formElements.forEach((formElement) =>
      formGroup.appendFormControlToForm(formElement),
    );
    this.updateFormElementComponents(formGroup, formElements);
  }

  removeFormElementsFromFormGroup(
    formElements: IDynamicFormElement[],
    formGroupKey: string,
  ) {
    const formGroup = this.getFormComponentRef(formGroupKey)
      .instance as IFormGroupComponent;
    formElements.forEach(({ key }) => {
      const formComponentModel = this.getFormComponentModel(key);
      if (formComponentModel && formComponentModel.parent === formGroup) {
        this.destroyFormComponent(key);
      }
    });
  }

  /**
   * Parses formGroupComponent element declarations and either adds them to the formGroupComponent or updates their respective components when they
   * have already been added.
   * @param {AbstractFormGroupComponent} formGroupComponent
   * @param {IDynamicFormElement[]} formElements
   * @private
   */
  updateFormElementComponents(
    formGroupComponent: IFormGroupComponent,
    formElements: IDynamicFormElement[],
  ) {
    // We should keep track of keys to see if a formerly present component should be removed now
    const formElementKeys: string[] = [];

    for (const formElement of formElements as IDynamicFormElement[]) {
      // Retrieve the component's reference
      let formComponentModel = this.getFormComponentModel(formElement.key);
      formElementKeys.push(formElement.key);

      // If we don't have a reference to the component, it means we haven't instantiated one yet
      if (!formComponentModel) {
        formComponentModel = this.createNewFormComponent(
          formElement,
          formGroupComponent,
        );

        this.addFormComponentModel(formElement.key, formComponentModel);
        this.setFormComponentInputs(formComponentModel, formElement);
        formComponentModel.componentRef.changeDetectorRef.detectChanges();
      }
    }

    // Verify that no formGroupComponent elements have been removed since the last time we parsed them
    const missingKeys = this.getFormComponentKeys().filter(
      (key) => !formElementKeys.includes(key),
    );
    if (missingKeys.length) {
      // Keys were present in the formComponentRef map, but not in the latest set of formGroupComponent elements provided
      missingKeys
        .filter(
          (missingKey) =>
            this.getFormComponentModel(missingKey).parent ===
            formGroupComponent,
        )
        .forEach((missingKey) => {
          // Remove component
          this.destroyFormComponent(missingKey);
        });
    }
  }

  private createNewFormComponent(
    formElement: IDynamicFormElement,
    formGroupComponent: IFormGroupComponent,
  ): FormComponentModel {
    return {
      componentRef: formGroupComponent.createFormComponent(
        formElement.component,
      ),
      parent: formGroupComponent,
      control: formGroupComponent.form.get(formElement.key),
    };
  }

  private deleteFormComponentRef(key: string) {
    this.formComponentRefs.delete(key);
  }

  private setFormComponentInputs(
    { componentRef, parent }: FormComponentModel,
    formElement: IDynamicFormElement,
  ) {
    formElement.inputKeys.forEach((inputKey) => {
      componentRef.setInput(
        inputKey,
        formElement[inputKey as keyof IDynamicFormElement],
      );
    });

    // form group
    if (isFormGroup(formElement)) {
      // provide form group
      componentRef.setInput('form', parent.form.get(formElement.key));
    }
  }
}
