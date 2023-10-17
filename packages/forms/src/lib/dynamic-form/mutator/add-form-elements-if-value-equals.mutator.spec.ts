import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { addFormElementsIfValueEquals } from './add-form-elements-if-value-equals.mutator';
import { DynamicTextInput } from '../model/declaration/dynamic-text-input';
import { IDynamicFormElement } from '../model/declaration/dynamic-form-element.interface';

const mockDynamicFormService = {
  addFormElementsToFormGroup(
    _formElements: IDynamicFormElement[],
    _formGroupKey: string,
  ) {},
  removeFormElementsFromFormGroup(
    _formElements: IDynamicFormElement[],
    _formGroupKey: string,
  ) {},
} as IDynamicFormService;

describe('addFormElementsIfValueEquals', () => {
  const mockValue = 'mock';
  const mockFormGroupKey = 'mockFormGroup';
  const mockFormElement = new DynamicTextInput({
    key: 'mockFormElement',
    label: 'Mock form element',
  });

  it('should add the provided form elements when values match', () => {
    const addFormElementsSpy = jest.spyOn(
      mockDynamicFormService,
      'addFormElementsToFormGroup',
    );
    addFormElementsIfValueEquals(
      mockValue,
      [mockFormElement],
      mockFormGroupKey,
    )('mockOrigin', 'mockTarget', mockDynamicFormService, mockValue);
    expect(addFormElementsSpy).toHaveBeenCalledWith(
      [mockFormElement],
      mockFormGroupKey,
    );
  });

  it("should remove the provided form elements when values don't match", () => {
    const removeFormElementsSpy = jest.spyOn(
      mockDynamicFormService,
      'removeFormElementsFromFormGroup',
    );
    addFormElementsIfValueEquals(
      mockValue,
      [mockFormElement],
      mockFormGroupKey,
    )('mockOrigin', 'mockTarget', mockDynamicFormService, 'wrongValue');
    expect(removeFormElementsSpy).toHaveBeenCalledWith(
      [mockFormElement],
      mockFormGroupKey,
    );
  });
});
