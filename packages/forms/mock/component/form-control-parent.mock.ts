import { FormGroup } from '@angular/forms';
import { IFormGroupComponent } from '../../src';

export const mockFormControlParent = {
  key: 'mockParent',
  form: new FormGroup<any>({}),
  formElements: [],
  appendFormControlToForm: jest.fn(),
  removeFormControlFromForm: jest.fn(),
  createFormComponent: jest.fn(),
} as IFormGroupComponent;

export const mockOtherFormControlParent = {
  key: 'mockOtherParent',
  form: new FormGroup<any>({}),
  formElements: [],
  appendFormControlToForm: jest.fn(),
  removeFormControlFromForm: jest.fn(),
  createFormComponent: jest.fn(),
} as IFormGroupComponent;
