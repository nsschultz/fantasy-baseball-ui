const compare = (a, b) => (a == b ? 0 : a == null ? 1 : b == null ? -1 : b < a ? -1 : 1);

const objectCompare = (a, b) => (a === b ? 0 : !a ? 1 : -1);

/**
 * Default comparator for two objects. Verifies the objects exist and then compares them based on the provide key.
 * @param {object} obj1 The first object to compare.
 * @param {object} obj2 The second object to compare.
 * @param {string} key  The key to the field that should exist on both objects for comparison purposes.
 * @returns An int (-1, 0, 1) to indicate how the objects compared.
 */
export const defaultObjectComparator = (obj1, obj2, key) => {
  if (!obj1 || !obj2) return objectCompare(obj1, obj2);
  return compare(obj1[key], obj2[key]);
};

/**
 * Compares two players by their type, then by their name (using the playerNameComparator).
 * @param {object} obj1 The first object to compare.
 * @param {object} obj2 The second object to compare.
 * @param {string} key  The key to the field that should exist on both objects for comparison purposes.
 * @returns An int (-1, 0, 1) to indicate how the objects compared.
 */
export const playerDefaultComparator = (player1, player2) => {
  if (!player1 || !player2) return objectCompare(player1, player2);
  let value = compare(player1.type, player2.type);
  return value === 0 ? playerNameComparator(player1, player2) : value;
};

/**
 * Compares two players by their last name and then by their first name.
 * @param {object} player1 The first player to compare.
 * @param {object} player2 The second player to compare.
 * @returns An int (-1, 0, 1) to indicate how the objects compared.
 */
export const playerNameComparator = (player1, player2) => {
  if (!player1 || !player2) return objectCompare(player1, player2);
  let value = compare(player1.lastName, player2.lastName);
  if (value === 0) value = compare(player1.firstName, player2.firstName);
  return value === 0 ? compare(player1.id, player2.id) : value;
};

/**
 * Compares two players by their positions (assumes the positions arrays are already sorted by sort order) and then by the playerDefaultComparator.
 * @param {object} player1 The first player to compare.
 * @param {object} player2 The second player to compare.
 * @returns An int (-1, 0, 1) to indicate how the objects compared.
 */
export const playerPositionsComparator = (player1, player2) => {
  if (!player1 || !player2) return objectCompare(player1, player2);
  if (!player1.positions || !player2.positions) return objectCompare(player1.positions, player2.positions);
  for (let i = 0; i < player1.positions.length; i++) {
    if (player2.positions.length <= i) return -1;
    const value = compare(player1.positions[i].sortOrder, player2.positions[i].sortOrder);
    if (value !== 0) return value;
  }
  return player2.positions.length > player1.positions.length ? 1 : playerDefaultComparator(player1, player2);
};

/**
 * Compares two players by their teams (via team code) and then by the playerDefaultComparator.
 * @param {object} obj1 The first object to compare.
 * @param {object} obj2 The second object to compare.
 * @param {string} key  The key to the field that should exist on both objects for comparison purposes.
 * @returns An int (-1, 0, 1) to indicate how the objects compared.
 */
export const playerTeamComparator = (player1, player2) => {
  if (!player1 || !player2) return objectCompare(player1, player2);
  if (!player1.team || !player2.team) return objectCompare(player1.team, player2.team);
  const value = compare(player1.team.code, player2.team.code);
  return value !== 0 ? value : playerDefaultComparator(player1, player2);
};
