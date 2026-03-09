import { BaseEntity } from "../types/basic-types";
import { Player } from "../types/entity-types";

const compare = <T>(a: T, b: T): number => {
  if (a == b) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return b < a ? -1 : 1;
};

const objectCompare = <T>(a: T | null | undefined, b: T | null | undefined): number => {
  if (a === b) return 0;
  if (a) return -1;
  return 1;
};

export const defaultObjectComparator = <T extends BaseEntity>(obj1: T | null | undefined, obj2: T | null | undefined, key: keyof T): number => {
  if (!obj1 || !obj2) return objectCompare(obj1, obj2);
  return compare(obj1[key], obj2[key]);
};

export const playerDefaultComparator = (player1?: Player | null, player2?: Player | null): number => {
  if (!player1 || !player2) return objectCompare(player1, player2);
  const value = compare(player1.type, player2.type);
  return value === 0 ? playerNameComparator(player1, player2) : value;
};

export const playerNameComparator = (player1?: Player | null, player2?: Player | null): number => {
  if (!player1 || !player2) return objectCompare(player1, player2);
  let value = compare(player1.lastName, player2.lastName);
  if (value === 0) value = compare(player1.firstName, player2.firstName);
  return value === 0 ? compare(player1.id, player2.id) : value;
};

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

export const playerTeamComparator = (player1?: Player | null, player2?: Player | null): number => {
  if (!player1 || !player2) return objectCompare(player1, player2);
  if (!player1.team || !player2.team) return objectCompare(player1.team, player2.team);
  const value = compare(player1.team.code, player2.team.code);
  if (value === 0) return playerDefaultComparator(player1, player2);
  return value;
};
