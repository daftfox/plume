import { MockFormOutputComponent } from './form-output.component.mock';
import { MockFormGroupComponent } from './form-group.component.mock';
import { MockFormQuestionComponent } from './form-question.component.mock';
import { MockReactiveFormQuestionComponent } from './reactive-form-question.component.mock';
import { MockObservableDataSource } from './observable-data-source.mock';
import { MockFormActionComponent } from './form-action.component.mock';
import { IFormOutput } from '../../src/lib/dynamic-form/model/declaration/form-output.interface';
import { IReactiveFormQuestion } from '../../src/lib/dynamic-form/model/declaration/reactive-form-question.type';
import { DIRECTION } from '../../src/lib/dynamic-form/model/declaration/direction.enum';
import { IFormAction } from '../../src/lib/dynamic-form/model/declaration/form-action.interface';
import { IFormGroup } from '../../src/lib/dynamic-form/model/declaration/form-group.interface';
import { IFormQuestion } from '../../src/lib/dynamic-form/model/declaration/form-question.interface';

export const mockFormOutput = {
  component: MockFormOutputComponent,
  key: 'mock',
  inputKeys: [],
} as IFormOutput;
export const mockFormGroup = {
  component: MockFormGroupComponent,
  key: 'mock',
  formElements: [],
  disabled: false,
  direction: DIRECTION.ROW,
  inputKeys: [],
} as IFormGroup;
export const mockFormQuestion = {
  component: MockFormQuestionComponent,
  key: 'mock',
  validators: [],
  label: 'Mock',
  placeholder: 'Mock',
  asyncValidators: [],
  linkedElements: [],
  disabled: false,
  inputKeys: [],
} as IFormQuestion;
export const mockReactiveFormQuestion = {
  component: MockReactiveFormQuestionComponent,
  key: 'mock',
  accumulateArguments: false,
  dataSource: new MockObservableDataSource(),
  validators: [],
  label: 'Mock',
  placeholder: 'Mock',
  asyncValidators: [],
  linkedElements: [],
  disabled: false,
  inputKeys: [],
} as IReactiveFormQuestion;
export const mockFormAction = {
  component: MockFormActionComponent,
  key: 'mock',
  action: () => {},
  inputKeys: [],
} as IFormAction;
