import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DynamicSelectComponent } from './component/dynamic-select/dynamic-select.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DynamicCheckboxComponent } from './component/dynamic-checkbox/dynamic-checkbox.component';
import { MatBadgeModule } from '@angular/material/badge';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { DynamicTextInputComponent } from './component/dynamic-text-input/dynamic-text-input.component';
import { DynamicFormGroupComponent } from './component/dynamic-form-group/dynamic-form-group.component';
import { FormErrorsComponent } from './component/form-errors/form-errors.component';
import { MatRadioModule } from '@angular/material/radio';
import { DynamicRadioButtonComponent } from './component/dynamic-radio-button/dynamic-radio-button.component';
import { DynamicTextAreaComponent } from './component/dynamic-text-area/dynamic-text-area.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { DynamicToggleComponent } from './component/dynamic-toggle/dynamic-toggle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DynamicFormHintComponent } from './component/dynamic-form-hint/dynamic-form-hint.component';
import { YearMonthFormatModule } from '../year-month-format';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HighlightModule } from 'ngx-highlightjs';
import { DynamicButtonComponent } from './component/dynamic-button/dynamic-button.component';
import {DynamicDatepickerComponent} from "./component/dynamic-datepicker/dynamic-datepicker.component";

@NgModule({
  declarations: [
    // DynamicCheckboxComponent,
    DynamicDatepickerComponent,
    // DynamicSelectComponent,
    // DynamicFormGroupComponent,
    DynamicFormHintComponent,
    DynamicRadioButtonComponent,
    // DynamicTextAreaComponent,
    // DynamicTextInputComponent,
    DynamicToggleComponent,
  ],
  imports: [
    CommonModule,
    DynamicButtonComponent,
    DynamicCheckboxComponent,
    DynamicFormGroupComponent,
    DynamicSelectComponent,
    DynamicTextAreaComponent,
    DynamicTextInputComponent,
    FlexLayoutModule,
    FormsModule,
    FormErrorsComponent,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    NgxTrimDirectiveModule,
    YearMonthFormatModule,
    MatProgressSpinnerModule,
    HighlightModule
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
    DynamicFormGroupComponent,
  ],
})
export class DynamicFormModule {}
