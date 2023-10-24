import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicCheckboxComponent, DynamicFormService } from '@plume-org/forms';
import { FormControl, Validators } from '@angular/forms';
import resetAllMocks = jest.resetAllMocks;
import { BehaviorSubject } from 'rxjs';

const mockDynamicFormService = {
  getFormComponentControl: jest.fn(),
  formInitialised: new BehaviorSubject(null),
};

describe('DynamicCheckboxComponent', () => {
  let component: DynamicCheckboxComponent;
  let fixture: ComponentFixture<DynamicCheckboxComponent>;
  let mockFormControl: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicFormService,
          useValue: mockDynamicFormService,
        },
      ],
    });

    fixture = TestBed.createComponent(DynamicCheckboxComponent);
    component = fixture.componentInstance;
    mockFormControl = new FormControl();
    mockDynamicFormService.getFormComponentControl.mockReturnValue(
      mockFormControl,
    );
    fixture.detectChanges();
  });

  afterEach(() => {
    resetAllMocks();
  });

  it('should instantiate', () => {
    expect(component).toBeTruthy();
  });

  it('should return false', () => {
    expect(component.isRequired()).toBeFalsy();
  });

  it('should return true', () => {
    mockFormControl.addValidators([Validators.requiredTrue]);
    expect(component.isRequired()).toBeTruthy();
  });
});
