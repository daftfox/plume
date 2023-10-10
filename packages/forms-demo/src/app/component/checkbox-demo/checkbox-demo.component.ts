import { Component } from '@angular/core';
import {
  DIRECTION,
  DynamicCheckbox,
  DynamicFormGroup,
  DynamicFormModule,
} from '@plume/forms';
import {
  AbstractDemoComponent,
  Example,
} from '../abstract-demo/abstract-demo.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { HighlightModule } from 'ngx-highlightjs';
import { ObserveVisibilityDirective } from '../../directive/observe-visibility.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GistComponent } from '../../../shared/component/gist/gist.component';

@Component({
  standalone: true,
  selector: 'demo-checkbox',
  imports: [
    CommonModule,
    DynamicFormModule,
    MatButtonModule,
    MatExpansionModule,
    HighlightModule,
    ObserveVisibilityDirective,
    FlexLayoutModule,
    GistComponent,
  ],
  templateUrl: '../abstract-demo/abstract-demo.component.html',
  styleUrls: ['../abstract-demo/abstract-demo.component.scss'],
})
export class CheckboxDemoComponent extends AbstractDemoComponent {
  public override title = 'Checkbox';
  public override description = `The <code>DynamicCheckbox</code> is not that different from the default one provided by Angular Material. That being said, unlike the Angular Material version, this one readily plugs into a dynamic form. Use a single checkbox as-is, or group them together in a <code>DynamicFormGroup</code>.`;

  basicCheckbox = [
    new DynamicCheckbox({
      key: 'isFlightless',
      label: 'This bird is flightless',
    }),
  ];
  disabledCheckbox = [
    new DynamicCheckbox({
      key: 'isCool',
      label: 'This bird is cool',
      value: true,
      disabled: true,
    }),
  ];
  groupedCheckboxes = [
    new DynamicFormGroup({
      label: 'The riroriro is:',
      key: 'riroriroProperties',
      direction: DIRECTION.ROW,
      formElements: [
        new DynamicCheckbox({
          key: 'territorial',
          label: 'Territorial',
        }),
        new DynamicCheckbox({
          key: 'small',
          label: 'Small',
        }),
        new DynamicCheckbox({
          key: 'cool',
          label: 'Cool',
          value: true,
          disabled: true,
        }),
      ],
    }),
  ];

  public override examples: Example[] = [
    {
      heading: 'Basic checkbox',
      description:
        "The boolean checkbox we've all come to love. Simply provide a key and label and off you go.",
      key: 'basicCheckbox',
      panelOpen: false,
      formElements: this.basicCheckbox,
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
    new DynamicCheckbox({
      key: 'isFlightless',
      label: 'This bird is flightless',
    })
  ];
}`,
        },
      ],
    },
    {
      heading: 'Disabled checkbox',
      description:
        'The same checkbox, but disabled through the <code>disabled</code> configuration property.',
      key: 'disabledCheckbox',
      panelOpen: false,
      formElements: this.disabledCheckbox,
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
    new DynamicCheckbox({
      key: 'isCool',
      label: 'This bird is cool',

      // We have pre-set the value
      value: true,

      // Disable the checkbox, because we don't want the user to muck about with it.
      disabled: true
    })
  ];
}`,
        },
      ],
    },
    {
      heading: 'Grouped checkboxes',
      description:
        'A couple of checkboxes grouped together in a <code>DynamicFormGroup</code>. Refer to <a href="form-group">form group</a> for more information regarding grouping options.',
      key: 'groupedCheckboxes',
      panelOpen: false,
      formElements: this.groupedCheckboxes,
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
    new DynamicFormGroup({
      label: 'The riroriro is:',
      key: 'riroriroProperties',

      // Display the checkboxes in a row as opposed to a column
      direction: 'row',
      formElements: [
        new DynamicCheckbox({
          key: 'territorial',
          label: 'Territorial',
        }),
        new DynamicCheckbox({
          key: 'small',
          label: 'Small',
        }),
        new DynamicCheckbox({
          key: 'cool',
          label: 'Cool',
          value: true,
          disabled: true
        }),
      ]
    })
  ];
}`,
        },
      ],
    },
    // new DynamicFormGroup({
    //   direction: 'row',
    //   key: 'checkboxes',
    //   formElements: [
    //     new DynamicCheckbox({
    //       key: 'defaultCheckbox',
    //       label: 'Default textbox',
    //     }),
    //     new DynamicCheckbox({
    //       key: 'disabledCheckbox',
    //       label: 'Disabled textbox',
    //       disabled: true
    //     }),
    //   ]
    // }),
    //
    // new DynamicFormGroup({
    //   direction: 'row',
    //   key: 'checkboxes',
    //   formElements: [
    //     new DynamicCheckbox({
    //       key: 'defaultCheckbox',
    //       label: 'Default textbox',
    //     }),
    //     new DynamicCheckbox({
    //       key: 'disabledCheckbox',
    //       label: 'Disabled textbox',
    //       disabled: true
    //     }),
    //   ]
    // }),
  ];
}
