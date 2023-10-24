import { isFormGroup } from './is-form-group';
import {
  mockFormAction,
  mockFormGroup,
  mockFormOutput,
  mockFormQuestion,
  mockReactiveFormQuestion,
} from '../../../../mock/component/form-element-declarations.mock';
import { DynamicFormElement } from '@plume-org/forms';

describe('isFormGroup', () => {
  it('should return true when passing in a form group element', () => {
    expect(isFormGroup(mockFormGroup)).toBeTruthy();
  });

  it.each([
    [mockFormOutput],
    [mockFormAction],
    [mockFormQuestion],
    [mockReactiveFormQuestion],
  ])(
    'should return false when passing in a form element that is not a form group element',
    (formElement: DynamicFormElement) => {
      expect(isFormGroup(formElement)).toBeFalsy();
    },
  );
});
