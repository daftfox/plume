import { DynamicFormService } from '../service/dynamic-form.service';
import { ValidatorFn } from '@angular/forms';

export interface PlumeValidatorFn {
  (service: DynamicFormService): ValidatorFn;
}
