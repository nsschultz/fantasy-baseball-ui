import { EditablePlayer, Player, Position, Team } from "./entity-types";

export type PlayerFilterKey = keyof PlayerFilterType;

export interface PlayerDeleterProps {
  onClose: (player?: Player) => void;
  open: boolean;
  player?: Player;
}

export interface PlayerEditorProps {
  lookups: PlayerLookups;
  onClose: (player?: EditablePlayer) => void;
  open: boolean;
  player?: Player;
}

export interface PlayerFilterModification<K extends PlayerFilterKey = PlayerFilterKey> {
  key: K;
  value: PlayerFilterType[K];
}

export interface PlayerFilterProps {
  lookups: PlayerLookups;
  onClose: () => void;
  open: boolean;
}

export interface PlayerFilterStateType {
  value: PlayerFilterType;
}

export interface PlayerFilterType {
  name: string;
  l1statuses: string[];
  l2statuses: string[];
  positions: Position[];
  statuses: string[];
  teams: Team[];
  types: string[];
}

export interface PlayerLookups {
  leagusStatuses: Record<string, string>;
  playerStatuses: Record<string, string>;
  playerTypes: Record<string, string>;
  positions: Position[];
  teams: Team[];
}
