import { SelectOptionGroup } from '../select-option-group.interface';
import {
  SelectOption,
  SelectOptionValueType,
} from '../select-option.interface';
import { DynamicReactiveFormQuestionOptions } from './dynamic-reactive-form-question-options.interface';

export interface DynamicSelectOptions<T = SelectOptionValueType>
  extends DynamicReactiveFormQuestionOptions<
    (SelectOption<T> | SelectOptionGroup<T>)[],
    T | T[]
  > {
  options?: SelectOption<T>[] | SelectOptionGroup<T>[];
  allowMultiple?: boolean;
  useSelectAll?: boolean;
  nullable?: boolean;
  useFilter?: boolean;
  noEntriesFoundLabel?: string;
}
