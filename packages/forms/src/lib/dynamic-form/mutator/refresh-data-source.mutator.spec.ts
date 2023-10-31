import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { refreshDataSource } from './refresh-data-source.mutator';
import { MockReactiveFormQuestionComponent } from '../../../../mock/component/reactive-form-question.component.mock';
import { MockFormQuestionComponent } from '../../../../mock/component/form-question.component.mock';
import { MockObservableDataSource } from '../../../../mock/component/observable-data-source.mock';
import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';
import { FormComponent } from '../model/form-component.type';
import { DynamicFormService } from '../service/dynamic-form.service';
jest.mock('../service/dynamic-form.service');

const formComponents = new Map<string, FormComponent>();
const mockDynamicFormService = {
  getFormComponent(key: string): FormComponent {
    return formComponents.get(key);
  },
} as IDynamicFormService;

describe('refreshDataSource', () => {
  const reactiveFormQuestionKey = 'mockReactiveFormQuestionComponent';
  const formQuestionKey = 'mockFormQuestionComponent';
  let reactiveFormQuestionComponent: ComponentRef<MockReactiveFormQuestionComponent>;
  let formQuestionComponent: ComponentRef<MockFormQuestionComponent>;
  let reactiveFormQuestionComponentFixture: ComponentFixture<MockReactiveFormQuestionComponent>;
  let formQuestionComponentFixture: ComponentFixture<MockFormQuestionComponent>;
  let mockDataSource: MockObservableDataSource;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockReactiveFormQuestionComponent, MockFormQuestionComponent],
      providers: [DynamicFormService],
    }).compileComponents();

    reactiveFormQuestionComponentFixture = TestBed.createComponent(
      MockReactiveFormQuestionComponent,
    );
    formQuestionComponentFixture = TestBed.createComponent(
      MockFormQuestionComponent,
    );
    reactiveFormQuestionComponent =
      reactiveFormQuestionComponentFixture.componentRef;
    formQuestionComponent = formQuestionComponentFixture.componentRef;
    mockDataSource = new MockObservableDataSource();
    reactiveFormQuestionComponent.setInput('dataSource', mockDataSource);
    formComponents.set(
      reactiveFormQuestionKey,
      reactiveFormQuestionComponent.instance,
    );
    formComponents.set(formQuestionKey, formQuestionComponent.instance);
  });

  it('should call refresh on the form component', () => {
    const spy = jest.spyOn(reactiveFormQuestionComponent.instance, 'refresh');
    refreshDataSource(
      'originComponent',
      reactiveFormQuestionKey,
      mockDynamicFormService,
    );
    expect(spy).toHaveBeenCalled();
  });

  it('should throw an error', () => {
    expect(() =>
      refreshDataSource(
        'originComponent',
        formQuestionKey,
        mockDynamicFormService,
      ),
    ).toThrowError(
      new Error(
        `Unable to refresh. Linked element ${formQuestionKey} does not extend AbstractReactiveFormQuestionComponent or AbstractReactiveFormElementComponent.`,
      ),
    );
  });
});
