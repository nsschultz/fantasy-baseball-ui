import axios from "axios";

const getLookupValues = (url, handleResponse) => {
  if (!handleResponse) return;
  axios
    .get(url)
    .then((response) => handleResponse(response.data))
    .catch(() => handleResponse([]));
};
const getPlayersEnumMap = (enumType, handleResponse) => getLookupValues(`${window.env.PLAYER_API_URL}/api/v2/enum-map?enumType=${enumType}`, handleResponse);

/**
 * Function for looking up the LeagueStatus enums from the API.
 * @param {func} handleResponse The handler for the results returned from the API calls.
 */
export const getLeagueStatusEnums = (handleResponse) => getPlayersEnumMap("LeagueStatus", handleResponse);

/**
 * Function for looking up the PlayerStatus enums from the API.
 * @param {func} handleResponse The handler for the results returned from the API calls.
 */
export const getPlayerStatusEnums = (handleResponse) => getPlayersEnumMap("PlayerStatus", handleResponse);

/**
 * Function for looking up the PlayerType enums from the API.
 * @param {func} handleResponse The handler for the results returned from the API calls.
 */
export const getPlayerTypeEnums = (handleResponse) => getPlayersEnumMap("PlayerType", handleResponse);

/**
 * Function for looking up the Position objects from the API.
 * @param {func} handleResponse The handler for the results returned from the API calls.
 */
export const getPositions = (handleResponse) => getLookupValues(`${window.env.POSITION_API_URL}/api/v1/position`, handleResponse);

/**
 * Function for looking up the StatsType enums from the API.
 * @param {func} handleResponse The handler for the results returned from the API calls.
 */
export const getStatsTypeEnums = (handleResponse) => getPlayersEnumMap("StatsType", handleResponse);

/**
 * Function for looking up the Team objects from the API.
 * @param {func} handleResponse The handler for the results returned from the API calls.
 */
export const getTeams = (handleResponse) => getLookupValues(`${window.env.PLAYER_API_URL}/api/v2/team`, handleResponse);
