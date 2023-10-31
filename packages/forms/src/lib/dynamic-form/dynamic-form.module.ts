import { NgModule } from '@angular/core';
import { DynamicSelectComponent } from './component/dynamic-select/dynamic-select.component';
import { DynamicCheckboxComponent } from './component/dynamic-checkbox/dynamic-checkbox.component';
import { DynamicTextInputComponent } from './component/dynamic-text-input/dynamic-text-input.component';
import { DynamicFormGroupComponent } from './component/dynamic-form-group/dynamic-form-group.component';
import { DynamicRadioButtonComponent } from './component/dynamic-radio-button/dynamic-radio-button.component';
import { DynamicTextAreaComponent } from './component/dynamic-text-area/dynamic-text-area.component';
import { DynamicToggleComponent } from './component/dynamic-toggle/dynamic-toggle.component';
import { DynamicFormHintComponent } from './component/dynamic-form-hint/dynamic-form-hint.component';
import { DynamicButtonComponent } from './component/dynamic-button/dynamic-button.component';
import { DynamicDatepickerComponent } from './component/dynamic-datepicker/dynamic-datepicker.component';

@NgModule({
  imports: [
    DynamicFormGroupComponent,
    DynamicButtonComponent,
    DynamicCheckboxComponent,
    DynamicDatepickerComponent,
    DynamicFormHintComponent,
    DynamicRadioButtonComponent,
    DynamicSelectComponent,
    DynamicTextAreaComponent,
    DynamicTextInputComponent,
    DynamicToggleComponent,
  ],
  exports: [
    DynamicCheckboxComponent,
    DynamicDatepickerComponent,
    DynamicButtonComponent,
    DynamicFormGroupComponent,
    DynamicSelectComponent,
    DynamicFormHintComponent,
    DynamicRadioButtonComponent,
    DynamicTextAreaComponent,
    DynamicTextInputComponent,
    DynamicToggleComponent,
  ],
})
export class DynamicFormModule {}
