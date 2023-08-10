import { isBefore } from 'date-fns';

export const compareDates = ( a: Date, b: Date ): number => {
  if ( isBefore(a, b) ) {
    return -1;
  } else if ( isBefore(b, a) ) {
    return 1
  }

  return 0;
}
