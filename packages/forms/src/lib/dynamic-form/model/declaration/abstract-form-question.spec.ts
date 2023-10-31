import { MockFormQuestionComponent } from '../../../../../mock/component/form-question.component.mock';
import { FormControl, Validators } from '@angular/forms';
import { DynamicFormQuestionOptions } from '../options/dynamic-form-question-options.interface';
import { AbstractFormQuestion } from './abstract-form-question';
import { validateIsBeforeOrOn } from '../../validator/is-before-or-on.validator';

class MockFormQuestion extends AbstractFormQuestion {
  component = MockFormQuestionComponent;

  constructor(options: DynamicFormQuestionOptions<string>) {
    super(options);
  }
}

const mockValue = 'mock';

describe('AbstractFormQuestion', () => {
  let mockFormQuestion: MockFormQuestion;

  beforeEach(() => {
    mockFormQuestion = new MockFormQuestion({
      key: 'mock',
      label: 'Mock',
    });
  });

  describe('#getFormControl', () => {
    it('should return a new instance of FormControl', () => {
      expect(
        mockFormQuestion.getFormControl() instanceof FormControl,
      ).toBeTruthy();
    });

    it('should have assigned the correct value', () => {
      expect(mockFormQuestion.getFormControl().value).toBeNull();
      mockFormQuestion.value = mockValue;
      expect(mockFormQuestion.getFormControl().value).toEqual(mockValue);
    });

    it('should have passed the validators', () => {
      expect(
        mockFormQuestion.getFormControl().hasValidator(Validators.required),
      ).toBeFalsy();
      mockFormQuestion.validators = [Validators.required];
      expect(
        mockFormQuestion.getFormControl().hasValidator(Validators.required),
      ).toBeTruthy();
    });
  });

  describe('#getBuiltInValidators', () => {
    it('should return an array of validators', () => {
      expect(
        mockFormQuestion['getBuiltInValidators']([Validators.required]),
      ).toEqual([Validators.required]);
    });

    it('should return a single validator', () => {
      expect(
        mockFormQuestion['getBuiltInValidators'](Validators.required),
      ).toEqual(Validators.required);
    });

    it('should only return angular validators', () => {
      expect(
        mockFormQuestion['getBuiltInValidators']([
          Validators.required,
          validateIsBeforeOrOn('otherControl'),
        ]),
      ).toEqual([Validators.required]);
    });

    it('should only return angular validators', () => {
      expect(
        mockFormQuestion['getBuiltInValidators']([
          validateIsBeforeOrOn('otherControl'),
        ]),
      ).toEqual([]);
    });
  });
});
