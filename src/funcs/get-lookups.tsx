import axios from "axios";

type HandleResponse<T> = (data: T) => void;

const getLookupValues = <T,>(url: string, handleResponse?: HandleResponse<T>): Promise<void> | undefined => {
  if (!handleResponse) return;
  // Call axios and handle response; return the promise for easier testing.
  const p = axios
    .get<T>(url)
    .then((response) => handleResponse(response.data))
    .catch(() => handleResponse([] as T));
  return p;
};

const getPlayersEnumMap = (enumType: string, handleResponse?: HandleResponse<Record<string, string>>) =>
  getLookupValues(`${globalThis.window.env.PLAYER_API_URL}/api/v3/enum-map?enumType=${enumType}`, handleResponse);

/**
 * Function for looking up the LeagueStatus enums from the API.
 * @param handleResponse The handler for the results returned from the API calls.
 */
export const getLeagueStatusEnums = (handleResponse?: HandleResponse<Record<string, string>>) => getPlayersEnumMap("LeagueStatus", handleResponse);

/**
 * Function for looking up the PlayerStatus enums from the API.
 * @param handleResponse The handler for the results returned from the API calls.
 */
export const getPlayerStatusEnums = (handleResponse?: HandleResponse<Record<string, string>>) => getPlayersEnumMap("PlayerStatus", handleResponse);

/**
 * Function for looking up the PlayerType enums from the API.
 * @param handleResponse The handler for the results returned from the API calls.
 */
export const getPlayerTypeEnums = (handleResponse?: HandleResponse<Record<string, string>>) => getPlayersEnumMap("PlayerType", handleResponse);

/**
 * Function for looking up the Position objects from the API.
 * @param handleResponse The handler for the results returned from the API calls.
 */
export const getPositions = <T,>(handleResponse?: HandleResponse<T>) =>
  getLookupValues(`${globalThis.window.env.POSITION_API_URL}/api/v1/position`, handleResponse);

/**
 * Function for looking up the StatsType enums from the API.
 * @param handleResponse The handler for the results returned from the API calls.
 */
export const getStatsTypeEnums = (handleResponse?: HandleResponse<Record<string, string>>) => getPlayersEnumMap("StatsType", handleResponse);

/**
 * Function for looking up the Team objects from the API.
 * @param handleResponse The handler for the results returned from the API calls.
 */
export const getTeams = <T,>(handleResponse?: HandleResponse<T>) => getLookupValues(`${globalThis.window.env.PLAYER_API_URL}/api/v3/team`, handleResponse);
