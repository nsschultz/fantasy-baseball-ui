import axios from "axios";

const getPlayersEnumMap = (enumType, handleResponse) => {
  axios
    .get(`${window.env.PLAYER_API_URL}/api/v1/player/enum-map?enumType=${enumType}`)
    .then((response) => {
      handleResponse(response.data);
    })
    .catch(() => {
      handleResponse([]);
    });
};

export const getLeagueStatusEnums = (handleResponse) => {
  getPlayersEnumMap("LeagueStatus", handleResponse);
};
export const getPlayerStatusEnums = (handleResponse) => {
  getPlayersEnumMap("PlayerStatus", handleResponse);
};
export const getPlayerTypeEnums = (handleResponse) => {
  getPlayersEnumMap("PlayerType", handleResponse);
};
export const getStatsTypeEnums = (handleResponse) => {
  getPlayersEnumMap("StatsType", handleResponse);
};
