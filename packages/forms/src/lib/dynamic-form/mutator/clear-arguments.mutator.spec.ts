import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { clearArguments } from './clear-arguments.mutator';
import { mockDynamicFormService } from '../../../../mock/component/dynamic-form.service.mock';
import { FormControl } from '@angular/forms';
import { MockReactiveFormQuestionComponent } from '../../../../mock/component/reactive-form-question.component.mock';
import { MockFormQuestionComponent } from '../../../../mock/component/form-question.component.mock';
import { MockObservableDataSource } from '../../../../mock/component/observable-data-source.mock';
import { AbstractFormGroupComponent } from '../component/abstract-form-group/abstract-form-group.component';

describe('clearArguments', () => {
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
    mockDynamicFormService['addFormComponentRef'](reactiveFormQuestionKey, {
      componentRef: reactiveFormQuestionComponent,
      parent: {} as AbstractFormGroupComponent,
      control: new FormControl('test'),
    });
    mockDynamicFormService['addFormComponentRef'](formQuestionKey, {
      componentRef: formQuestionComponent,
      parent: {} as AbstractFormGroupComponent,
      control: new FormControl('test'),
    });
  });

  it('should create component', () => {
    expect(reactiveFormQuestionComponent).toBeTruthy();
  });

  it("should clear the component's arguments", () => {
    const spy = jest.spyOn(reactiveFormQuestionComponent.instance, 'clearArgs');
    clearArguments(
      'originComponent',
      reactiveFormQuestionKey,
      mockDynamicFormService,
    );
    expect(spy).toHaveBeenCalled();
  });

  it('should throw an error', () => {
    expect(() =>
      clearArguments(
        'originComponent',
        formQuestionKey,
        mockDynamicFormService,
      ),
    ).toThrowError(
      new Error(
        `Linked element ${formQuestionKey} does not extend AbstractReactiveFormQuestionComponent or AbstractReactiveFormElementComponent.`,
      ),
    );
  });
});
