/**
 * Makes a mapping from the given values. Returns an empty object if all 3 parameters aren't provided.
 * @param {array} values     (Required) The values to convert into the map entries.
 * @param {func}  keyMaker   (Required) The function for creating the key from the values.
 * @param {func}  valueMaker (Required) The function for creating the value from the values.
 * @returns A new object created from an array that is used for looking up the records.
 */
export const makeMap = (values, keyMaker, valueMaker) => {
  if (!values || !keyMaker || !valueMaker) return {};
  return values
    .filter((n) => n)
    .reduce(function (map, obj) {
      map[keyMaker(obj)] = valueMaker(obj);
      return map;
    }, {});
};
