import { SelectOptionValueType } from './select-option.interface';

export type DynamicFormElementValueType =
  | string
  | number
  | boolean
  | Date
  | SelectOptionValueType
  | null;

export interface DynamicFormValues {
  [key: string]: DynamicFormElementValueType;
}
