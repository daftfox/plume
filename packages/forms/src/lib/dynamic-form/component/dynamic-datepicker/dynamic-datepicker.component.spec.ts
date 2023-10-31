import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import resetAllMocks = jest.resetAllMocks;
import { BehaviorSubject } from 'rxjs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormService } from '../../service/dynamic-form.service';
import { DynamicDatepickerComponent } from './dynamic-datepicker.component';

const mockDynamicFormService = {
  getFormComponentControl: jest.fn(),
  formInitialised: new BehaviorSubject(null),
};

describe('DynamicDatepickerComponent', () => {
  let component: DynamicDatepickerComponent;
  let fixture: ComponentFixture<DynamicDatepickerComponent>;
  let mockFormControl: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatNativeDateModule, MatDatepickerModule, NoopAnimationsModule],
      providers: [
        {
          provide: DynamicFormService,
          useValue: mockDynamicFormService,
        },
      ],
    });

    fixture = TestBed.createComponent(DynamicDatepickerComponent);
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

  // it('should not do anything', () => {
  //   const mockDate = new Date();
  //   const dateSpy = jest.spyOn(mockDate, 'setMonth');
  //   mockFormControl.setValue( mockDate );
  //   component.setMonthAndYear(new Date());
  //   expect(dateSpy).not.toHaveBeenCalled();
  // });
  //
  // it('should update the control\'s value and close the datepicker', () => {
  //   const mockDate = new Date();
  //   const newDate = new Date(2023, 0, 1);
  //   mockFormControl.setValue( mockDate );
  //   component.mode = 'month-year';
  //   component.setMonthAndYear(newDate);
  //
  //   expect(component.control.value).toEqual(newDate);
  // });
});
