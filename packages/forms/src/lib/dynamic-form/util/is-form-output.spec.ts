import { isFormOutput } from './is-form-output';
import {
  mockFormAction,
  mockFormGroup,
  mockFormOutput,
  mockFormQuestion,
  mockReactiveFormQuestion,
} from '../../../../mock/component/form-element-declarations.mock';
import { DynamicFormElement } from '../model/declaration/dynamic-form-element.type';

describe('isFormOutput', () => {
  it('should return true when passing in a form output element', () => {
    expect(isFormOutput(mockFormOutput)).toBeTruthy();
  });

  it.each([
    [mockFormGroup],
    [mockFormAction],
    [mockFormQuestion],
    [mockReactiveFormQuestion],
  ])(
    'should return false when passing in a form element that is not a form output element',
    (formElement: DynamicFormElement) => {
      expect(isFormOutput(formElement)).toBeFalsy();
    },
  );
});
