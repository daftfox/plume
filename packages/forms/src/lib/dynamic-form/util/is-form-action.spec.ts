import { isFormAction } from './is-form-action';
import {
  mockFormAction,
  mockFormGroup,
  mockFormOutput,
  mockFormQuestion,
  mockReactiveFormQuestion,
} from '../../../../mock/component/form-element-declarations.mock';
import { DynamicFormElement } from '../model/declaration/dynamic-form-element.type';

describe('isFormAction', () => {
  it('should return true when passing in a form action element', () => {
    expect(isFormAction(mockFormAction)).toBeTruthy();
  });

  it.each([
    [mockFormOutput],
    [mockFormGroup],
    [mockFormQuestion],
    [mockReactiveFormQuestion],
  ])(
    'should return false when passing in a form element that is not a form action element',
    (formElement: DynamicFormElement) => {
      expect(isFormAction(formElement)).toBeFalsy();
    },
  );
});
