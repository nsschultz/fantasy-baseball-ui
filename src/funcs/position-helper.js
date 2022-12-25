import { makeMap } from "./map-maker";

/**
 * Builds a map from the given positions that maps the position code to the display value.
 * @param {array} positions (Required) A list of position objects to turn into a map.
 * @returns A simple object where the keys are positions codes and the values are the display strings.
 */
export const buildPositionDisplayMap = (positions) =>
  makeMap(
    positions,
    (position) => position.code,
    (position) => position.fullName
  );

/**
 * Creates a new array of positions from the given codes. Removes any position that would alreay be implied based on another position's additional positions.
 * @param {array} selecteds    (Required) An array of the codes to convert into a array of objects.
 * @param {object} positionMap (Required) A map of the positions. The key is the position code and the value is the position object.
 * @returns An array of position objects based off the codes provided.
 */
export const buildPositionList = (selecteds, positionMap) => {
  if (!selecteds || !positionMap) return [];
  let positionList = selecteds.map((s) => positionMap[s]).filter((s) => s);
  return positionList.filter((p) => !matchAnyPosition(positionList, p.code, false)).sort((a, b) => a.sortOrder - b.sortOrder);
};

/**
 * Builds a map from the positions teams that maps the team code to position object.
 * @param {array}  positions (Required) A list of team objects to turn into a map.
 * @param {number} type      (Required) The type of the baseball position.
 * @returns A simple object where the keys are position codes and the values are the position object.
 */
export const buildPositionMap = (positions, type) =>
  makeMap(
    positions.filter((p) => p.playerType === parseInt(type, 10)),
    (position) => position.code,
    (position) => position
  );

/**
 * Checks to see if the given position (the key) exists as a additional position of one of the selected ones.
 * @param {object} positions (Required) A map of the positions. The key is the position code and the value is the position object.
 * @param {array}  selecteds (Required) An array of position keys that the key is being compared against.
 * @param {string} key       (Required) The position code to compare against the other positions.
 * @returns True if the key can be found as an additional position of any of the selected values.
 *          False if the key is either at the lowest level or just not doesn't have an ancestor that was already selected.
 */
export const isChildPosition = (positions, selecteds, key) =>
  positions && selecteds && key
    ? matchAnyPosition(
        selecteds.map((s) => positions[s]),
        key,
        false
      )
    : false;

/**
 * Checks to see if the given position (the key) exists as a additional position of one of the selected ones.
 * Will also check the parent value if the includeParent flag is set.
 * @param {array}  selecteds     (Required) An array of position objects that the key is being compared against.
 * @param {string} key           (Required) The position code to compare against the other positions.
 * @param {bool}   includeParent (Optional) Indicates if the parent object code should be compared against the key.
 * @returns True if the key can be found as an additional position of any of the selected values or if it matches the parent value and the flag is set.
 *          False if the key is either at the lowest level (and the flag isn't set) or just not doesn't have an ancestor that was already selected.
 */
export const matchAnyPosition = (selecteds, key, includeParent) =>
  selecteds && key ? selecteds.some((s) => s && ((includeParent && s.code === key) || s.additionalPositions.some((ap) => ap.code === key))) : false;
