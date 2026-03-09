export type PositionMap = Record<string, Position>;

export interface Position {
  code: string;
  fullName: string;
  playerType: number;
  sortOrder: number;
  additionalPositions: Position[];
}
