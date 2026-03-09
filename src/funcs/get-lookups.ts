import { Position } from "../types/position-types";
import { Team } from "../types/player-types";
import axios from "axios";

const getLookupValues = <T>(url: string, handleResponse?: (data: T) => void): Promise<void> | undefined => {
  if (!handleResponse) return;
  const p = axios
    .get<T>(url)
    .then((response) => handleResponse(response.data))
    .catch(() => handleResponse([] as T));
  return p;
};

const getPlayersEnumMap = (enumType: string, handleResponse?: (data: Record<string, string>) => void) =>
  getLookupValues(`${globalThis.env.PLAYER_API_URL}/api/v3/enum-map?enumType=${enumType}`, handleResponse);

export const getLeagueStatusEnums = (handleResponse?: (data: Record<string, string>) => void) => getPlayersEnumMap("LeagueStatus", handleResponse);

export const getPlayerStatusEnums = (handleResponse?: (data: Record<string, string>) => void) => getPlayersEnumMap("PlayerStatus", handleResponse);

export const getPlayerTypeEnums = (handleResponse?: (data: Record<string, string>) => void) => getPlayersEnumMap("PlayerType", handleResponse);

export const getPositions = (handleResponse?: (data: Position[]) => void) =>
  getLookupValues(`${globalThis.env.POSITION_API_URL}/api/v1/position`, handleResponse);

export const getStatsTypeEnums = (handleResponse?: (data: Record<string, string>) => void) => getPlayersEnumMap("StatsType", handleResponse);

export const getTeams = (handleResponse?: (data: Team[]) => void) => getLookupValues(`${globalThis.env.PLAYER_API_URL}/api/v3/team`, handleResponse);
