import { MockFormQuestionComponent } from '../../../../../mock/component/form-question.component.mock';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import resetAllMocks = jest.resetAllMocks;
import { DynamicFormService } from '../../service/dynamic-form.service';
import { Subject } from 'rxjs';
import {
  AbstractControl,
  FormControl,
  FormControlStatus,
  ValidatorFn,
} from '@angular/forms';
import { SimpleChanges } from '@angular/core';
import { IDynamicFormService } from '../../model/service/dynamic-form.service.interface';

const disabledControl = new FormControl();
disabledControl.disable();
const formComponents = new Map([
  ['mockControl', new FormControl()],
  ['disabledControl', disabledControl],
]);

const mockFormInitialised = new Subject<null>();
const getFormComponentControl = (key: string) => {
  return formComponents.get(key);
};

const mockUpdateFormControl = jest.fn();

describe('AbstractFormQuestionComponent', () => {
  let component: MockFormQuestionComponent;
  let fixture: ComponentFixture<MockFormQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicFormService,
          useValue: {
            formInitialised: mockFormInitialised.asObservable(),
            getFormComponentControl: getFormComponentControl,
            updateFormControl: mockUpdateFormControl,
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MockFormQuestionComponent);
    component = fixture.componentInstance;
    component.key = 'mockControl';
    fixture.detectChanges();
  });

  afterEach(() => {
    resetAllMocks();
  });

  it('should instantiate component', () => {
    expect(component).toBeTruthy();
  });

  describe('#get isDisabled', () => {
    it('should return that the control is not disabled', () => {
      expect(component.isDisabled).toBeFalsy();
    });

    it('should return that the control is disabled', () => {
      component.key = 'disabledControl';
      expect(component.isDisabled).toBeTruthy();
    });
  });

  describe('#get control', () => {
    it("should return the component's form control from the service", () => {
      expect(component.control).toBeTruthy();
    });
  });

  describe('#ngOnChanges', () => {
    afterEach(() => {
      formComponents.get('mockControl').reset();
    });

    it("should update the form control's value when the component value changes", () => {
      expect(component.control.value).toEqual(null);
      component.ngOnChanges({
        value: { currentValue: 'newValue' },
      } as unknown as SimpleChanges);
      expect(component.control.value).toEqual('newValue');
    });

    it("should not update the form control's value when a different input changes", () => {
      expect(component.control.value).toEqual(null);
      component.ngOnChanges({
        label: { currentValue: 'newLabel' },
      } as unknown as SimpleChanges);
      expect(component.control.value).toEqual(null);
    });
  });

  describe('#ngOnInit', () => {
    const mockValidator =
      (_service: IDynamicFormService): ValidatorFn =>
      (_control: AbstractControl) => {
        return null;
      };

    it('should add plume validators from array to the control', () => {
      const addValidatorSpy = jest.spyOn(component.control, 'addValidators');
      component.validators = [mockValidator, mockValidator];
      component.ngOnInit();
      expect(addValidatorSpy).toHaveBeenCalledTimes(2);
    });

    it('should add single plume validator to the control', () => {
      const addValidatorSpy = jest.spyOn(component.control, 'addValidators');
      component.validators = mockValidator;
      component.ngOnInit();
      expect(addValidatorSpy).toHaveBeenCalledTimes(1);
    });

    it('should have default validation messages', () => {
      component.ngOnInit();
      expect(component.defaultValidationMessages.size).toEqual(1);
      expect(component.defaultValidationMessages.get('required')).toEqual(
        'Required',
      );
    });

    it('should append additional validation messages to the default validation messages', () => {
      component.additionalValidationMessages = new Map([['mock', 'Mock']]);
      component.ngOnInit();
      expect(component.defaultValidationMessages.size).toEqual(2);
      expect(component.defaultValidationMessages.get('mock')).toEqual('Mock');
    });

    it('should execute updateLinkedElementsValueAndValidity once the form has been initialised', () => {
      const updateSpy = jest.spyOn(
        component as any,
        'updateLinkedElementsValueAndValidity',
      );
      expect(updateSpy).not.toHaveBeenCalled();
      mockFormInitialised.next(null);
      expect(updateSpy).toHaveBeenCalled();
    });

    it('should execute updateLinkedElementsValueAndValidity every time the value changes', () => {
      const updateSpy = jest.spyOn(
        component as any,
        'updateLinkedElementsValueAndValidity',
      );
      const mockValueChangesSubject = new Subject<string>();
      const mockStatusChangesSubject = new Subject<FormControlStatus>();
      jest.replaceProperty(
        component.control,
        'valueChanges',
        mockValueChangesSubject.asObservable(),
      );
      jest.replaceProperty(
        component.control,
        'statusChanges',
        mockStatusChangesSubject.asObservable(),
      );
      expect(updateSpy).not.toHaveBeenCalled();
      mockFormInitialised.next(null);
      expect(updateSpy).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalledTimes(1);
      mockValueChangesSubject.next('1');
      mockValueChangesSubject.next('2');
      mockValueChangesSubject.next('3');
      expect(updateSpy).toHaveBeenCalledTimes(4);
    });

    it('should execute updateLinkedElementsValueAndValidity every time the status changes', () => {
      const updateSpy = jest.spyOn(
        component as any,
        'updateLinkedElementsValueAndValidity',
      );
      const mockValueChangesSubject = new Subject<string>();
      const mockStatusChangesSubject = new Subject<FormControlStatus>();
      jest.replaceProperty(
        component.control,
        'valueChanges',
        mockValueChangesSubject.asObservable(),
      );
      jest.replaceProperty(
        component.control,
        'statusChanges',
        mockStatusChangesSubject.asObservable(),
      );
      expect(updateSpy).not.toHaveBeenCalled();
      mockFormInitialised.next(null);
      expect(updateSpy).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalledTimes(1);
      mockStatusChangesSubject.next('PENDING');
      mockValueChangesSubject.next('VALID');
      expect(updateSpy).toHaveBeenCalledTimes(3);
    });

    it('should stop executing updateLinkedElementsValueAndValidity after unsubscribing', () => {
      const updateSpy = jest.spyOn(
        component as any,
        'updateLinkedElementsValueAndValidity',
      );
      const mockValueChangesSubject = new Subject<string>();
      const mockStatusChangesSubject = new Subject<FormControlStatus>();
      jest.replaceProperty(
        component.control,
        'valueChanges',
        mockValueChangesSubject.asObservable(),
      );
      jest.replaceProperty(
        component.control,
        'statusChanges',
        mockStatusChangesSubject.asObservable(),
      );

      // should not have called update because form is not initialised
      expect(updateSpy).not.toHaveBeenCalled();

      // initialise form
      mockFormInitialised.next(null);

      // should have called update ONCE because the form was initialised
      expect(updateSpy).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalledTimes(1);

      // unsubscribe; no further executions of the update method should occur
      component['unsubscribe'].next(null);
      mockValueChangesSubject.next('VALID');
      mockValueChangesSubject.next('VALID');

      expect(updateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('#updateLinkedElementsValueAndValidity', () => {
    it('should update the form controls of every linked element', () => {
      component.linkedElements = [
        { key: 'linkedElement1', mutators: [] },
        { key: 'linkedElement2', mutators: [] },
      ];
      component['updateLinkedElementsValueAndValidity']();

      expect(mockUpdateFormControl).toHaveBeenCalledTimes(2);
      expect(mockUpdateFormControl).nthCalledWith(1, 'linkedElement1');
      expect(mockUpdateFormControl).nthCalledWith(2, 'linkedElement2');
    });

    it('should not update linked elements if there are none', () => {
      component.linkedElements = [];
      component['updateLinkedElementsValueAndValidity']();

      expect(mockUpdateFormControl).toHaveBeenCalledTimes(0);
    });
  });

  describe('#executeLinkedElementsMutators', () => {
    it('should execute mutators for every linked element', () => {
      const mockMutatorFn1 = jest.fn();
      const mockMutatorFn2 = jest.fn();
      const mockMutatorFn3 = jest.fn();
      component.linkedElements = [
        { key: 'linkedElement1', mutators: [mockMutatorFn1] },
        { key: 'linkedElement2', mutators: [mockMutatorFn2, mockMutatorFn3] },
      ];
      component['executeLinkedElementsMutators']('mockValue');
      expect(mockMutatorFn1).toHaveBeenCalledTimes(1);
      expect(mockMutatorFn2).toHaveBeenCalledTimes(1);
      expect(mockMutatorFn3).toHaveBeenCalledTimes(1);
      expect(mockMutatorFn1).toHaveBeenCalledWith(
        'mockControl',
        'linkedElement1',
        component['service'],
        'mockValue',
      );
    });
  });
});
