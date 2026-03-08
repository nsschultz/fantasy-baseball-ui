const compare = <T,>(a: T, b: T): number => {
  if (a == b) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return b < a ? -1 : 1;
};

const objectCompare = <T,>(a: T | null | undefined, b: T | null | undefined): number => {
  if (a === b) return 0;
  if (a) return -1;
  return 1;
};

interface Position {
  code: string;
  sortOrder: number;
}

interface Team {
  code: string;
}

interface Player {
  id: number;
  firstName: string;
  lastName: string;
  type: number;
  positions?: Position[];
  team?: Team;
}

/**
 * Default comparator for two objects. Verifies the objects exist and then compares them based on the provide key.
 * @param obj1 The first object to compare.
 * @param obj2 The second object to compare.
 * @param key  The key to the field that should exist on both objects for comparison purposes.
 * @returns An int (-1, 0, 1) to indicate how the objects compared.
 */
export const defaultObjectComparator = <T extends Record<string, unknown>>(obj1: T | null | undefined, obj2: T | null | undefined, key: keyof T): number => {
  if (!obj1 || !obj2) return objectCompare(obj1, obj2);
  return compare(obj1[key], obj2[key]);
};

/**
 * Compares two players by their type, then by their name (using the playerNameComparator).
 * @param player1 The first player to compare.
 * @param player2 The second player to compare.
 * @returns An int (-1, 0, 1) to indicate how the objects compared.
 */
export const playerDefaultComparator = (player1?: Player | null, player2?: Player | null): number => {
  if (!player1 || !player2) return objectCompare(player1, player2);
  const value = compare(player1.type, player2.type);
  return value === 0 ? playerNameComparator(player1, player2) : value;
};

/**
 * Compares two players by their last name and then by their first name.
 * @param player1 The first player to compare.
 * @param player2 The second player to compare.
 * @returns An int (-1, 0, 1) to indicate how the objects compared.
 */
export const playerNameComparator = (player1?: Player | null, player2?: Player | null): number => {
  if (!player1 || !player2) return objectCompare(player1, player2);
  let value = compare(player1.lastName, player2.lastName);
  if (value === 0) value = compare(player1.firstName, player2.firstName);
  return value === 0 ? compare(player1.id, player2.id) : value;
};

/**
 * Compares two players by their positions (assumes the positions arrays are already sorted by sort order) and then by the playerDefaultComparator.
 * @param player1 The first player to compare.
 * @param player2 The second player to compare.
 * @returns An int (-1, 0, 1) to indicate how the objects compared.
 */
export const playerPositionsComparator = (player1?: Player | null, player2?: Player | null): number => {
  if (!player1 || !player2) return objectCompare(player1, player2);
  if (!player1.positions || !player2.positions) return objectCompare(player1.positions, player2.positions);
  for (let i = 0; i < player1.positions.length; i++) {
    if (player2.positions.length <= i) return -1;
    const value = compare(player1.positions[i].sortOrder, player2.positions[i].sortOrder);
    if (value === 0) continue;
    return value;
  }
  return player2.positions.length > player1.positions.length ? 1 : playerDefaultComparator(player1, player2);
};

/**
 * Compares two players by their teams (via team code) and then by the playerDefaultComparator.
 * @param player1 The first player to compare.
 * @param player2 The second player to compare.
 * @returns An int (-1, 0, 1) to indicate how the objects compared.
 */
export const playerTeamComparator = (player1?: Player | null, player2?: Player | null): number => {
  if (!player1 || !player2) return objectCompare(player1, player2);
  if (!player1.team || !player2.team) return objectCompare(player1.team, player2.team);
  const value = compare(player1.team.code, player2.team.code);
  if (value === 0) return playerDefaultComparator(player1, player2);
  return value;
};
