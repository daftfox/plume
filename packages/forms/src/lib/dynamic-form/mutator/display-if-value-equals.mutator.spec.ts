import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { displayIfValueEquals } from './display-if-value-equals.mutator';

const mockFormControlKey = 'mockFormQuestionComponent';
const mockDynamicFormService = {
  setElementVisibility(key: string, isVisible: boolean) {},
} as IDynamicFormService;

describe('displayIfValueEquals', () => {
  const mockValue = 'mock';

  it('should display the control if values are equal', () => {
    const serviceSpy = jest.spyOn(
      mockDynamicFormService,
      'setElementVisibility',
    );
    displayIfValueEquals(mockValue)(
      'mockOrigin',
      mockFormControlKey,
      mockDynamicFormService,
      mockValue,
    );
    expect(serviceSpy).toHaveBeenCalledWith(mockFormControlKey, true);
  });

  it("should hide the control if values don't match", () => {
    const serviceSpy = jest.spyOn(
      mockDynamicFormService,
      'setElementVisibility',
    );
    displayIfValueEquals(mockValue)(
      'mockOrigin',
      mockFormControlKey,
      mockDynamicFormService,
      'notEqualValue',
    );
    expect(serviceSpy).toHaveBeenCalledWith(mockFormControlKey, false);
  });
});
