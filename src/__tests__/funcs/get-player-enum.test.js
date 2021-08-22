import { getLeagueStatusEnums, getPlayerStatusEnums, getPlayerTypeEnums } from '../../funcs/get-player-enum';

import axios from 'axios';

describe('Get Player Enum Fuction', () => {
  let getSpy;

  jest.mock('axios');

  afterEach(() => jest.clearAllMocks());
  beforeEach(() => getSpy = jest.spyOn(axios, 'get'));
  
  it('should get LeagueStatus', async () => {
    const expected = { "0": "Available", "1": "Rostered", "2": "Unavailable", "3": "Scouted" };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: expected }));
    getLeagueStatusEnums((response) => { expect(response).toEqual(expected); });
    await expect(getSpy).toHaveBeenCalledWith('http://baseball-player-api.schultz.local/api/player/enum-map?enumType=LeagueStatus');
  });

  it('should get PlayerStatus', async () => {
    const expected = { "0": "", "1": "Disabled List", "2": "Not Available", "3": "New Entry" };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: expected }));
    getPlayerStatusEnums((response) => { expect(response).toEqual(expected); });
    await expect(getSpy).toHaveBeenCalledWith('http://baseball-player-api.schultz.local/api/player/enum-map?enumType=PlayerStatus');
  });

  it('should get PlayerType', async () => {
    const expected = { "0": "Unknown", "1": "Batter", "2": "Pitcher" };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: expected }));
    getPlayerTypeEnums((response) => { expect(response).toEqual(expected); });
    await expect(getSpy).toHaveBeenCalledWith('http://baseball-player-api.schultz.local/api/player/enum-map?enumType=PlayerType');
  });

  it('should handle errors', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
    getLeagueStatusEnums((response) => { expect(response).toEqual([]); });
  });
});