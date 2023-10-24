import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { AbstractControl, FormControl } from '@angular/forms';
import { resetIfValueNotNullish } from './reset-if-value-not-nullish.mutator';

const mockFormControlKey = 'mockFormQuestionComponent';
const formControls = new Map<string, AbstractControl>();
const mockDynamicFormService = {
  getFormComponentControl(key: string): AbstractControl {
    return formControls.get(key);
  },
} as IDynamicFormService;

describe('resetIfValueNotNullish', () => {
  const mockValue = 'mock';
  let mockFormControl: FormControl;

  beforeEach(() => {
    mockFormControl = new FormControl();
    formControls.set(mockFormControlKey, mockFormControl);
  });

  it('should reset the control if value is not nullish', () => {
    const disableSpy = jest.spyOn(mockFormControl, 'reset');
    resetIfValueNotNullish(
      'mockOrigin',
      mockFormControlKey,
      mockDynamicFormService,
      mockValue,
    );
    expect(disableSpy).toHaveBeenCalled();
  });

  it.each([[null], [undefined]])(
    'should not reset the control if value is nullish',
    (value) => {
      const enableSpy = jest.spyOn(mockFormControl, 'reset');
      resetIfValueNotNullish(
        'mockOrigin',
        mockFormControlKey,
        mockDynamicFormService,
        value,
      );
      expect(enableSpy).not.toHaveBeenCalled();
      enableSpy.mockReset();
    },
  );
});
