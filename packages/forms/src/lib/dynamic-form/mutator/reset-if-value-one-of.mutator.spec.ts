import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { AbstractControl, FormControl } from '@angular/forms';
import { resetIfValueOneOf } from './reset-if-value-one-of.mutator';

const mockFormControlKey = 'mockFormQuestionComponent';
const formControls = new Map<string, AbstractControl>();
const mockDynamicFormService = {
  getFormComponentControl(key: string): AbstractControl {
    return formControls.get(key);
  },
} as IDynamicFormService;

describe('resetIfValueOneOf', () => {
  const mockValue = 'mock';
  let mockFormControl: FormControl;

  beforeEach(() => {
    mockFormControl = new FormControl();
    formControls.set(mockFormControlKey, mockFormControl);
  });

  it('should reset the control if control value is present in array of asserted values', () => {
    const disableSpy = jest.spyOn(mockFormControl, 'reset');
    resetIfValueOneOf([mockValue])(
      'mockOrigin',
      mockFormControlKey,
      mockDynamicFormService,
      mockValue,
    );
    expect(disableSpy).toHaveBeenCalled();
  });

  it('should not reset the control if control value is not present in array of asserted values', () => {
    const enableSpy = jest.spyOn(mockFormControl, 'reset');
    resetIfValueOneOf([mockValue])(
      'mockOrigin',
      mockFormControlKey,
      mockDynamicFormService,
      'notEqualValue',
    );
    expect(enableSpy).not.toHaveBeenCalled();
  });
});
