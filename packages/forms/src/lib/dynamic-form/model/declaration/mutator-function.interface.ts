import { IDynamicFormService } from '../service/dynamic-form.service.interface';
import { DynamicFormElementValueType } from '../dynamic-form-values.interface';

/**
 * Mutators are lambdas that are executed serially in order to change a linked element's state or value when this
 * element's value or state changes.
 */

export interface MutatorFn {
  (
    originKey: string,
    targetKey: string,
    service: IDynamicFormService,
    value?: DynamicFormElementValueType,
  ): void;
}
