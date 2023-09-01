import { Component } from '@angular/core';
import {
  DynamicSelect,
  DynamicFormModule, DynamicFormElement, DynamicFormGroup,
} from '@slodder/forms';
import { AbstractDemoComponent } from '../abstract-demo/abstract-demo.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { Subject, tap } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { AsideService } from "../../service/aside.service";
import { HighlightModule } from 'ngx-highlightjs';
import { ObserveVisibilityDirective } from '../../directive/observe-visibility.directive';
import { FlexModule } from '@angular/flex-layout';
import { MockBirdDataSource } from './data-source/mock-bird.data-source';
import { MockBirdService } from './service/mock-bird.service';

@Component({
  standalone: true,
  selector: 'demo-select',
  imports: [ CommonModule, DynamicFormModule, HttpClientModule, MatButtonModule, MatExpansionModule, RouterLink, HighlightModule, ObserveVisibilityDirective, FlexModule ],
  providers: [ MockBirdService ],
  templateUrl: '../abstract-demo/abstract-demo.component.html',
  styleUrls: [ '../abstract-demo/abstract-demo.component.scss' ],
})
export class SelectDemoComponent extends AbstractDemoComponent {
  public override title = 'Select';
  public override description = `Select elements must have been the reason I started work on Slodder forms.<br>I can't remember how many I must have built and how often they were 90% the same, including validators. This, of course, lead to a lot of duplicated code for the sake of delivering on time. Features such as reactive select option lists and controls being able to refresh or mutate each other's data, were initially built for the <code>DynamicSelect</code> element and subsequently rolled out to other types of form elements.`;
  private readonly mockBirdDataSource: MockBirdDataSource;
  private refreshBirds = new Subject<null>();

