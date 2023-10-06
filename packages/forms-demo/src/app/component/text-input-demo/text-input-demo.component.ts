import { Component } from '@angular/core';
import { DynamicFormModule, DynamicFormElement, DynamicTextInput, IDynamicFormElement } from '@plume/forms';
import { AbstractDemoComponent, Example } from '../abstract-demo/abstract-demo.component';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { Validators } from '@angular/forms';
import { HighlightModule } from 'ngx-highlightjs';
import { ObserveVisibilityDirective } from '../../directive/observe-visibility.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GistComponent } from '../../../shared/component/gist/gist.component';

@Component({
  standalone: true,
  selector: 'demo-textbox',
  imports: [ CommonModule, DynamicFormModule, MatExpansionModule, HighlightModule, ObserveVisibilityDirective, FlexLayoutModule, GistComponent ],
  templateUrl: '../abstract-demo/abstract-demo.component.html',
  styleUrls: [ '../abstract-demo/abstract-demo.component.scss' ],
})
export class TextInputDemoComponent extends AbstractDemoComponent {
  public override title = 'Text input';
  public override description = `
  Use a <code>DynamicTextInput</code> whenever you need an input of type <code>string</code>.
  In its essence, the input is not that much more complex than the default Angular Material variety, were it not for its integration with all the other goodies Plume forms has to offer. This means maximum reusability and access to complex (asynchronous) validation and mutation.<br>
  Only two configuration properties are required; <code>key</code> and <code>label</code>, although I recommend you also enter a <code>placeholder</code> for increased usability.
`;
  basicTextInput: IDynamicFormElement[] = [
    new DynamicTextInput({
      key: 'keaLikes',
      label: 'What do you like most about the kea?',
      placeholder: 'What I like about the kea is...'
    })
  ];
  disabledTextInput: IDynamicFormElement[] = [
    new DynamicTextInput({
      key: 'neuroticBird',
      label: 'Which is the most neurotic bird in your opinion?',
      value: 'Piwakawaka',
      disabled: true,
    })
  ];
  passwordTextInput: IDynamicFormElement[] = [
    new DynamicTextInput({
      key: 'password',
      label: 'Password',
      placeholder: 'Enter password (strictly avian)',
      type: 'password',
    }),
  ];
  iconTextInput: IDynamicFormElement[] = [
    new DynamicTextInput({
      key: 'searchBird',
      label: 'Which bird do you want to find?',
      placeholder: 'Search',
      icon: 'search'
    }),
  ];
  requiredTextInput: IDynamicFormElement[] = [
    new DynamicTextInput({
      key: 'toutouwaiLookalike',
      label: 'The toutouwai looks a lot like which bird?',
      placeholder: 'The European ...',
      validators: [Validators.required]
    }),
  ];
  maxLengthTextInput: IDynamicFormElement[] = [
    new DynamicTextInput({
      key: 'favouriteBird',
      label: 'What is your favourite bird whose name is 4 characters long?',
      placeholder: 'Enter your favourite bird (it\'s the kiwi, isn\'t it?)',
      maxLength: 4
    }),
  ];

