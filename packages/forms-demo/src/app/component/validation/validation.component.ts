import { Component } from '@angular/core';
import { ObserveVisibilityDirective } from '../../directive/observe-visibility.directive';
import {
  DynamicCheckbox,
  DynamicFormModule,
  DynamicTextInput,
  IDynamicFormService,
  PlumeValidatorFn,
} from '@plume-org/forms';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { GistComponent } from '../../../shared/component/gist/gist.component';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'demo-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['../abstract-demo/abstract-demo.component.scss'],
  standalone: true,
  imports: [
    ObserveVisibilityDirective,
    DynamicFormModule,
    MatExpansionModule,
    GistComponent,
    FlexModule,
    MatButtonModule,
  ],
})
export class ValidationComponent {
  basicValidationPanelOpen = false;
  basicValidation = [
    new DynamicCheckbox({
      key: 'areGannetsDope',
      label: 'Gannets are dope',
      validators: [Validators.requiredTrue],
    }),
    new DynamicCheckbox({
      key: 'areGannetsStillDope',
      label: 'Gannets are still dope',
      validators: [Validators.requiredTrue],
      additionalValidationMessages: new Map([
        ['required', 'Still required, mate'],
      ]),
    }),
    new DynamicTextInput({
      key: 'whyAreGannetsDope',
      label: 'Please explain why Gannets are dope (max 10 characters)',
      validators: [Validators.required, Validators.maxLength(10)],
    }),
  ];
  basicValidationFileGists = [
    {
      name: 'form.component.ts',
      code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<plume-dynamic-form-group [formElements]="formElements"></plume-dynamic-form-group>\`,
})
export class FormComponent {
  formElements = [
    new DynamicCheckbox({
      key: 'areGannetsDope',
      label: 'Gannets are dope',

      // Synchronously check if the checkbox is selected using OOB Angular validator
      validators: [ Validators.requiredTrue ],
    }),
    new DynamicCheckbox({
      key: 'areGannetsStillDope',
      label: 'Gannets are still dope',
      validators: [Validators.requiredTrue],

      // Override or add to the default validation error messages.
      additionalValidationMessages: new Map([['required', 'Still required, mate']])
    }),
    new DynamicTextInput({
      key: 'whyAreGannetsDope',
      label: 'Please explain why Gannets are dope (max 10 characters)',

      // Make control required and allow a maximum length of 10 characters
      validators: [Validators.required, Validators.maxLength(10)],
    })
  ];
}`,
    },
  ];

  customValidationPanelOpen = false;
  customValidation = [
    new DynamicTextInput({
      key: 'flightless',
      label: `Please don't enter the word 'flying'. It offends the penguins.`,
      validators: [this.forbiddenValue('flying')],
      additionalValidationMessages: new Map([
        ['forbiddenValue', 'You offended the penguins'],
      ]),
    }),
  ];
  customValidationFileGists = [
    {
      name: 'form.component.ts',
      code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<plume-dynamic-form-group [formElements]="formElements"></plume-dynamic-form-group>\`,
})
export class FormComponent {
  formElements = [
    new DynamicTextInput({
      key: 'flightless',
      label: \`Please don't enter the word 'flying'. It offends the penguins.\`,

      // Add custom validator to list of validators
      validators: [this.customValidator('flying')],

      // Add additional validation message for custom validator error
      additionalValidationMessages: new Map([['forbiddenValue', 'You offended the penguins']])
    })
  ];

  private customValidator( forbiddenValue: string ): PlumeValidatorFn  {
    return ( service: DynamicFormService ): ValidatorFn =>
    ( control: AbstractControl ): ValidationErrors | null =>
      control.value &&
      control.value.toLowerCase() === forbiddenValue.toLowerCase() ?
        { forbiddenValue }
        : null;
  }
}`,
    },
  ];

  customValidatorMessagePanelOpen = false;
  customValidatorMessage = [
    new DynamicTextInput({
      key: 'leopardSeal',
      label: `The penguins also REALLY don't like the 'leopard seal'.`,
      validators: [this.forbiddenValue('leopard seal')],
      additionalValidationMessages: new Map([
        ['forbiddenValue', 'The {0} scared off the penguins!'],
      ]),
    }),
  ];
  customValidatorMessageFileGists = [
    {
      name: 'form.component.ts',
      code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<plume-dynamic-form-group [formElements]="formElements"></plume-dynamic-form-group>\`,
})
export class FormComponent {
  formElements = [
    new DynamicTextInput({
      key: 'flightless',
      label: \`The penguins also REALLY don't like the 'leopard seal'.\`,
      validators: [this.forbiddenValue('leopard seal')],

      // The additional information returned by the custom ValidatorFn is inserted in place of {0}
      additionalValidationMessages: new Map([['forbiddenValue', 'The {0} scared off the penguins!']])
    })
  ];

  private customValidator( forbiddenValue: string ): PlumeValidatorFn  {
    return ( service: DynamicFormService ): ValidatorFn =>
    ( control: AbstractControl ): ValidationErrors | null =>
      control.value &&
      control.value.toLowerCase() === forbiddenValue.toLowerCase() ?
        { forbiddenValue }
        : null;
  }
}`,
    },
  ];

  private forbiddenValue(forbiddenValue: string): PlumeValidatorFn {
    return (_service: IDynamicFormService): ValidatorFn =>
      (control: AbstractControl): ValidationErrors | null =>
        control.value &&
        control.value.toLowerCase() === forbiddenValue.toLowerCase()
          ? { forbiddenValue }
          : null;
  }
}
