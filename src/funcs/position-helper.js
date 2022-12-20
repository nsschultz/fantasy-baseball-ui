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
 * @param {object} allPositions   A map of the positions. The key is the position code and the value is the position object.
 * @param {array}  selectedValues An array of position keys that the key is being compared against.
 * @param {string} key            The position code to compare against the other positions.
 * @returns True if the key can be found as an additional position of any of the selected values.
 *          False if the key is either at the lowest level or just not doesn't have an ancestor that was already selected.
 */
export const isChildPosition = (allPositions, selectedValues, key) =>
  allPositions && selectedValues && key
    ? selectedValues.some((v) => allPositions[v] && allPositions[v].additionalPositions.some((ap) => ap.code === key))
    : false;
