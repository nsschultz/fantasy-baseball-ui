import { Position } from "./position-types";

export interface BattingStats {
  statsType: number;
  atBats: number;
  runs: number;
  hits: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  runsBattedIn: number;
  baseOnBalls: number;
  strikeOuts: number;
  stolenBases: number;
  caughtStealing: number;
  totalBases: number;
  battingAverage: number;
  onBasePercentage: number;
  sluggingPercentage: number;
  onBasePlusSlugging: number;
  contractRate: number;
  power: number;
  walkRate: number;
  speed: number;
  basePerformanceValue: number;
}

export interface PitchingStats {
  statsType: number;
  wins: number;
  losses: number;
  qualityStarts: number;
  saves: number;
  blownSaves: number;
  holds: number;
  inningsPitched: number;
  hitsAllowed: number;
  earnedRuns: number;
  homeRunsAllowed: number;
  baseOnBallsAllowed: number;
  strikeOuts: number;
  flyBallRate: number;
  groundBallRate: number;
  earnedRunAverage: number;
  walksAndHitsPerInningPitched: number;
  battingAverageOnBallsInPlay: number;
  strandRate: number;
  command: number;
  dominance: number;
  control: number;
  groundBallToFlyBallRate: number;
  basePerformanceValue: number;
}

export interface Player {
  id: string;
  mlbAmId: number;
  type: number;
  firstName: string;
  lastName: string;
  age: number;
  status: number;
  averageDraftPick: number;
  averageDraftPickMin: number;
  averageDraftPickMax: number;
  reliability: number;
  mayberryMethod: number;
  league1: number;
  league2: number;
  battingStats: BattingStats[];
  pitchingStats: PitchingStats[];
  team: Team;
  positions: Position[];
}

export interface Team {
  alternativeCode?: string;
  city?: string;
  code: string;
  leagueId?: string;
  nickname: string;
}
