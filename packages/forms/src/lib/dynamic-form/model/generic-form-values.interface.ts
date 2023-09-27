import { SelectOptionValueType } from './select-option.interface';

export type DynamicFormElementValueType = string | number | string[] | number[] | boolean | Date | SelectOptionValueType | SelectOptionValueType[] | null;

export interface DynamicFormValues {
  [key: string]: DynamicFormElementValueType;
}
