export type SelectOptionValueType = string | number;

export interface SelectOption<T = SelectOptionValueType> {
  label: string;
  value: T;
  disabled?: boolean;
}
