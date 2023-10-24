import { Route } from '@angular/router';
import { TextInputDemoComponent } from './component/text-input-demo/text-input-demo.component';
import { CheckboxDemoComponent } from './component/checkbox-demo/checkbox-demo.component';
import { DatepickerDemoComponent } from './component/datepicker-demo/datepicker-demo.component';
import { SelectDemoComponent } from './component/select-demo/select-demo.component';
import { LinkedElementComponent } from './component/linked-element/linked-element.component';
import { AsideComponent } from './component/aside/aside.component';
import { ValidationComponent } from './component/validation/validation.component';
import { LandingComponent } from './component/landing/landing.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'validation',
    component: ValidationComponent,
  },
  {
    path: 'linked-element',
    component: LinkedElementComponent,
  },
  {
    path: 'form-components',
    children: [
      {
        path: 'text-input-demo',
        component: TextInputDemoComponent,
      },
      {
        path: 'checkbox-demo',
        component: CheckboxDemoComponent,
      },
      {
        path: 'datepicker-demo',
        component: DatepickerDemoComponent,
      },
      {
        path: 'select-demo',
        component: SelectDemoComponent,
      },
    ],
  },
  {
    path: '',
    outlet: 'aside',
    component: AsideComponent,
  },
];
