import {
  ChangeDetectorRef,
  Component,
  EnvironmentInjector,
  Optional,
  SkipSelf,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AbstractFormGroupComponent } from '../../src/lib/dynamic-form/component/abstract-form-group/abstract-form-group.component';
import {
  DIRECTION,
  DynamicFormGroupOptions,
  DynamicFormService,
  IDynamicFormElement,
  IFormGroup,
} from '@plume-org/forms';

export class MockFormGroup implements IFormGroup {
  component = MockFormGroupComponent;
  direction: DIRECTION;
  disabled: boolean;
  formElements: IDynamicFormElement[];
  inputKeys = ['key', 'formElements', 'disabled', 'direction'];
  key: string;

  constructor(options: DynamicFormGroupOptions) {
    this.key = options.key;
    this.formElements = options.formElements;

    this.disabled =
      options.disabled === undefined || options.disabled === null
        ? false
        : options.disabled;
    this.direction = options.direction;
  }
}

@Component({
  selector: 'plume-mock-form-group-element',
  template: `<div>
    <ng-container #formOutlet></ng-container>
  </div>`,
  standalone: true,
})
export class MockFormGroupComponent extends AbstractFormGroupComponent {
  @ViewChild('formOutlet') override formOutlet: ViewContainerRef;

  constructor(
    protected override cdRef: ChangeDetectorRef,

    // Only used by root node form group to create an EnvironmentInjector to be shared with downstream components
    protected override injector: EnvironmentInjector,

    // Don't look for the DynamicFormService provider in the current ElementInjector
    @SkipSelf() @Optional() protected override service: DynamicFormService,
  ) {
    super(cdRef, injector, service);
  }
}
