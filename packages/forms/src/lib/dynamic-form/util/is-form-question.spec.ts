import { isFormQuestion } from './is-form-question';
import {
  mockFormAction,
  mockFormGroup,
  mockFormOutput,
  mockFormQuestion,
  mockReactiveFormQuestion,
} from '../../../../mock/component/form-element-declarations.mock';
import { DynamicFormElement } from '../model/declaration/dynamic-form-element.type';

describe('isFormQuestion', () => {
  it.each([[mockFormQuestion], [mockReactiveFormQuestion]])(
    'should return true when passing in a form question element',
    (formElement: DynamicFormElement) => {
      expect(isFormQuestion(formElement)).toBeTruthy();
    },
  );

  it.each([[mockFormOutput], [mockFormGroup], [mockFormAction]])(
    'should return false when passing in a form element that is not a form question element',
    (formElement: DynamicFormElement) => {
      expect(isFormQuestion(formElement)).toBeFalsy();
    },
  );
});
