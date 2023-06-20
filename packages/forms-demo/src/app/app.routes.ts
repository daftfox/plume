import { Route } from '@angular/router';
import { TextboxDemoComponent } from './component/textbox-demo/textbox-demo.component';
import { CheckboxDemoComponent } from './component/checkbox-demo/checkbox-demo.component';
import { DatepickerDemoComponent } from './component/datepicker-demo/datepicker-demo.component';

export const appRoutes: Route[] = [
  {
    path: 'textbox-demo',
    component: TextboxDemoComponent
  }, {
    path: 'checkbox-demo',
    component: CheckboxDemoComponent
  }, {
    path: 'datepicker-demo',
    component: DatepickerDemoComponent
  },
];
