export const makeMap = <T, K extends string | number, V>(values: T[], keyMaker: (obj: T) => K, valueMaker: (obj: T) => V): Record<K, V> => {
  if (!values || !keyMaker || !valueMaker) return {} as Record<K, V>;
  return values.filter(Boolean).reduce(function (map, obj) {
    map[keyMaker(obj)] = valueMaker(obj);
    return map;
  }, {} as Record<K, V>);
};
