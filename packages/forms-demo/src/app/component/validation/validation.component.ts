import { Component } from '@angular/core';
import { ObserveVisibilityDirective } from '../../directive/observe-visibility.directive';
import { DynamicCheckbox, DynamicFormModule, DynamicTextInput } from '@plume/forms';
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { GistComponent } from '../../../shared/component/gist/gist.component';
import { FlexModule } from '@angular/flex-layout';

@Component({
  selector: 'demo-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['../abstract-demo/abstract-demo.component.scss'],
  standalone: true,
  imports: [ ObserveVisibilityDirective, DynamicFormModule, MatExpansionModule, GistComponent, FlexModule ]
})
export class ValidationComponent {
  basicValidationPanelOpen = false;
  basicValidation = [
    new DynamicCheckbox({
      key: 'important',
      label: 'Gannets are dope',
      validators: [Validators.requiredTrue],
    }),
    new DynamicCheckbox({
      key: 'stillImportant',
      label: 'Gannets are still dope',
      validators: [Validators.requiredTrue],
      additionalValidationMessages: new Map([['required', 'Still required, mate']])
    }),
    new DynamicTextInput({
      key: 'whyAreGannetsDope',
      label: 'Please explain why Gannets are dope (max 10 characters)',
      validators: [Validators.required, Validators.maxLength(10)],
    })
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
      key: 'important',
      label: 'Gannets are dope',

      // Synchronously check if the checkbox is selected using OOB Angular validator
      validators: [ Validators.requiredTrue ],
    }),
    new DynamicCheckbox({
      key: 'stillImportant',
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
}`
    }
  ];

  customValidationPanelOpen = false;
  customValidation = [
    new DynamicTextInput({
      key: 'flightless',
      label: `Please don't enter the word 'flying'. It offends the penguins.`,
      validators: [this.customValidator('flying')],
      additionalValidationMessages: new Map([['forbiddenValue', 'You offended the penguins']])
    })
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
      validators: [this.customValidator('flying')],
      additionalValidationMessages: new Map([['forbiddenValue', 'You offended the penguins']])
    })
  ];

  private customValidator( forbiddenValue: string ): ValidatorFn {
    return ( control: AbstractControl ): ValidationErrors | null => {
      return control.value && control.value.toLowerCase() === forbiddenValue.toLowerCase() ? { forbiddenValue } : null;
    }
  }
}`
    }
  ];

  private customValidator( forbiddenValue: string ): ValidatorFn {
    return ( control: AbstractControl ): ValidationErrors | null => {
      return control.value && control.value.toLowerCase() === forbiddenValue.toLowerCase() ? { forbiddenValue } : null;
    }
  }
}
