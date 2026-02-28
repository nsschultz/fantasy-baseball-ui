import { makeMap } from "./map-maker";

/**
 * Builds a display string from the team object.
 * @param {object} team The data about the team.
 * @returns The value to display for the team.
 */
export const buildTeamDisplay = (team) =>
  team ? (team.city && team.nickname ? `${team.city} ${team.nickname}` : team.city || team.nickname ? team.city || team.nickname : "") : "";

/**
 * Builds a map from the given teams that maps the team code to team object.
 * @param {array} teams A list of team objects to turn into a map.
 * @returns A simple object where the keys are team codes and the values are the team object.
 */
export const buildTeamMap = (teams) =>
  makeMap(
    teams,
    (team) => team.code,
    (team) => team
  );
