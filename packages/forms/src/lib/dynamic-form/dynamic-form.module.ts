import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DropdownFormQuestionComponent } from './component/dropdown-form-question/dropdown-form-question.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CheckboxFormQuestionComponent } from './component/checkbox-form-question/checkbox-form-question.component';
import { MatBadgeModule } from '@angular/material/badge';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { DatepickerFormQuestionComponent } from './component/datepicker-form-question/datepicker-form-question.component';
import { TextboxFormQuestionComponent } from './component/textbox-form-question/textbox-form-question.component';
import { CombinationFormQuestionComponent } from './component/combination-form-question/combination-form-question.component';
import { DynamicFormGroupComponent } from './component/dynamic-form-group/dynamic-form-group.component';
import { DynamicFormQuestionComponent } from './component/dynamic-form-question/dynamic-form-question.component';
import { FormErrorsComponent } from './component/form-errors/form-errors.component';
import { MatRadioModule } from '@angular/material/radio';
import { RadioButtonFormQuestionComponent } from './component/radio-button-form-question/radio-button-form-question.component';
import { TextareaFormQuestionComponent } from './component/textarea-form-question/textarea-form-question.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { ToggleFormQuestionComponent } from './component/toggle-form-question/toggle-form-question.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormHintComponent } from './component/form-hint/form-hint.component';
import { YearMonthFormatModule } from '../year-month-format';

@NgModule({
  declarations: [
    CheckboxFormQuestionComponent,
    CombinationFormQuestionComponent,
    DatepickerFormQuestionComponent,
    DropdownFormQuestionComponent,
    DynamicFormGroupComponent,
    DynamicFormQuestionComponent,
    FormErrorsComponent,
    FormHintComponent,
    RadioButtonFormQuestionComponent,
    TextareaFormQuestionComponent,
    TextboxFormQuestionComponent,
    ToggleFormQuestionComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
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
    YearMonthFormatModule
  ],
  exports: [
    CheckboxFormQuestionComponent,
    CombinationFormQuestionComponent,
    DatepickerFormQuestionComponent,
    DynamicFormGroupComponent,
    DynamicFormQuestionComponent,
    DropdownFormQuestionComponent,
    FormErrorsComponent,
    FormHintComponent,
    RadioButtonFormQuestionComponent,
    TextareaFormQuestionComponent,
    TextboxFormQuestionComponent,
    ToggleFormQuestionComponent,
  ],
})
export class DynamicFormModule {}
