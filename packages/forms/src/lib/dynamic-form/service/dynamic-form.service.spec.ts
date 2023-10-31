import { Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import clearAllMocks = jest.clearAllMocks;
import {
  mockComponentRef,
  mockElementRef,
} from '../../../../mock/component/component-ref.mock';
import {
  mockFormControlParent,
  mockOtherFormControlParent,
} from '../../../../mock/component/form-control-parent.mock';
import {
  mockFormAction,
  mockFormOutput,
} from '../../../../mock/component/form-element-declarations.mock';
import {
  mockFormGroupComponentRef,
  mockFormGroupInstance,
  mockOtherFormGroupComponentRef,
  mockOtherFormGroupInstance,
} from '../../../../mock/component/form-group-component-ref.mock';
import { MockFormGroup } from '../../../../mock/component/form-group.component.mock';
import { FormComponentModel } from '../model/service/form-component-model.interface';
import { DynamicTextInput } from '../model/declaration/dynamic-text-input';
import { DynamicFormService } from './dynamic-form.service';

const mockFormControlKey = 'mockControl';
const mockFormGroupKey = mockFormGroupInstance.key;
const mockFormControl = new FormControl();
const mockFormGroup = new FormGroup({});
const mockOtherFormGroup = new FormGroup({});
const mockFormComponentModel = {
  control: mockFormControl,
  parent: mockFormGroupInstance,
  componentRef: mockComponentRef,
} as FormComponentModel;

const mockFormGroupComponentModel = {
  control: mockFormGroup,
  parent: mockFormControlParent,
  componentRef: mockFormGroupComponentRef,
} as FormComponentModel;

const mockOtherFormGroupComponentModel = {
  control: mockOtherFormGroup,
  parent: mockOtherFormControlParent,
  componentRef: mockOtherFormGroupComponentRef,
} as FormComponentModel;

const formInitialised = new Subject<null>();
describe('DynamicFormService', () => {
  let service: DynamicFormService;
  beforeEach(() => {
    service = new DynamicFormService(formInitialised.asObservable());
    service['addFormComponentModel'](
      mockFormControlKey,
      mockFormComponentModel,
    );
    service['addFormComponentModel'](
      mockFormGroupInstance.key,
      mockFormGroupComponentModel,
    );
    service['addFormComponentModel'](
      mockOtherFormGroupInstance.key,
      mockOtherFormGroupComponentModel,
    );
  });

  afterEach(() => {
    clearAllMocks();
  });

  it('should instantiate', () => {
    expect(service).toBeTruthy();
  });

  describe('#getFormComponentKeys', () => {
    it('should return an array of keys', () => {
      expect(service.getFormComponentKeys()).toEqual([
        mockFormControlKey,
        mockFormGroupKey,
        mockOtherFormGroupInstance.key,
      ]);
    });
  });

  describe('#updateFormControl', () => {
    it('should update the form control', () => {
      const updateSpy = jest.spyOn(mockFormControl, 'updateValueAndValidity');
      service.updateFormControl(mockFormControlKey);
      expect(updateSpy).toHaveBeenCalled();
    });

    it('should not update the form control when no control can be found', () => {
      const updateSpy = jest.spyOn(mockFormControl, 'updateValueAndValidity');
      service.updateFormControl('unknownKey');
      expect(updateSpy).not.toHaveBeenCalled();
    });
  });

  describe('#getFormComponentRef', () => {
    it('should return the component ref', () => {
      expect(service['getFormComponentRef'](mockFormControlKey)).toBeTruthy();
    });

    it('should not return the component ref when no control can be found', () => {
      expect(service['getFormComponentRef']('unknownKey')).toBeNull();
    });
  });

  describe('#getFormComponent', () => {
    it('should return the component instance', () => {
      expect(service.getFormComponent(mockFormControlKey)).toBeTruthy();
    });

    it('should not return the component instance when no control can be found', () => {
      expect(service.getFormComponent('unknownKey')).toBeNull();
    });
  });

  describe('#destroyFormComponent', () => {
    it('should destroy the component ref', () => {
      service.destroyFormComponent(mockFormControlKey);
      expect(mockFormComponentModel.componentRef.destroy).toHaveBeenCalled();
    });

    it('should instruct parent form group to remove form control from form', () => {
      service.destroyFormComponent(mockFormControlKey);
      expect(
        mockFormComponentModel.parent.removeFormControlFromForm,
      ).toHaveBeenCalledWith(mockFormControlKey);
    });
  });

  describe('#setElementVisibility', () => {
    it('should hide the form component', () => {
      service.setElementVisibility(mockFormControlKey, false);
      expect(mockElementRef.nativeElement.setAttribute).toHaveBeenCalledWith(
        'hidden',
        '',
      );
    });

    it('should display the form component', () => {
      service.setElementVisibility(mockFormControlKey, true);
      expect(mockElementRef.nativeElement.removeAttribute).toHaveBeenCalledWith(
        'hidden',
      );
    });
  });

  describe('#addFormElementsToFormGroup', () => {
    it('should append form controls to the form group', () => {
      const updateSpy = jest
        .spyOn(service, 'updateFormElementComponents')
        .mockImplementation(() => {});
      service.addFormElementsToFormGroup(
        [mockFormAction, mockFormOutput],
        mockFormGroupKey,
      );
      expect(
        mockFormGroupInstance.appendFormControlToForm,
      ).toHaveBeenCalledTimes(2);
    });

    it('should execute updateFormElementComponents', () => {
      const updateSpy = jest
        .spyOn(service, 'updateFormElementComponents')
        .mockImplementation(() => {});
      service.addFormElementsToFormGroup(
        [mockFormAction, mockFormOutput],
        mockFormGroupKey,
      );
      expect(updateSpy).toHaveBeenCalledWith(mockFormGroupInstance, [
        mockFormAction,
        mockFormOutput,
      ]);
    });
  });

  describe('#removeFormElementsFromFormGroup', () => {
    it('should destroy the component', () => {
      const destroySpy = jest
        .spyOn(service, 'destroyFormComponent')
        .mockImplementation(() => {});
      service.removeFormElementsFromFormGroup(
        [
          new DynamicTextInput({
            key: mockFormControlKey,
          }),
        ],
        mockFormGroupInstance.key,
      );

      expect(destroySpy).toHaveBeenCalledWith(mockFormControlKey);
    });

    it('should not destroy the component', () => {
      const destroySpy = jest
        .spyOn(service, 'destroyFormComponent')
        .mockImplementation(() => {});
      service.removeFormElementsFromFormGroup(
        [
          new DynamicTextInput({
            key: mockFormControlKey,
          }),
        ],
        mockOtherFormGroupInstance.key,
      );

      expect(destroySpy).not.toHaveBeenCalled();
    });
  });

  describe('#createNewFormComponent', () => {
    it('should return a FormComponentModel', () => {
      mockFormGroupInstance.form = new FormGroup<any>({
        mockInput: new FormControl(),
      });

      const result = service['createNewFormComponent'](
        new DynamicTextInput({
          key: 'mockInput',
        }),
        mockFormGroupInstance,
      );

      expect('componentRef' in result).toBeTruthy();
      expect('parent' in result).toBeTruthy();
      expect('control' in result).toBeTruthy();
    });
  });

  describe('#setFormComponentInputs', () => {
    it('should set the input for every input key set on the declaration class', () => {
      const mockFormElement = new DynamicTextInput({
        key: 'mockInput',
      });
      const mockFormComponentModel = {
        componentRef: mockComponentRef,
        parent: mockFormGroupInstance,
        control: new FormControl(),
      };

      service['setFormComponentInputs'](
        mockFormComponentModel,
        mockFormElement,
      );
      expect(mockComponentRef.setInput).toHaveBeenCalledTimes(
        mockFormElement.inputKeys.length,
      );
    });

    it('should set the form input for form groups', () => {
      const mockFormGroup = new MockFormGroup({
        key: 'mockGroup',
        formElements: [],
      });
      const mockForm = new FormGroup({});
      const mockFormComponentModel = {
        componentRef: mockComponentRef,
        parent: mockFormGroupInstance,
        control: mockForm,
      };

      mockFormGroupInstance.form.addControl('mockGroup', mockForm);

      service['setFormComponentInputs'](mockFormComponentModel, mockFormGroup);
      expect(mockComponentRef.setInput).toHaveBeenLastCalledWith(
        'form',
        mockForm,
      );
    });
  });
});
