import { Team } from "../types/player-types";
import { makeMap } from "./map-maker";

export const buildTeamDisplay = (team?: Team | null): string => {
  if (!team) return "";
  if (team.city && team.nickname) return `${team.city} ${team.nickname}`;
  if (team.city || team.nickname) return team.city || team.nickname || "";
  return "";
};

export const buildTeamMap = (teams: Team[]): Record<string, Team> =>
  makeMap(
    teams,
    (team) => team.code,
    (team) => team
  );
