import { ValidatorFn } from '@angular/forms';
import { IDynamicFormService } from '../model/service/dynamic-form.service.interface';

export interface PlumeValidatorFn {
  (service: IDynamicFormService): ValidatorFn;
}
