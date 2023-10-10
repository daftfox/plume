import { isAfter, isEqual } from 'date-fns';

export const isAfterOrOn = (dateA: Date, dateB: Date): boolean => {
  return isAfter(dateA, dateB) || isEqual(dateA, dateB);
};
