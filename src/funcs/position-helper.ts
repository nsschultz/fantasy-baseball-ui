import { Position, PositionMap } from "../types/entity-types";

import { makeMap } from "./map-maker";

export const buildPositionList = (selecteds: string[], positionMap: PositionMap): Position[] => {
  if (!selecteds || !positionMap) return [];
  const positionList = selecteds.map((s) => positionMap[s]).filter(Boolean);
  return positionList.filter((p) => !matchAnyPosition(positionList, p.code, false)).sort((a, b) => a.sortOrder - b.sortOrder);
};

export const buildPositionMap = (positions: Position[], type?: string | number | null): PositionMap =>
  makeMap(
    positions.filter((p) => !type || p.playerType === Number.parseInt(String(type), 10)),
    (position) => position.code,
    (position) => position
  );

export const isChildPosition = (positions: PositionMap, selecteds: string[], key: string): boolean =>
  positions && selecteds && key
    ? matchAnyPosition(
        selecteds.map((s) => positions[s]),
        key,
        false
      )
    : false;

export const matchAnyPosition = (selecteds: Position[], key: string, includeParent?: boolean): boolean =>
  selecteds && key ? selecteds.some((s) => s && ((includeParent && s.code === key) || s.additionalPositions.some((ap) => ap.code === key))) : false;
