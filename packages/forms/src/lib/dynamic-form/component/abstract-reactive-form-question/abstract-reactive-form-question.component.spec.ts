import { ComponentFixture, TestBed } from '@angular/core/testing';
import { tap } from 'rxjs/operators';
import { MockReactiveFormQuestionComponent } from '../../../../../mock/component/reactive-form-question.component.mock';
import { Subject } from 'rxjs';
import { DynamicFormService } from '../../service/dynamic-form.service';

const mockFormInitialised = new Subject<null>();
const mockDynamicFormService = {
  formInitialised: mockFormInitialised,
};

describe('AbstractReactiveFormQuestionComponent', () => {
  let fixture: ComponentFixture<MockReactiveFormQuestionComponent>;
  let component: MockReactiveFormQuestionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicFormService,
          useValue: mockDynamicFormService,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MockReactiveFormQuestionComponent);
    component = fixture.componentInstance;
    component.key = 'mockControl';
    fixture.detectChanges();
  });

  it('should instantiate component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit new arguments on refresh', (done) => {
    const refreshArguments = new Map([['mock', 'mockValue']]);
    component['dataSourceArguments']
      .pipe(
        tap((args) => {
          expect(args).toEqual(refreshArguments);
          done();
        }),
      )
      .subscribe();

    component.refresh(refreshArguments);
  });

  it('should clear arguments', () => {
    const clearSpy = jest.spyOn(component['clear'] as any, 'next');
    component.accumulateArguments = true;
    component.clearArgs();
    expect(clearSpy).toHaveBeenCalled();
  });

  it('should not clear arguments', () => {
    const clearSpy = jest.spyOn(component['clear'] as any, 'next');
    component.clearArgs();
    expect(clearSpy).not.toHaveBeenCalled();
  });
});
