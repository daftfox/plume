import {
  ChangeDetectorRef,
  ComponentRef,
  ElementRef,
  Injector,
  Type,
  ViewRef,
} from '@angular/core';
import { MockFormOutputComponent } from './form-output.component.mock';

export const mockChangeDetectorRef = {
  detectChanges: jest.fn(),
} as unknown as ChangeDetectorRef;

export const mockElementRef = {
  nativeElement: {
    setAttribute: jest.fn(),
    removeAttribute: jest.fn(),
  },
} as ElementRef;

export const mockComponentRef = {
  destroy: jest.fn(),
  setInput: jest.fn(),
  get location(): ElementRef {
    return mockElementRef;
  },
  get instance(): any {
    return {};
  },
} as unknown as ComponentRef<MockFormOutputComponent>;
