import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFormQuestionComponent } from '../abstract-form-question/abstract-form-question.component';
import { map, takeUntil, tap } from 'rxjs/operators';
import { MatOption } from '@angular/material/core';
import { ObservableDataSource, SelectOption, SelectOptionGroup, SelectOptionValueType } from '../../model';
import { startWith, combineLatest } from 'rxjs';
import { filterItems } from '@slodder/utils';

@Component({
  selector: 'slf-dropdown-form-question',
  templateUrl: './dropdown-form-question.component.html',
  styleUrls: ['../abstract-form-question/abstract-form-question.component.scss'],
})
export class DropdownFormQuestionComponent<T = SelectOptionValueType> extends AbstractFormQuestionComponent<T> implements OnInit {
  @Input() noEntriesFoundLabel = 'No entries found';
  @Input() allowMultiple = false;
  @Input() allowNull = false;
  @Input() withFilter = false;
  @Input() withAll = false;
  @Input() options: SelectOption<T>[] | SelectOptionGroup<T>[] = [];
  @Input() dataSource?: ObservableDataSource<SelectOption<T>[] | SelectOptionGroup<T>[]> = undefined;

  @ViewChild('allSelected') public allSelected?: MatOption = undefined;

  displayedOptions: SelectOption<T>[] | SelectOptionGroup<T>[] = [];
  filterControl = new FormControl<T>(undefined);

  override ngOnInit() {
    super.ngOnInit();
    this.initSelectOptions();
  }

  initSelectOptions() {
    if (this.dataSource) {
      const dataSource = this.withFilter
        ? combineLatest([
          this.dataSource.connect(),
          this.filterControl.valueChanges.pipe(startWith(this.filterControl.value))
        ]).pipe(
            takeUntil(this.unsubscribe),
            map(([options, filterValue]: [SelectOption<T>[] | SelectOptionGroup<T>[], T]) => this.filterOptions(options, filterValue)),
          )
        : this.dataSource.connect();

      dataSource.pipe(tap((options: SelectOption<T>[] | SelectOptionGroup<T>[]) => this.displayedOptions = options)).subscribe();
    } else {
      this.displayedOptions = this.options;
    }
  }

  filterOptions(options: SelectOption<T>[] | SelectOptionGroup<T>[], filterValue: T): SelectOption<T>[] | SelectOptionGroup<T>[] {
    if (this.isGrouped(options)) {
      // We've asserted that this.options is of type SelectOptionGroup[]
      return (options as SelectOptionGroup<T>[])
        .map((group) => {
          return {
            label: group.label,
            options: !this.valueIsEmpty(filterValue) ? filterItems(group.options, { label: filterValue }) : group.options,
          };
        })
        .filter((group) => group.options.length > 0);
    } else {
      // We've asserted that this.options is of type SelectOption[]
      return !this.valueIsEmpty(filterValue) ? filterItems(options as SelectOption<T>[], { label: filterValue }) : options;
    }
  }

  valueIsEmpty(value: T): boolean {
    return value === '' || value === null || value === undefined;
  }

  isGrouped(options: SelectOption<T>[] | SelectOptionGroup<T>[]): boolean {
    return Array.isArray(options) && options[0] && Object.prototype.hasOwnProperty.call(options[0], 'options');
  }

  toggleOne() {
    if (this.allowMultiple && this.withAll) {
      if (this.allSelected.selected) {
        this.allSelected.deselect();
      }
      if (this.control.value.length === this.displayedOptions.length) {
        this.allSelected.select();
      }
    }
  }

  toggleAll() {
    // if (this.allSelected.selected) {
    //   this.control.patchValue([...this.displayedOptions.map((item) => item.value), 0]);
    // } else {
    //   this.control.patchValue([]);
    // }
  }

  asSelectOptionArray( selectOptions: SelectOption<T>[] | SelectOptionGroup<T>[] ): SelectOption<T>[] {
    return selectOptions as SelectOption<T>[];
  }

  asSelectOptionGroupArray( selectOptionGroups: SelectOption<T>[] | SelectOptionGroup<T>[] ): SelectOptionGroup<T>[] {
    return selectOptionGroups as SelectOptionGroup<T>[];
  }
}
