import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockReactiveFormElementComponent } from '../../../../../mock/component/reactive-form-element.component.mock';
import { tap } from 'rxjs/operators';

describe('AbstractReactiveFormElementComponent', () => {
  let fixture: ComponentFixture<MockReactiveFormElementComponent>;
  let component: MockReactiveFormElementComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();
    fixture = TestBed.createComponent(MockReactiveFormElementComponent);
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
