import { SelectOption, SelectOptionValueType } from './select-option.interface';
import { SelectOptionGroup } from './select-option-group.interface';
import { DynamicSelectOptions } from './options';
import { AbstractReactiveFormQuestion } from './abstract-reactive-form-question';
import { DynamicSelectComponent } from '../component/dynamic-select/dynamic-select.component';

export type SelectValueType = string | number;

export class DynamicSelect<T = SelectOptionValueType> extends AbstractReactiveFormQuestion<(SelectOption<T> | SelectOptionGroup<T>), SelectOptionValueType> {
  component = DynamicSelectComponent;
  options: (SelectOption<T> | SelectOptionGroup<T>)[];
  allowMultiple: boolean;
  nullable: boolean;
  useSelectAll: boolean;
  useFilter: boolean;
  noEntriesFoundLabel: string;

  constructor(options: DynamicSelectOptions<T>) {
    super(options);

    if (options.useSelectAll && !options.allowMultiple) {
      throw new Error("Unable to add 'select all' option if selecting multiple options is not enabled.");
    }

    this.allowMultiple = options.allowMultiple || false;
    this.nullable = options.nullable || false;
    this.useSelectAll = options.useSelectAll || false;
    this.useFilter = options.useFilter || false;
    this.options = options.options || [];
    this.dataSource = options.dataSource;
    this.noEntriesFoundLabel = options.noEntriesFoundLabel || 'No entries found';
  }
}
