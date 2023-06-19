import { AbstractFormQuestion, FormQuestionOptions } from './abstract-form-question';
import { SelectOption, SelectOptionValueType } from './select-option.interface';
import { SelectOptionGroup } from './select-option-group.interface';
import { Observable } from 'rxjs';

export interface ObservableDataSource<T> {
  connect: () => Observable<T>;
  refresh: ( args: Map<string, any> ) => void;
}

export interface DropdownFormQuestionOptions<T = SelectOptionValueType> extends FormQuestionOptions<T> {
  options?: SelectOption<T>[] | SelectOptionGroup<T>[];
  dataSource?: ObservableDataSource<SelectOption<T>[] | SelectOptionGroup<T>[]>;
  allowMultiple?: boolean;
  withAll?: boolean;
  allowNull?: boolean;
  withFilter?: boolean;
  noEntriesFoundLabel?: string;
}

export class DropdownFormQuestion<T = SelectOptionValueType> extends AbstractFormQuestion<T> {
  options: SelectOption<T>[] | SelectOptionGroup<T>[];
  dataSource?: ObservableDataSource<SelectOption<T>[] | SelectOptionGroup<T>[]>;
  allowMultiple: boolean;
  allowNull: boolean;
  withAll: boolean;
  withFilter: boolean;
  noEntriesFoundLabel: string;

  constructor(options: DropdownFormQuestionOptions<T>) {
    super(options);

    if (options.withAll && !options.allowMultiple) {
      throw new Error("Unable to add 'select all' option if selecting multiple options is not enabled.");
    }

    this.allowMultiple = options.allowMultiple || false;
    this.allowNull = options.allowNull || false;
    this.withAll = options.withAll || false;
    this.withFilter = options.withFilter || false;
    this.options = options.options || [];
    this.dataSource = options.dataSource;
    this.noEntriesFoundLabel = options.noEntriesFoundLabel || 'No entries found';
  }
}
