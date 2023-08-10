import { isBefore, isEqual } from 'date-fns';

export const isBeforeOrOn = ( dateA: Date, dateB: Date ): boolean => {
  return isBefore( dateA, dateB ) || isEqual( dateA, dateB );
}
