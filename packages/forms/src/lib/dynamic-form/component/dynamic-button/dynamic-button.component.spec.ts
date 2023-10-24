import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicButtonComponent, DynamicFormService } from '@plume-org/forms';
import { BehaviorSubject } from 'rxjs';

const mockDynamicFormService = {
  formInitialised: new BehaviorSubject(null),
};

describe('DynamicButtonComponent', () => {
  let component: DynamicButtonComponent;
  let fixture: ComponentFixture<DynamicButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicFormService,
          useValue: mockDynamicFormService,
        },
      ],
    });

    fixture = TestBed.createComponent(DynamicButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should instantiate', () => {
    expect(component).toBeTruthy();
  });
});
