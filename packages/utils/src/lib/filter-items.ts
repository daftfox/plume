import { isNullish } from './is-nullish';

export const filterItems = <T>( items: T[], filters: any ): T[] => {
  return [...items].filter( item => {
    for ( const key in filters ) {
      const filterValue = filters[key];
      const itemPropertyValue = item[key as keyof T];

      // If a filter property doesn't contain a value or the item doesn't have a property by that name, then we don't
      // filter by it
      if ( filterValue !== '' && !isNullish( filterValue ) && Object.prototype.hasOwnProperty.call( item, key )) {
        if ( typeof filterValue === 'string' && typeof itemPropertyValue === 'string' ) {
          return (itemPropertyValue as string).toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
        } else if ( typeof filterValue === 'number' || typeof filterValue === 'boolean' ) {
          return itemPropertyValue === filterValue;
        }
      }
    }

    // Filters were empty or did not match with any known properties of the item
    return true;
  })
}
