import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { AbstractControl, FormControl } from '@angular/forms';
import { disableIfValueOneOf } from './disable-if-value-one-of.mutator';

const mockFormControlKey = 'mockFormQuestionComponent';
const formControls = new Map<string, AbstractControl>();
const mockFormControl = new FormControl();
const mockDynamicFormService = {
  getFormComponentControl(key: string): AbstractControl {
    return formControls.get(key);
  },
} as IDynamicFormService;

describe('disableIfValueOneOf', () => {
  const mockValue = 'mock';

  beforeEach(() => {
    formControls.set(mockFormControlKey, mockFormControl);
  });

  it('should disable the control if control value is present in array of asserted values', () => {
    const disableSpy = jest.spyOn(mockFormControl, 'disable');
    disableIfValueOneOf([mockValue])(
      'mockOrigin',
      mockFormControlKey,
      mockDynamicFormService,
      mockValue,
    );
    expect(disableSpy).toHaveBeenCalled();
  });

  it('should disable the control if control value is not present in array of asserted values', () => {
    const enableSpy = jest.spyOn(mockFormControl, 'enable');
    disableIfValueOneOf([mockValue])(
      'mockOrigin',
      mockFormControlKey,
      mockDynamicFormService,
      'notEqualValue',
    );
    expect(enableSpy).toHaveBeenCalled();
  });
});
