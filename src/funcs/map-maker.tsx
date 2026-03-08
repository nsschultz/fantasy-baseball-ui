/**
 * Makes a mapping from the given values. Returns an empty object if all 3 parameters aren't provided.
 * @param values     The values to convert into the map entries.
 * @param keyMaker   The function for creating the key from the values.
 * @param valueMaker The function for creating the value from the values.
 * @returns A new object created from an array that is used for looking up the records.
 */
export const makeMap = <T, K extends string | number, V>(
  values: T[] | null | undefined,
  keyMaker: ((obj: T) => K) | null | undefined,
  valueMaker: ((obj: T) => V) | null | undefined
): Record<K, V> => {
  if (!values || !keyMaker || !valueMaker) return {} as Record<K, V>;
  return values.filter(Boolean).reduce(function (map, obj) {
    map[keyMaker(obj)] = valueMaker(obj);
    return map;
  }, {} as Record<K, V>);
};
