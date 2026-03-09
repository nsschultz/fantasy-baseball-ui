export type PlayerFilterKey = keyof PlayerFilterType;

export interface PlayerFilterModification<K extends PlayerFilterKey = PlayerFilterKey> {
  key: K;
  value: PlayerFilterType[K];
}

export interface PlayerFilterStateType {
  value: PlayerFilterType;
}

export interface PlayerFilterType {
  name: string;
  l1statuses: Array<number>;
  l2statuses: Array<number>;
  positions: Array<string>;
  statuses: Array<number>;
  teams: Array<string>;
  types: Array<number>;
}
