import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { AbstractControl, FormControl } from '@angular/forms';
import { resetIfValueEquals } from './reset-if-value-equals.mutator';

const mockFormControlKey = 'mockFormQuestionComponent';
const formControls = new Map<string, AbstractControl>();
const mockDynamicFormService = {
  getFormComponentControl(key: string): AbstractControl {
    return formControls.get(key);
  },
} as IDynamicFormService;

describe('resetIfValueEquals', () => {
  const mockValue = 'mock';
  let mockFormControl: FormControl;

  beforeEach(() => {
    mockFormControl = new FormControl();
    formControls.set(mockFormControlKey, mockFormControl);
  });

  it('should reset the control if values are equal', () => {
    const disableSpy = jest.spyOn(mockFormControl, 'reset');
    resetIfValueEquals(mockValue)(
      'mockOrigin',
      mockFormControlKey,
      mockDynamicFormService,
      mockValue,
    );
    expect(disableSpy).toHaveBeenCalled();
  });

  it('should not reset the control if values are not equal', () => {
    const enableSpy = jest.spyOn(mockFormControl, 'reset');
    resetIfValueEquals(mockValue)(
      'mockOrigin',
      mockFormControlKey,
      mockDynamicFormService,
      'notEqualValue',
    );
    expect(enableSpy).not.toHaveBeenCalled();
  });
});
