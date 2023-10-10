import { DynamicTextOptions } from './dynamic-text-options.interface';

export type TextBoxType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'tel'
  | 'url';

export interface DynamicTextInputOptions<T = string | number>
  extends DynamicTextOptions<T> {
  icon?: string;
  type?: TextBoxType;
}
