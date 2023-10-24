import { isReactiveFormElement } from './is-reactive-form-element';
import {
  mockFormAction,
  mockFormGroup,
  mockFormOutput,
  mockFormQuestion,
  mockReactiveFormQuestion,
} from '../../../../mock/component/form-element-declarations.mock';
import { DynamicFormElement } from '@plume-org/forms';

describe('isReactiveFormElement', () => {
  it('should return true when passing in a reactive form element', () => {
    expect(isReactiveFormElement(mockReactiveFormQuestion)).toBeTruthy();
  });

  it.each([
    [mockFormQuestion],
    [mockFormOutput],
    [mockFormGroup],
    [mockFormAction],
  ])(
    'should return false when passing in a form element that is not a reactive form element',
    (formElement: DynamicFormElement) => {
      expect(isReactiveFormElement(formElement)).toBeFalsy();
    },
  );
});
