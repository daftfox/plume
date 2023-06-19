import { SelectOptionValueType } from './select-option.interface';

export type FormQuestionValueType = string | number | string[] | number[] | boolean | Date | SelectOptionValueType | undefined;

export interface GenericFormValues {
  [key: string]: FormQuestionValueType;
}