  basic: DynamicFormElement[] = [
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
  disabledSelect: DynamicFormElement[] = [
    new DynamicSelect<string>({
      key: 'birdOfTheYear',
      label: 'Bird of the year',
      value: 'kakapo',
      disabled: true,
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
    }),
  ];
  groupedSelect: DynamicFormElement[] = [
    new DynamicSelect<string>({
      key: 'birdOfTheYear',
      label: 'Bird of the year',
      options: [
        {
          label: 'Flightless',
          options: [
            {
              label: 'Kiwi',
              value: 'kiwi',
            }, {
              label: 'Kakapo',
              value: 'kakapo',
            }
          ]
        }, {
          label: 'Flighted',
          options: [
            {
              label: 'Tui',
              value: 'tui',
            }, {
              label: 'Toutouwai',
              value: 'toutouwai',
            }
          ]
        }
      ]
    }),
  ];
  nullableSelect: DynamicFormElement[] = [
    new DynamicSelect<string>({
      key: 'birdOfTheYear',
      label: 'Bird of the year',
      nullable: true,
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
    }),
  ];
  disabledOptions: DynamicFormElement[] = [
    new DynamicSelect<string>({
      key: 'birdOfTheYear',
      label: 'Bird of the year',
      options: [
        {
          label: 'Tomtit',
          value: 'tomtit',
          disabled: true,
        }, {
          label: 'Piwakawaka',
          value: 'piwakawaka',
        }, {
          label: 'Tauhoe',
          value: 'tauhoe',
          disabled: true
        }
      ]
    }),
  ];
  filterSelect: DynamicFormElement[] = [
    new DynamicSelect<string>({
      key: 'birdOfTheYear',
      label: 'Bird of the year',
      useFilter: true,
      options: [
        {
          label: 'Toutouwai',
          value: 'toutouwai',
        }, {
          label: 'Karearea',
          value: 'karearea',
        }, {
          label: 'Kea',
          value: 'kea',
        }
      ]
    }),
  ];
  multiSelect: DynamicFormElement[] = [
    new DynamicSelect<string>({
      key: 'goodBirds',
      label: 'Select all the good birds',
      useFilter: true,
      allowMultiple: true,
      useSelectAll: true,
      options: [
        {
          label: 'Piwakawaka',
          value: 'piwakawaka',
        }, {
          label: 'Toutouwai',
          value: 'toutouwai',
        }, {
          label: 'Karearea',
          value: 'karearea',
        }, {
          label: 'Kea',
          value: 'kea',
        }, {
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
    }),
  ];

  public override examples = [
    {
      heading: 'Basic select',
      description: `A basic select element with a static list of options and nothing else. You should provide at least a <code>key</code>, <code>label</code> and <code>options</code> property to draw a basic select on the screen.`,
      key: 'basic',
      panelOpen: false,
      formElements: this.basic,
      fileGists:  [
        {
          name: 'form.component.ts',
          code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<slf-dynamic-form-group [rootNode]="true" [formElements]="questions"></slf-dynamic-form-group>\`,
})
export class FormComponent {
  formElements = [
    new DynamicSelect<string>({
      key: 'birdOfTheYear',
      label: 'Bird of the year',

      // Options are passed as a static array
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
    }, {
      heading: 'Disabled select',
      description: `In some cases you want to disable the select element. If this is the case, you set <code>disabled: true</code> and the select element will be disabled. In the example below, I have pre-set a value for the select element, but this is not necessary. Unlike Angular's default behaviour, Slodder forms <i>does</i> return the value of disabled elements by default.`,
      key: 'disabled',
      panelOpen: false,
      formElements: this.disabledSelect,
      fileGists: [
        {
          name: 'form.component.ts',
          code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<slf-dynamic-form-group [rootNode]="true" [formElements]="questions"></slf-dynamic-form-group>\`,
})
export class FormComponent {
  formElements = [
    new DynamicSelect<string>({
      key: 'birdOfTheYear',
      label: 'Bird of the year',

      // Value has been pre-set
      value: 'kakapo',

      // Select element is disabled
      disabled: true,
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
    }, {
      heading: 'Nullable select',
      description: `More often than not you want the user to be able to deselect an option and not select a different one in return. Simply provide the <code>nullable: true</code> property.`,
      key: 'nullable',
      panelOpen: false,
      formElements: this.nullableSelect,
      fileGists: [
        {
          name: 'form.component.ts',
          code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<slf-dynamic-form-group [rootNode]="true" [formElements]="questions"></slf-dynamic-form-group>\`,
})
export class FormComponent {
  formElements = [
    new DynamicSelect<string>({
      key: 'birdOfTheYear',
      label: 'Bird of the year',

      // Allow the element to have a null value
      nullable: true,
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
    }, {
      heading: 'Filtered select',
      description: `A very powerful feature of the <code>DynamicSelect</code> element, is the option to add a filter. The filter removes any element that does not match with the entered value, which is very useful for select elements with many options. Just set <code>useFilter: true</code> and a filter will be added to the top of the select element options list.`,
      key: 'filter',
      panelOpen: false,
      formElements: this.filterSelect,
      fileGists: [
        {
          name: 'form.component.ts',
          code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<slf-dynamic-form-group [rootNode]="true" [formElements]="questions"></slf-dynamic-form-group>\`,
})
export class FormComponent {
  formElements = [
    new DynamicSelect<string>({
      key: 'birdOfTheYear',
      label: 'Bird of the year',

      // Add a filter to the select element
      useFilter: true,
      options: [
        {
          label: 'Toutouwai',
          value: 'toutouwai',
        }, {
          label: 'Karearea',
          value: 'karearea',
        }, {
          label: 'Kea',
          value: 'kea',
        }
      ]
    })
  ];
}`
        }
      ]
    }, {
      heading: 'Multi-select',
      description: `To allow the user to select more than one option, pass the <code>allowMultiple: true</code> property. It is also simple to add a 'Select all' option. Just add <code>useSelectAll: true</code>.<br>Please note that the value type of a multi-select will be an <code>array</code> instead of a <code>string</code> or <code>number</code>.`,
      key: 'multi',
      panelOpen: false,
      formElements: this.multiSelect,
      fileGists: [
        {
          name: 'form.component.ts',
          code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<slf-dynamic-form-group [rootNode]="true" [formElements]="questions"></slf-dynamic-form-group>\`,
})
export class FormComponent {
  formElements = [
    new DynamicSelect<string>({
      key: 'goodBirds',
      label: 'Select the good birds',

      // Add a filter to the select element
      withFilter: true,

      // Allow the user to select multiple options
      allowMultiple: true,

      // Add a 'Select all' option to the top of the list of options
      useSelectAll: true,
      options: [
        {
          label: 'Piwakawaka',
          value: 'piwakawaka',
        }, {
          label: 'Toutouwai',
          value: 'toutouwai',
        }, {
          label: 'Karearea',
          value: 'karearea',
        }, {
          label: 'Kea',
          value: 'kea',
        }, {
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
    }, {
      heading: 'Grouped options',
      description: 'The dynamic select element is also able to display grouped options. Provide a list of <code>SelectOptionGroup</code> elements instead of <code>SelectOption</code> elements and the rest is taken care of.',
      key: 'grouped',
      panelOpen: false,
      formElements: this.groupedSelect,
      fileGists: [
        {
          name: 'form.component.ts',
          code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<slf-dynamic-form-group [rootNode]="true" [formElements]="questions"></slf-dynamic-form-group>\`,
})
export class FormComponent {
  formElements = [
    new DynamicSelect<string>({
      key: 'birdOfTheYear',
      label: 'Bird of the year',
      allowMultiple: true,
      options: [
        {

          // Options are grouped
          label: 'Flightless',
          options: [
            {
              label: 'Kiwi',
              value: 'kiwi',
            }, {
              label: 'Kakapo',
              value: 'kakapo',
            }
          ]
        }, {
          label: 'Flighted',
          options: [
            {
              label: 'Tui',
              value: 'tui',
            }, {
              label: 'Toutouwai',
              value: 'toutouwai',
            }
          ]
        }
      ]
    })
  ];
}`
        }
      ]
    }, {
      heading: 'Disabled options',
      description: `When options should be disabled, simply mark them as disabled in their respective properties and they will be disabled by default. If you need more complex behaviour than this please refer to <a href="mutation">mutation</a>.`,
      key: 'disabled-options',
      panelOpen: false,
      formElements: this.disabledOptions,
      fileGists: [
        {
          name: 'form.component.ts',
          code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<slf-dynamic-form-group [rootNode]="true" [formElements]="questions"></slf-dynamic-form-group>\`,
})
export class FormComponent {
  formElements = [
    new DynamicSelect<string>({
      key: 'birdOfTheYear',
      label: 'Bird of the year',
      options: [
        {
          label: 'Tomtit',
          value: 'tomtit',

          // This option is disabled. A realistic use-case would be when this is done through a reactive data source
          disabled: true,
        }, {
          label: 'Piwakawaka',
          value: 'piwakawaka',
        }, {
          label: 'Tauhoe',
          value: 'tauhoe',

          // This option is also disabled
          disabled: true
        }
      ]
    })
  ];
}`
        },
      ]
    }
  ]

  constructor( private service: MockBirdService, protected override asideService: AsideService ) {
    super( asideService );
    this.mockBirdDataSource = new MockBirdDataSource( service );

    this.examples.push({
      heading: 'Reactive data source',
      description: `Being able to provide a select element with a reactive data source is, in my opinion, one of the most powerful features of this library. It allows you to easily modify the list of displayed options, regardless of where the data comes from. Below is a simple implementation that shows how such a thing could be achieved. Whenever the value of the first select element changes, the data of the second one is refreshed accordingly through an HTTP request incorporating the new value.`,
      key: 'reactive-data-source',
      panelOpen: false,
      formElements: [
        new DynamicFormGroup({
          key: 'observations',
          direction: 'row',
          formElements: [
            new DynamicSelect({
              key: 'region',
              label: 'Select a region',
              value: 'NZ',
              linkedElements: [{ key: 'recentObservations', label: 'Recently observed birds', refreshOnValueChange: true }],
              options: [
                {
                  label: 'Australia',
                  value: 'AU',
                }, {
                  label: 'New Zealand',
                  value: 'NZ'
                }
              ]
            }),
            new DynamicSelect<string>({
              key: 'recentObservations',
              label: 'Recently observed birds',
              useFilter: true,
              allowMultiple: true,
              dataSource: this.mockBirdDataSource,
            })
          ]
        })
      ],
      fileGists: [
        {
          name: 'form.component.ts',
          code: `@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ CommonModule, DynamicFormModule ],
  template: \`<slf-dynamic-form-group [rootNode]="true" [formElements]="questions"></slf-dynamic-form-group>\`,
})
export class FormComponent {
  birdDataSource = new BirdDataSource();

  formElements = [
    new DynamicFormGroup({
      key: 'observations',
      direction: 'row',
      formElements: [
        new DynamicSelect({
          key: 'region',
          label: 'Select a region',
          value: 'NZ',
          linkedElements: [
            {
              // Link the 'region' control to the 'recentObservations' control
              key: 'recentObservations',

              // Refresh the linked 'recentObservations' control whenever the value
              // of the 'region' control changes. The new value of this control will be passed
              // to the refresh() method of the other control's data source where it can be acquired.
              refreshOnValueChange: true,
            }
          ],
          options: [
            {
              label: 'Australia',
              value: 'AU',
            }, {
              label: 'New Zealand',
              value: 'NZ'
            }
          ]
        }),
        new DynamicSelect<string>({
          key: 'recentObservations',
          label: 'Recently observed birds',
          allowMultiple: true,

          // Populate the options list through a reactive data source.
          // This data source should extend the AbstractObservableDataSource and implement
          // its members to allow the DynamicSelect element to function
          dataSource: this.birdDataSource
        })
      ]
    })
  ];

  constructor() {
    this.refresh();
  }

  refresh() {
    this.userDataSource.refresh();
  }
}`
        }, {
          name: 'bird.data-source.ts',
          code: `// You should extend the AbstractObservableDataSource class and pass an instance of your own data source
// to the dataSource property in the options provided to the DynamicSelect constructor
export class BirdDataSource extends AbstractObservableDataSource<SelectOption<string>[]> {
  connect(): Observable<SelectOption<string>[]> {
    // Returns an observable that emits the select options to be displayed
    ...
  }

  refresh( args?: Map<string, any> ): void {
    const region = args.get('region');
    // Is called to refresh data and cause the observable returned from connect() to re-emit
    ...
  }
}`
        }
      ]
    });

    this.refreshBirds.pipe(
      tap(() => this.mockBirdDataSource.refresh( new Map([['region', 'NZ']]) ))
    ).subscribe();
    this.refresh();
  }

  refresh() {
    this.refreshBirds.next(null);
  }
}
