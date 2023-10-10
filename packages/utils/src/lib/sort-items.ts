import { SortDirection } from '@angular/material/sort';
import { isNullish } from './is-nullish';
import { isDate } from 'date-fns';
import { compareDates } from './compare-dates';

const naturalSortCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

export const sortItems = <T>(
  items: T[],
  active: keyof T,
  direction: SortDirection,
): T[] => {
  if (!active || direction === '') {
    return items;
  }

  const isAsc = direction === 'asc';

  return [...items].sort((a, b) => {
    const valueA = a[active];
    const valueB = b[active];
    if (isNullish(valueA) && !!valueB) {
      return isAsc ? 1 : -1;
    } else if (isNullish(valueB) && !!valueA) {
      return isAsc ? -1 : 1;
    } else if (isDate(valueA) || isDate(valueB)) {
      return compareDates(valueA as Date, valueB as Date) * (isAsc ? 1 : -1);
    } else if (typeof valueA === 'string' || typeof valueB === 'string') {
      return (
        naturalSortCollator.compare(valueA as string, valueB as string) *
        (isAsc ? 1 : -1)
      );
    } else if (typeof valueA === 'number' || typeof valueB === 'number') {
      return (valueA > valueB ? 1 : -1) * (isAsc ? 1 : -1);
    }

    return 0;
  });
};
