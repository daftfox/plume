import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { AbstractControl, FormControl } from '@angular/forms';
import { enableIfValueEquals } from './enable-if-value-equals.mutator';

const mockFormControlKey = 'mockFormQuestionComponent';
const formControls = new Map<string, AbstractControl>();
const mockFormControl = new FormControl();
const mockDynamicFormService = {
  getFormComponentControl(key: string): AbstractControl {
    return formControls.get(key);
  },
} as IDynamicFormService;

describe('enableIfValueEquals', () => {
  const mockValue = 'mock';

  beforeEach(() => {
    formControls.set(mockFormControlKey, mockFormControl);
  });

  it('should enable the control if values are equal', () => {
    const disableSpy = jest.spyOn(mockFormControl, 'enable');
    enableIfValueEquals(mockValue)(
      'mockOrigin',
      mockFormControlKey,
      mockDynamicFormService,
      mockValue,
    );
    expect(disableSpy).toHaveBeenCalled();
  });

  it('should disable the control if values are not equal', () => {
    const enableSpy = jest.spyOn(mockFormControl, 'disable');
    enableIfValueEquals(mockValue)(
      'mockOrigin',
      mockFormControlKey,
      mockDynamicFormService,
      'notEqualValue',
    );
    expect(enableSpy).toHaveBeenCalled();
  });
});
