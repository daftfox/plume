import { ComponentRef, ElementRef } from '@angular/core';
import { MockFormGroupComponent } from './form-group.component.mock';
import { FormGroup } from '@angular/forms';

export const mockFormGroupInstance = {
  key: 'mockParent',
  form: new FormGroup({}),
  appendFormControlToForm: jest.fn(),
  removeFormControlFromForm: jest.fn(),
  createFormComponent: jest.fn(),
} as unknown as MockFormGroupComponent;

export const mockOtherFormGroupInstance = {
  key: 'mockOtherParent',
  form: new FormGroup({}),
  appendFormControlToForm: jest.fn(),
  removeFormControlFromForm: jest.fn(),
  createFormComponent: jest.fn(),
} as unknown as MockFormGroupComponent;

export const mockFormGroupElementRef = {
  nativeElement: {
    setAttribute: jest.fn(),
    removeAttribute: jest.fn(),
  },
} as ElementRef;

export const mockFormGroupComponentRef = {
  destroy: jest.fn(),
  setInput: jest.fn(),
  get instance(): MockFormGroupComponent {
    return mockFormGroupInstance;
  },
} as unknown as ComponentRef<MockFormGroupComponent>;

export const mockOtherFormGroupComponentRef = {
  destroy: jest.fn(),
  setInput: jest.fn(),
  get instance(): MockFormGroupComponent {
    return mockOtherFormGroupInstance;
  },
} as unknown as ComponentRef<MockFormGroupComponent>;
