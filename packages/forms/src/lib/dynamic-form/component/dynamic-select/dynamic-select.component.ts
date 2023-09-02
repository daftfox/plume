import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import {distinctUntilChanged, map, takeUntil, tap} from 'rxjs/operators';
import { SelectOption, SelectOptionGroup, SelectOptionValueType, SelectValueType } from '../../model';
import { startWith, combineLatest, Observable, iif } from 'rxjs';
import { filterItems } from '@slodder/utils';
import {
  AbstractReactiveFormQuestionComponent
} from '../abstract-reactive-form-question/abstract-reactive-form-question.component';

@Component({
  selector: 'slf-select-form-question',
  templateUrl: './dynamic-select.component.html',
  styleUrls: ['../abstract-form-question/abstract-form-question.component.scss', './dynamic-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicSelectComponent<T = SelectOptionValueType>
extends AbstractReactiveFormQuestionComponent<
  SelectOption<T> | SelectOptionGroup<T>,
  SelectOptionValueType
> implements OnInit {
  @Input() noEntriesFoundLabel = 'No entries found';
  @Input() allowMultiple = false;
  @Input() nullable = false;
  @Input() useFilter = false;
  @Input() useSelectAll = false;
  @Input() options: (SelectOption<T> | SelectOptionGroup<T>)[] = [];

  displayedOptions: (SelectOption<T> | SelectOptionGroup<T>)[] = [];
  filterControl = new FormControl<T>(undefined);
  allSelected = false;

  constructor() {
    super();

    this.validationMessages.set('required', 'Please select an option');
  }

  override ngOnInit() {
    super.ngOnInit();
    this.initSelectOptions();
  }

  initSelectOptions() {
    if (this.dataSource) {

      // Disable the select element when new data is being fetched
      this.dataSource.refreshing.pipe(
        tap( isRefreshing => {
          if ( isRefreshing ) {
            this.control.disable();
          } else {
            this.control.enable();
          }
        })
      ).subscribe();

      const dataSource = iif(
        () => this.useFilter,
        // Combine the data source with the filter control's valueChanges if filter is enabled
        combineLatest([
          this.dataSource.connect().pipe(
            this.resetValueOnDataSourceEmit.bind(this),
          ),
          this.filterControl.valueChanges.pipe(startWith(this.filterControl.value))
        ]).pipe(
          takeUntil(this.unsubscribe),
          map(([options, filterValue]: [(SelectOption<T> | SelectOptionGroup<T>)[], T]) => this.filterOptions(options, filterValue)),
        ),

        // Or use the data source as is if the filter is not enabled
        this.dataSource.connect().pipe(
          this.resetValueOnDataSourceEmit.bind(this)
        )
      );

      // Subscribe to data source emits
      dataSource.pipe(
        tap((options: (SelectOption<T> | SelectOptionGroup<T>)[]) => this.displayedOptions = options)
      ).subscribe();
    } else {
      if ( this.useFilter ) {

        // Subscribe to the filter
        this.filterControl.valueChanges.pipe(
          startWith(this.filterControl.value),
          takeUntil(this.unsubscribe),

          // Filter the displayed options whenever the filter control value changes
          map((filterValue: T) => this.filterOptions(this.options, filterValue)),
          tap( filteredOptions => this.displayedOptions = filteredOptions)
        ).subscribe();
      } else {

        // Static list of options
        this.displayedOptions = this.options;
      }
    }

    if ( this.allowMultiple && this.value === undefined ) {
      this.value = [];
      this.control.patchValue(this.value);
    }
  }

  filterOptions(options: (SelectOption<T> | SelectOptionGroup<T>)[], filterValue: T): SelectOption<T>[] | SelectOptionGroup<T>[] {
    if (this.isGrouped(options)) {
      // We've asserted that the options are of type SelectOptionGroup[]
      return (options as SelectOptionGroup<T>[])
        .map((group) => {
          return {
            label: group.label,
            options: !this.valueIsEmpty(filterValue) ? filterItems(group.options, { label: filterValue }) : group.options,
          };
        })
        .filter((group) => group.options.length > 0);
    } else {
      // We've asserted that the options are of type SelectOption[]
      return !this.valueIsEmpty(filterValue) ? filterItems(options as SelectOption<T>[], { label: filterValue }) : options as SelectOption<T>[];
    }
  }

  valueIsEmpty(value: T): boolean {
    return value === '' || value === null || value === undefined;
  }

  isGrouped(options: (SelectOption<T> | SelectOptionGroup<T>)[]): boolean {
    return Array.isArray(options) && options[0] && Object.prototype.hasOwnProperty.call(options[0], 'options');
  }

  toggleOne() {
    if (this.allowMultiple && this.useSelectAll) {
      if (this.allSelected) {
        this.allSelected = false;
      }
      if (this.control.value.length === this.displayedOptions.length) {
        this.allSelected = true;
      }
    }
  }

  // toggleGroup( group: SelectOptionGroup<T> ) {
  //   if ( !this.allowMultiple ) return;
  //   let options = group.options.map( ({value}) => value);
  //   if ( group.selected ) {
  //     options = (this.control.value as T[]).filter( value => !options.find( option => option === value) );
  //   } else {
  //     options = [...new Set([...options, ...(this.control.value as T[])])];
  //   }
  //   this.control.patchValue( options );
  //   group.selected = !group.selected;
  // }

  toggleAll() {
    if (this.allSelected) {
      this.control.patchValue([...this.displayedOptions.map((item) => {
        if ( this.isGrouped(this.displayedOptions) ) {
          return (item as SelectOptionGroup).options.map( option => option.value);
        } else {
          return (item as SelectOption).value;
        }
      })]);
    } else {
      this.control.patchValue([]);
    }
  }

  asSelectOptionArray( selectOptions: (SelectOption<T> | SelectOptionGroup<T>)[] ): SelectOption<T>[] {
    return selectOptions as SelectOption<T>[];
  }

  asSelectOptionGroupArray( selectOptionGroups: (SelectOption<T> | SelectOptionGroup<T>)[] ): SelectOptionGroup<T>[] {
    return selectOptionGroups as SelectOptionGroup<T>[];
  }

  /**
   * Adjust the control's value if the newly emitted list of options has changed from the previous one.
   * E.g. when the data has been refreshed. Selected values that no longer exist are removed while existing ones remain.
   *
   * @template { SelectOptionValueType } T
   * @param { Observable<SelectOption<T>[] | SelectOptionGroup<T>[]> } source
   * @private
   */
  private resetValueOnDataSourceEmit( source: Observable<(SelectOption<T>| SelectOptionGroup<T>)[]>) {
    return source.pipe(
      distinctUntilChanged(),
      // Reset the control's value if the data source has emitted a new value
      tap(( newOptions ) => {
        if ( ( this.allowMultiple && this.control.value && this.control.value.length ) ) {

          // Control value is an array
          const existingValues = this.control.value.filter( ( value: T ) => {
            return this.flattenOptions( newOptions ).find( ( option: SelectOption<T> ) => option.value === value )
          });

          this.control.setValue(existingValues);
        } else if ( this.control.value ) {

          // Control value contains a single value
          if ( !this.flattenOptions( newOptions ).length ) {
            this.control.setValue(undefined);
          }
        }
      }),
    )
  }

  private flattenOptions( options: (SelectOption<T> | SelectOptionGroup<T>)[] ): SelectOption<T>[] {
    const flattenedOptions: SelectOption<T>[] = [];
    if ( this.isGrouped( options ) ) {
      options.forEach( group => flattenedOptions.push( ...(group as SelectOptionGroup<T>).options ) );
    } else {
      flattenedOptions.push( ...(options as SelectOption<T>[]) );
    }

    return flattenedOptions;
  }
}
