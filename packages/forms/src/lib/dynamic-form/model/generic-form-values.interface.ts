import { SelectOptionValueType } from './select-option.interface';

export type DynamicFormElementValueType = string | number | string[] | number[] | boolean | Date | SelectOptionValueType | undefined;

export interface DynamicFormValues {
  [key: string]: DynamicFormElementValueType;
}
