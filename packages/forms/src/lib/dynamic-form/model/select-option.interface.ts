export type SelectOptionValueType = string | number | string[] | number[] | undefined;

export interface SelectOption<T = SelectOptionValueType> {
  label: string;
  value: T;
  disabled?: boolean;
}