  public override examples: Example[] = [
    {
      heading: 'Basic text input',
      description: 'A standard text input without bells and whistles, like validation, mutation, or other frills.',
      key: 'basicTextInput',
      panelOpen: false,
      formElements: this.basicTextInput,
      fileGists: [
        {
          name: 'form.component.ts',
          code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<plume-dynamic-form-group [formElements]="questions"></plume-dynamic-form-group>\`,
})
export class FormComponent {
  formElements = [
    new DynamicTextInput({
      key: 'keaLikes',
      label: 'What do you like most about the kea?',
      placeholder: 'What I like about the kea is...'
    })
  ];
}`
        }
      ]
    }, {
      heading: 'Password text input',
      description: 'Text input for passwords. Text typed in a password field is normally hidden from view, unless the user clicks the eye-con, in which case the password will be visible until they toggle visibility once more. Just provide <code>type: \'password\'</code> to the configuration and the rest is taken care of for you.',
      key: 'passwordTextInput',
      panelOpen: false,
      formElements: this.passwordTextInput,
      fileGists: [
        {
          name: 'form.component.ts',
          code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<plume-dynamic-form-group [formElements]="questions"></plume-dynamic-form-group>\`,
})
export class FormComponent {
  formElements = [
    new DynamicTextInput({
      key: 'password',
      label: 'Password',
      placeholder: 'Enter password (strictly avian)',

      // We can pass multiple type options, password being one of them
      type: 'password',
    })
  ];
}`
        }
      ]
    }, {
      heading: 'Disabled text input',
      description: 'Sometimes you just need to disable a text input element. If you do, just provide <code>disabled: true</code> to the configuration and Bob\'s your uncle.',
      key: 'disabledTextInput',
      panelOpen: false,
      formElements: this.disabledTextInput,
      fileGists: [
        {
          name: 'form.component.ts',
          code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<plume-dynamic-form-group [formElements]="questions"></plume-dynamic-form-group>\`,
})
export class FormComponent {
  formElements = [
    new DynamicTextInput({
      key: 'neuroticBird',
      label: 'Which is the most neurotic bird in your opinion?',
      value: 'Piwakawaka',

      // This text input element is disabled
      disabled: true,
    })
  ];
}`
        }
      ]
    }, {
      heading: 'Text input with icon prefix',
      description: 'Prefixing the text input element with an icon is easy as. Simple pass the name of the icon you wish to display to the <code>icon</code> property. A comprehensive list of available icons can be found <a target="_blank" href="https://jossef.github.io/material-design-icons-iconfont/">here</a>.',
      key: 'iconTextInput',
      panelOpen: false,
      formElements: this.iconTextInput,
      fileGists: [
        {
          name: 'form.component.ts',
          code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<plume-dynamic-form-group [formElements]="questions"></plume-dynamic-form-group>\`,
})
export class FormComponent {
  formElements = [
    new DynamicTextInput({
      key: 'searchBird',
      label: 'Which bird do you want to find?',
      placeholder: 'Search',

      // We can pass in any icon name from this list https://jossef.github.io/material-design-icons-iconfont/
      icon: 'search',
    })
  ];
}`
        }
      ]
    }, {
      heading: 'Required text input',
      description: 'Add validation to your text input by providing the built-in Angular <code>Validators.required</code> validator to the <code>validators</code> property. Of course, you\'re able to add more (custom) validators. Please refer to <a href="validation">validation</a> for more information.',
      key: 'requiredTextInput',
      panelOpen: false,
      formElements: this.requiredTextInput,
      fileGists: [
        {
          name: 'form.component.ts',
          code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<plume-dynamic-form-group [formElements]="questions"></plume-dynamic-form-group>\`,
})
export class FormComponent {
  formElements = [
    new DynamicTextInput({
      key: 'toutouwaiLookalike',
      label: 'The toutouwai looks a lot like which bird?',
      placeholder: 'The European ...',

      // This element is required
      validators: [Validators.required]
    })
  ];
}`
        }
      ]
    }, {
      heading: 'Text input with a maximum length',
      description: 'It is possible to restrict the number of characters a user is able to enter by providing a <code>maxLength</code> property. The input will display an intuitive hint indicating the total number of characters and the number of characters used, as well as prevent more characters than the maximum length being entered.',
      key: 'maxLengthTextInput',
      panelOpen: false,
      formElements: this.maxLengthTextInput,
      fileGists: [
        {
          name: 'form.component.ts',
          code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<plume-dynamic-form-group [formElements]="questions"></plume-dynamic-form-group>\`,
})
export class FormComponent {
  formElements = [
    new DynamicTextInput({
      key: 'favouriteBird',
      label: 'What is your favourite bird whose name is 4 characters long?',
      placeholder: \`Enter your favourite bird (it's the kiwi, isn't it?)\`,

      // Allow the user to enter only four characters
      maxLength: 4
    })
  ];
}`
        }
      ]
    }
  ];

  // new DynamicTextInput({
  //                                key: 'requiredTextbox',
  //                                label: 'Required textbox',
  //                                placeholder: 'Enter text',
  //                                validators: [Validators.required]
  //                              }),
  // new DynamicTextInput({
  //                                key: 'maxLengthTextbox',
  //                                label: 'Max length textbox',
  //                                placeholder: 'Enter text',
  //                                maxLength: 25,
  //                              }),
}
