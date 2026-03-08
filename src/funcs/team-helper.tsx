import { makeMap } from "./map-maker";

interface Team {
  code: string;
  city?: string;
  nickname?: string;
}

/**
 * Builds a display string from the team object.
 * @param team The data about the team.
 * @returns The value to display for the team.
 */
export const buildTeamDisplay = (team?: Team | null): string => {
  if (!team) return "";
  if (team.city && team.nickname) return `${team.city} ${team.nickname}`;
  if (team.city || team.nickname) return team.city || team.nickname || "";
  return "";
};

/**
 * Builds a map from the given teams that maps the team code to team object.
 * @param teams A list of team objects to turn into a map.
 * @returns A simple object where the keys are team codes and the values are the team object.
 */
export const buildTeamMap = (teams: Team[]): Record<string, Team> =>
  makeMap(
    teams,
    (team) => team.code,
    (team) => team
  );
