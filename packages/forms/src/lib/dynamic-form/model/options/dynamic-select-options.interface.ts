import { SelectOptionGroup } from '../select-option-group.interface';
import { SelectOption, SelectOptionValueType } from '../select-option.interface';
import { DynamicReactiveFormQuestionOptions } from './dynamic-reactive-form-question-options.interface';
import { SelectValueType } from '@slodder/forms';

export interface DynamicSelectOptions<T = SelectOptionValueType> extends DynamicReactiveFormQuestionOptions<SelectOption<T> | SelectOptionGroup<T>, SelectValueType> {
  options?: SelectOption<T>[] | SelectOptionGroup<T>[];
  allowMultiple?: boolean;
  useSelectAll?: boolean;
  nullable?: boolean;
  useFilter?: boolean;
  noEntriesFoundLabel?: string;
}
