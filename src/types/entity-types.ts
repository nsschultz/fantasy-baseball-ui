import { BaseEntity } from "./basic-types";

export type PositionMap = Record<string, Position>;

export interface BattingStats {
  atBats: number;
  baseOnBalls: number;
  basePerformanceValue: number;
  battingAverage: number;
  caughtStealing: number;
  contractRate: number;
  doubles: number;
  hits: number;
  homeRuns: number;
  onBasePercentage: number;
  onBasePlusSlugging: number;
  power: number;
  runs: number;
  runsBattedIn: number;
  sluggingPercentage: number;
  speed: number;
  statsType: number;
  stolenBases: number;
  strikeOuts: number;
  totalBases: number;
  triples: number;
  walkRate: number;
}

export interface PitchingStats {
  baseOnBallsAllowed: number;
  basePerformanceValue: number;
  battingAverageOnBallsInPlay: number;
  blownSaves: number;
  command: number;
  control: number;
  dominance: number;
  earnedRunAverage: number;
  earnedRuns: number;
  flyBallRate: number;
  groundBallRate: number;
  groundBallToFlyBallRate: number;
  hitsAllowed: number;
  holds: number;
  homeRunsAllowed: number;
  inningsPitched: number;
  losses: number;
  qualityStarts: number;
  saves: number;
  statsType: number;
  strandRate: number;
  strikeOuts: number;
  walksAndHitsPerInningPitched: number;
  wins: number;
}

export interface Player extends BaseEntity {
  age: number;
  averageDraftPick: number;
  averageDraftPickMax: number;
  averageDraftPickMin: number;
  battingStats: BattingStats[];
  firstName: string;
  lastName: string;
  league1: number;
  league2: number;
  mayberryMethod: number;
  mlbAmId: number;
  name?: string;
  pitchingStats: PitchingStats[];
  positions: Position[];
  reliability: number;
  status: number;
  team: Team;
  type: number;
}

export interface Position {
  additionalPositions: Position[];
  code: string;
  fullName: string;
  playerType: number;
  sortOrder: number;
}

export interface Team {
  alternativeCode?: string;
  city?: string;
  code: string;
  leagueId?: string;
  nickname: string;
}
