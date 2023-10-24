import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { hideIfValueEquals } from './hide-if-value-equals.mutator';

const mockFormControlKey = 'mockFormQuestionComponent';
const mockDynamicFormService = {
  setElementVisibility(key: string, isVisible: boolean) {},
} as IDynamicFormService;

describe('hideIfValueEquals', () => {
  const mockValue = 'mock';

  it('should hide the control if values are equal', () => {
    const serviceSpy = jest.spyOn(
      mockDynamicFormService,
      'setElementVisibility',
    );
    hideIfValueEquals(mockValue)(
      'mockOrigin',
      mockFormControlKey,
      mockDynamicFormService,
      mockValue,
    );
    expect(serviceSpy).toHaveBeenCalledWith(mockFormControlKey, false);
  });

  it('should display the control if values are not equal', () => {
    const serviceSpy = jest.spyOn(
      mockDynamicFormService,
      'setElementVisibility',
    );
    hideIfValueEquals(mockValue)(
      'mockOrigin',
      mockFormControlKey,
      mockDynamicFormService,
      'notEqualValue',
    );
    expect(serviceSpy).toHaveBeenCalledWith(mockFormControlKey, true);
  });
});
