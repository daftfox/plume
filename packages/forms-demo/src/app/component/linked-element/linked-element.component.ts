import {Component} from "@angular/core";
import {AbstractDemoComponent} from "../abstract-demo/abstract-demo.component";
import {RouterLink} from "@angular/router";
import {
  DynamicFormModule,
  DynamicSelect,
  DynamicToggle,
  toggleOtherControlDisabled
} from "@plume/forms";
import {MatTableModule} from "@angular/material/table";
import { GistComponent } from '../../../shared/component/gist/gist.component';

@Component({
  standalone: true,
  selector: 'demo-linked-element',
  imports: [
    RouterLink,
    GistComponent,
    MatTableModule,
    DynamicFormModule
  ],
  templateUrl: './linked-element.component.html'
})
export class LinkedElementComponent extends AbstractDemoComponent {
  override title = 'Linked elements';
  linkedElementInterfaceGist = [{
        name: 'linked-element.interface.ts',
        code: `interface LinkedElement {
  label: string;
  key: string;
  refreshOnValueChange?: boolean;
}`}];

  linkedElementExampleQuestions = [
    new DynamicToggle({
      key: 'enableBirdOfTheYear',
      label: 'Enable bird of the year element',
      value: true,
      linkedElements: [{ key: 'birdOfTheYear', label: 'Bird of the year' }],
      mutators: [toggleOtherControlDisabled]
    }),
    new DynamicSelect<string>({
      key: 'birdOfTheYear',
      label: 'Bird of the year',
      options: [
        {
          label: 'Pukeko',
          value: 'pukeko',
        }, {
          label: 'Kiwi',
          value: 'kiwi',
        }, {
          label: 'Kakapo',
          value: 'kakapo',
        }
      ]
    })
  ];
  linkedElementExampleGist = {
    fileGists: [
      {
        name: 'form.component.ts',
        code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<plume-dynamic-form-group
  [rootNode]="true"
  [formElements]="questions"
  direction="row"></plume-dynamic-form-group>\`,
})
export class FormComponent {
  questions = [
    new DynamicToggle({
      key: 'enableBirdOfTheYear',
      label: 'Enable bird of the year element',
      value: true,

      // Here we define the elements that are linked to the status/value of this control
      linkedElements: [{ key: 'birdOfTheYear', label: 'Bird of the year' }],
      // Mutator(s) below will be executed for every linked element upon this element's status/value changes
      mutators: [toggleOtherControlDisabled]
    }),
    new DynamicSelect({
      key: 'birdOfTheYear',
      label: 'Bird of the year',
      options: [
        {
          label: 'Pukeko',
          value: 'pukeko',
        }, {
          label: 'Kiwi',
          value: 'kiwi',
        }, {
          label: 'Kakapo',
          value: 'kakapo',
        }
      ]
    })
  ];
}`
      }
    ]
  }
}
