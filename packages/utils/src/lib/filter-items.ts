import { isNullish } from './is-nullish';

export const filterItems = <T>(items: T[], filters: any): T[] => {
  let filteredData = [...items];
  for (const i in filters) {
    const filterValue = filters[i];

    // If there's no value for a filter, or the item doesn't have a property by that name, then don't filter by it
    if (
      filterValue !== '' &&
      !isNullish(filterValue) &&
      itemHasProperty(filteredData[0], i)
    ) {
      if (typeof filterValue === 'string') {
        // Filter property is of type string. Verify item's property value is a substring of it
        filteredData = filteredData.filter(
          (item) =>
            (item[i as keyof T] as string)
              .toLowerCase()
              .indexOf(filterValue.toLowerCase()) !== -1,
        );
      } else if (
        typeof filterValue === 'number' ||
        typeof filterValue === 'boolean'
      ) {
        // Filter property is of type number or boolean. Verify the item's property value is equal to it
        filteredData = filteredData.filter(
          (item) => item[i as keyof T] === filterValue,
        );
      } else if (Array.isArray(filterValue) && filterValue.length) {
        // Filter property contains an array. Verify the item's property value is present in this array
        filteredData = filteredData.filter((item) =>
          filterValue.includes(item[i as keyof T]),
        );
      }
    }
  }
  return filteredData;
};

const itemHasProperty = <T>(item: T, property: string): boolean =>
  Object.prototype.hasOwnProperty.call(item, property);
