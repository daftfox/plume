import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { hideIfValueOneOf } from './hide-if-value-one-of.mutator';

const mockFormControlKey = 'mockFormQuestionComponent';
const mockDynamicFormService = {
  setElementVisibility(key: string, isVisible: boolean) {},
} as IDynamicFormService;

describe('hideIfValueOneOf', () => {
  const mockValue = 'mock';

  it('should hide the control if control value is present in array of asserted values', () => {
    const serviceSpy = jest.spyOn(
      mockDynamicFormService,
      'setElementVisibility',
    );
    hideIfValueOneOf([mockValue])(
      'mockOrigin',
      mockFormControlKey,
      mockDynamicFormService,
      mockValue,
    );
    expect(serviceSpy).toHaveBeenCalledWith(mockFormControlKey, false);
  });

  it('should display the control if control value is not present in array of asserted values', () => {
    const serviceSpy = jest.spyOn(
      mockDynamicFormService,
      'setElementVisibility',
    );
    hideIfValueOneOf([mockValue])(
      'mockOrigin',
      mockFormControlKey,
      mockDynamicFormService,
      'notEqualValue',
    );
    expect(serviceSpy).toHaveBeenCalledWith(mockFormControlKey, true);
  });
});
