import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockFormGroupComponent } from '../../../../../mock/component/form-group.component.mock';
import { ComponentRef, ViewContainerRef } from '@angular/core';
jest.mock('../../service/dynamic-form.service');
import { Observable, of, switchMap } from 'rxjs';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import resetAllMocks = jest.resetAllMocks;
import { tap } from 'rxjs/operators';
import { DynamicTextInput } from '../../model/declaration/dynamic-text-input';
import { AbstractFormGroupComponent } from '../../component/abstract-form-group/abstract-form-group.component';
import { DynamicFormService } from '../../service/dynamic-form.service';
import { DynamicTextInputComponent } from '../dynamic-text-input/dynamic-text-input.component';
import { DynamicFormGroup } from '../../model/declaration/dynamic-form-group';

describe('AbstractFormGroupComponent', () => {
  let componentRef: ComponentRef<MockFormGroupComponent>;
  let componentFixture: ComponentFixture<MockFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();
    componentFixture = TestBed.createComponent(MockFormGroupComponent);
    componentRef = componentFixture.componentRef;
    componentFixture.detectChanges();
  });

  afterEach(() => {
    resetAllMocks();
  });

  it('should instantiate component', () => {
    expect(componentRef).toBeTruthy();
  });

  it('should not have created a new DynamicFormService instance yet', () => {
    expect(componentRef.instance['service']).toBeFalsy();
  });

  describe('#initService', () => {
    it('should instantiate the service property', () => {
      componentRef.instance['initService']();
      expect(componentRef.instance['service']).toBeTruthy();
    });
  });

  describe('with initialised service', () => {
    beforeEach(() => {
      componentRef.instance['initService']();
    });

    describe('#get isValid', () => {
      it('should return that the form is valid', () => {
        componentRef.setInput(
          'form',
          new FormGroup({
            validControl: new FormControl(),
          }),
        );
        componentFixture.detectChanges();
        expect(componentRef.instance.isValid).toBeTruthy();
      });

      it('should return that the form is valid', () => {
        const form = new FormGroup({
          invalidControl: new FormControl(null, [Validators.required]),
        });
        form.disable();
        componentRef.setInput('form', form);
        componentFixture.detectChanges();
        expect(componentRef.instance.isValid).toBeTruthy();
      });

      it('should return that the form is not valid', () => {
        componentRef.setInput(
          'form',
          new FormGroup({
            invalidControl: new FormControl(null, [Validators.required]),
          }),
        );
        componentFixture.detectChanges();
        expect(componentRef.instance.isValid).toBeFalsy();
      });
    });

    describe('#get isDisabled', () => {
      it('should return that the form is not valid', () => {
        componentRef.setInput(
          'form',
          new FormGroup({
            invalidControl: new FormControl(null, [Validators.required]),
          }),
        );
        componentFixture.detectChanges();
        expect(componentRef.instance.isDisabled).toBeFalsy();
      });

      it('should return that the form is valid', () => {
        const form = new FormGroup({
          invalidControl: new FormControl(null, [Validators.required]),
        });
        form.disable();
        componentRef.setInput('form', form);
        componentFixture.detectChanges();
        expect(componentRef.instance.isValid).toBeTruthy();
      });
    });

    describe('#get value', () => {
      it('should return an observable', () => {
        expect(componentRef.instance.value instanceof Observable).toBeTruthy();
      });
    });

    describe('#get isPristine', () => {
      it('should return that the form is pristine', () => {
        const form = new FormGroup({
          invalidControl: new FormControl(null, [Validators.required]),
        });
        componentRef.setInput('form', form);
        componentFixture.detectChanges();
        expect(componentRef.instance.isPristine).toBeTruthy();
      });

      it('should return that the form is not pristine', () => {
        const formControl = new FormControl(null, [Validators.required]);
        const form = new FormGroup({
          invalidControl: formControl,
        });
        formControl.markAsDirty();
        componentRef.setInput('form', form);
        componentFixture.detectChanges();
        expect(componentRef.instance.isPristine).toBeFalsy();
      });
    });

    describe('#get isDirty', () => {
      it('should return that the form is not dirty', () => {
        const form = new FormGroup({
          invalidControl: new FormControl(null, [Validators.required]),
        });
        componentRef.setInput('form', form);
        componentFixture.detectChanges();
        expect(componentRef.instance.isDirty).toBeFalsy();
      });

      it('should return that the form is dirty', () => {
        const formControl = new FormControl(null, [Validators.required]);
        const form = new FormGroup({
          invalidControl: formControl,
        });
        formControl.markAsDirty();
        componentRef.setInput('form', form);
        componentFixture.detectChanges();
        expect(componentRef.instance.isDirty).toBeTruthy();
      });
    });

    describe('#subscribeToFormElements', () => {
      it('should execute initialiseForm when formElements input is assigned array of form elements', () => {
        // disable ngAfterViewInit executing initialiseFormElements method automagically
        jest
          .spyOn(componentRef.instance, 'ngAfterViewInit')
          .mockImplementation();
        const initFormSpy = jest.spyOn(
          componentRef.instance as any,
          'initialiseForm',
        );
        componentRef.setInput('formElements', [
          new DynamicTextInput({ key: 'mockInput', label: 'Mock input' }),
        ]);
        componentRef.instance['subscribeToFormElements']();
        expect(initFormSpy).toHaveBeenCalled();
      });

      it('should execute initialiseForm when formElements input is assigned observable array of form elements', () => {
        // disable ngAfterViewInit executing initialiseFormElements method automagically
        jest
          .spyOn(componentRef.instance, 'ngAfterViewInit')
          .mockImplementation();
        const initFormSpy = jest.spyOn(
          componentRef.instance as any,
          'initialiseForm',
        );
        componentRef.setInput(
          'formElements',
          of([new DynamicTextInput({ key: 'mockInput', label: 'Mock input' })]),
        );
        componentRef.instance['subscribeToFormElements']();
        expect(initFormSpy).toHaveBeenCalled();
      });
    });

    describe('#initialiseForm', () => {
      it('should assign the form', (done) => {
        componentRef.instance['initialiseForm'](
          of([new DynamicTextInput({ key: 'mockInput', label: 'Mock input' })]),
        ).subscribe(() => {
          expect(componentRef.instance.form).toBeTruthy();
          done();
        });
      });

      it('should not reassign the form', (done) => {
        const createFormGroupSpy = jest.spyOn(
          AbstractFormGroupComponent,
          'createFormGroup',
        );
        componentRef.instance.form = new FormGroup({});
        componentRef.instance['initialiseForm'](
          of([new DynamicTextInput({ key: 'mockInput', label: 'Mock input' })]),
        ).subscribe(() => {
          expect(createFormGroupSpy).not.toHaveBeenCalled();
          done();
        });
      });

      it('should have executed updateFormElementComponents', (done) => {
        const formElements = [
          new DynamicTextInput({ key: 'mockInput', label: 'Mock input' }),
        ];
        componentRef.instance['initialiseForm'](of(formElements)).subscribe(
          () => {
            expect(
              (DynamicFormService as any).mock.instances[0]
                .updateFormElementComponents,
            ).toHaveBeenCalledWith(componentRef.instance, formElements);
            done();
          },
        );
      });

      it('should emit value changes when form value changes', (done) => {
        const formElements = [
          new DynamicTextInput({ key: 'mockInput', label: 'Mock input' }),
        ];

        componentRef.instance['initialiseForm'](of(formElements))
          .pipe(
            // manually set form value to trigger emit
            tap(() =>
              componentRef.instance.form.setValue({ mockInput: 'mockValue' }),
            ),
            // subscribe to valueChanges AFTER setting value to get the last emitted value
            switchMap(() => componentRef.instance.valueChanges),
          )
          .subscribe((value) => {
            expect(value).toEqual({ mockInput: 'mockValue' });
            done();
          });
      });
    });

    describe('#appendFormControlToForm', () => {
      it('should add form control to form', () => {
        const form = new FormGroup({});
        const formElement = new DynamicTextInput({
          key: 'mockInput',
          label: 'Mock input',
        });
        const addControlSpy = jest.spyOn(form, 'addControl');
        componentRef.instance.form = form;
        componentRef.instance.appendFormControlToForm(formElement);
        expect(addControlSpy).toHaveBeenCalled();
        expect(form.get('mockInput')).toBeTruthy();
      });
    });

    describe('#removeFormControlFromForm', () => {
      it('should remove form control from form', () => {
        const form = new FormGroup({
          mockInput: new FormControl(),
        });
        const removeControlSpy = jest.spyOn(form, 'removeControl');
        componentRef.instance.form = form;
        componentRef.instance.removeFormControlFromForm('mockInput');
        expect(removeControlSpy).toHaveBeenCalled();
        expect(form.get('mockInput')).toBeFalsy();
      });
    });

    describe('#createFormComponent', () => {
      it('should create form component and append it to the form outlet', () => {
        componentRef.instance.formOutlet = {
          createComponent: jest.fn(),
        } as unknown as ViewContainerRef;
        componentRef.instance.createFormComponent(DynamicTextInputComponent);
        expect(
          componentRef.instance.formOutlet.createComponent,
        ).toHaveBeenCalled();
      });
    });

    describe('#getFormValues', () => {
      it('should return the aggregated values of the form elements passed in', () => {
        const result = componentRef.instance['getFormValues']([
          new DynamicTextInput({
            key: 'mockInput',
            label: 'Mock input',
            value: 'mock',
          }),
          new DynamicFormGroup({
            key: 'mockGroup',
            formElements: [
              new DynamicTextInput({
                key: 'nestedMockInput',
                label: 'Nested mock input',
                value: 'nested mock',
              }),
            ],
          }),
        ]);

        expect(result).toEqual({
          mockInput: 'mock',
          mockGroup: { nestedMockInput: 'nested mock' },
        });
      });
    });

    describe('#createAbstractControl', () => {
      it('should return an AbstractControl', () => {
        expect(
          AbstractFormGroupComponent.createAbstractControl(
            new DynamicTextInput({ key: 'mockInput', label: 'Mock input' }),
          ) instanceof AbstractControl,
        ).toBeTruthy();
      });

      it('should return a FormControl', () => {
        expect(
          AbstractFormGroupComponent.createAbstractControl(
            new DynamicTextInput({ key: 'mockInput', label: 'Mock input' }),
          ) instanceof FormControl,
        ).toBeTruthy();
      });

      it('should return a FormGroup', () => {
        expect(
          AbstractFormGroupComponent.createAbstractControl(
            new DynamicFormGroup({ key: 'mockGroup', formElements: [] }),
          ) instanceof FormGroup,
        ).toBeTruthy();
      });
    });

    describe('#createFormGroup', () => {
      it('should return a FormGroup', () => {
        expect(
          AbstractFormGroupComponent.createFormGroup([
            new DynamicTextInput({ key: 'mockInput', label: 'Mock input' }),
          ]) instanceof FormGroup,
        ).toBeTruthy();
      });

      it('should return a FormGroup with nested controls', () => {
        const result = AbstractFormGroupComponent.createFormGroup([
          new DynamicTextInput({ key: 'mockInput', label: 'Mock input' }),
          new DynamicFormGroup({
            key: 'mockGroup',
            formElements: [
              new DynamicTextInput({
                key: 'nestedMockInput',
                label: 'Nested mock input',
              }),
            ],
          }),
        ]);
        expect(result instanceof FormGroup).toBeTruthy();
        expect(result.get('mockInput')).toBeTruthy();
        expect(result.get('mockGroup')).toBeTruthy();
        expect(result.get('mockGroup').get('nestedMockInput')).toBeTruthy();
      });
    });

    describe('#createFormElement', () => {
      it('should return a FormControl', () => {
        expect(
          AbstractFormGroupComponent.createFormElement(
            new DynamicTextInput({ key: 'mockInput', label: 'Mock input' }),
          ) instanceof FormControl,
        ).toBeTruthy();
      });
    });
  });
});
