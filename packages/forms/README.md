# Plume forms

## Installation

```
$ npm install @plume-org/forms
$ npm install @plume-org/utils
```

## Usage

```typescript
import { DIRECTION, DynamicFormGroup, DynamicFormGroupComponent, DynamicTextInput } from '@plume-org/forms';

@Component({
  selector: 'my-component',
  imports: [DynamicFormGroupComponent],
  template: `<plume-dynamic-form-group [formElements]="formElements"></plume-dynamic-form-group>`,
})
class MyComponent {
  formElements = [
    new DynamicFormGroup({
      key: 'name',
      direction: DIRECTION.ROW,
      formElements: [
        new DynamicTextInput({
          key: 'firstName',
          label: 'First name',
          placeholder: 'Please enter your first name',
          validators: [Validators.required, Validators.minLength(3)],
        }),
        new DynamicTextInput({
          key: 'lastName',
          label: 'Last name',
          placeholder: 'Please enter your last name',
          validators: [Validators.required, Validators.minLength(3)],
        }),
      ],
    }),
    new DynamicTextInput({
      key: 'email',
      label: 'Email address',
      placeholder: 'Please enter your email address',
      validators: [Validators.required, Validators.email],
    }),
  ];
}
```
