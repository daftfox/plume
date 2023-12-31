import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { DynamicFormService } from '../../service/dynamic-form.service';
import { DynamicButtonComponent } from './dynamic-button.component';

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
