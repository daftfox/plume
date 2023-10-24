import { TestBed } from '@angular/core/testing';
import { MockFormQuestionComponent } from '../../../../mock/component/form-question.component.mock';
import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { AbstractControl, FormControl } from '@angular/forms';
import { enableIfTrue } from './enable-if-true.mutator';

const mockFormControlKey = 'mockFormQuestionComponent';
const formControls = new Map<string, AbstractControl>();
const mockFormControl = new FormControl();
const mockDynamicFormService = {
  getFormComponentControl(key: string): AbstractControl {
    return formControls.get(key);
  },
} as IDynamicFormService;

describe('enableIfTrue', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockFormQuestionComponent],
    }).compileComponents();

    formControls.set(mockFormControlKey, mockFormControl);
  });

  it('should enable the control if value equals true', () => {
    const spy = jest.spyOn(mockFormControl, 'enable');
    enableIfTrue(
      'originComponent',
      mockFormControlKey,
      mockDynamicFormService,
      true,
    );
    expect(spy).toHaveBeenCalled();
  });

  it('should disable the control if value equals false', () => {
    const spy = jest.spyOn(mockFormControl, 'disable');
    enableIfTrue(
      'originComponent',
      mockFormControlKey,
      mockDynamicFormService,
      false,
    );
    expect(spy).toHaveBeenCalled();
  });
});
