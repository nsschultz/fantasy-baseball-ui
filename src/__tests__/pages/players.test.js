import { Button, TableBody } from '@material-ui/core';

import GlobalTheme from '../../components/global-theme';
import PlayerView from '../../pages/player-view';
import Players from '../../pages/players';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import { mount } from 'enzyme';

describe('Players Page', () => {
  let getSpy, putSpy;

  const battingStats = [
    { statsType: 1, atBats: 0, runs: 0, hits: 0, doubles: 0, triples: 0, homeRuns: 0, runsBattedIn: 0, baseOnBalls: 0, strikeOuts: 0, stolenBases: 0, caughtStealing: 0, totalBases: 0, battingAverage: 0, onBasePercentage: 0, sluggingPercentage: 0, onBasePlusSlugging: 0, contractRate: 0, power: 0, walkRate: 0, speed: 0, basePerformanceValue: 0 },
    { statsType: 2, atBats: 0, runs: 0, hits: 0, doubles: 0, triples: 0, homeRuns: 0, runsBattedIn: 0, baseOnBalls: 0, strikeOuts: 0, stolenBases: 0, caughtStealing: 0, totalBases: 0, battingAverage: 0, onBasePercentage: 0, sluggingPercentage: 0, onBasePlusSlugging: 0, contractRate: 0, power: 0, walkRate: 0, speed: 0, basePerformanceValue: 0 },
    { statsType: 3, atBats: 0, runs: 0, hits: 0, doubles: 0, triples: 0, homeRuns: 0, runsBattedIn: 0, baseOnBalls: 0, strikeOuts: 0, stolenBases: 0, caughtStealing: 0, totalBases: 0, battingAverage: 0, onBasePercentage: 0, sluggingPercentage: 0, onBasePlusSlugging: 0, contractRate: 0, power: 0, walkRate: 0, speed: 0, basePerformanceValue: 0 }
  ];

  const pitchingStats = [
    { statsType: 1, wins: 0, losses: 0, qualityStarts: 0, saves: 0, blownSaves: 0, holds: 0, inningsPitched: 0, hitsAllowed: 0, earnedRuns: 0, homeRunsAllowed: 0, baseOnBallsAllowed: 0, strikeOuts: 0, flyBallRate: 0, groundBallRate: 0, earnedRunAverage: 0, walksAndHitsPerInningPitched: 0, battingAverageOnBallsInPlay: 0, strandRate: 0, command: 0, dominance: 0, control: 0, groundBallToFlyBallRate: 0, basePerformanceValue: 0 },
    { statsType: 2, wins: 0, losses: 0, qualityStarts: 0, saves: 0, blownSaves: 0, holds: 0, inningsPitched: 0, hitsAllowed: 0, earnedRuns: 0, homeRunsAllowed: 0, baseOnBallsAllowed: 0, strikeOuts: 0, flyBallRate: 0, groundBallRate: 0, earnedRunAverage: 0, walksAndHitsPerInningPitched: 0, battingAverageOnBallsInPlay: 0, strandRate: 0, command: 0, dominance: 0, control: 0, groundBallToFlyBallRate: 0, basePerformanceValue: 0 },
    { statsType: 3, wins: 0, losses: 0, qualityStarts: 0, saves: 0, blownSaves: 0, holds: 0, inningsPitched: 0, hitsAllowed: 0, earnedRuns: 0, homeRunsAllowed: 0, baseOnBallsAllowed: 0, strikeOuts: 0, flyBallRate: 0, groundBallRate: 0, earnedRunAverage: 0, walksAndHitsPerInningPitched: 0, battingAverageOnBallsInPlay: 0, strandRate: 0, command: 0, dominance: 0, control: 0, groundBallToFlyBallRate: 0, basePerformanceValue: 0 }
  ];

  const players = [
    { id: '01', bhqId: 101, type: 1, firstName: 'Fernando' , lastName: 'Tatis Jr.', age: 22, team: 'SD' , status: 0, positions: 'SS', draftRank: 1 , draftedPercentage: 0.99, league1: 0, league2: 0, battingStats: battingStats, pitchingStats: pitchingStats },
    { id: '02', bhqId: 102, type: 1, firstName: 'Ronald'   , lastName: 'Acuna Jr.', age: 23, team: 'ATL', status: 0, positions: 'OF', draftRank: 2 , draftedPercentage: 0.88, league1: 0, league2: 1, battingStats: battingStats, pitchingStats: pitchingStats },
    { id: '03', bhqId: 103, type: 1, firstName: 'Mookie'   , lastName: 'Betts'    , age: 28, team: 'LAD', status: 0, positions: 'OF', draftRank: 3 , draftedPercentage: 0.77, league1: 0, league2: 2, battingStats: battingStats, pitchingStats: pitchingStats },
    { id: '04', bhqId: 104, type: 1, firstName: 'Juan'     , lastName: 'Soto'     , age: 22, team: 'WAS', status: 3, positions: 'OF', draftRank: 4 , draftedPercentage: 0.66, league1: 0, league2: 3, battingStats: battingStats, pitchingStats: pitchingStats },
    { id: '05', bhqId: 105, type: 1, firstName: 'Trea'     , lastName: 'Turner'   , age: 28, team: 'LAD', status: 0, positions: 'SS', draftRank: 5 , draftedPercentage: 0.55, league1: 1, league2: 0, battingStats: battingStats, pitchingStats: pitchingStats },
    { id: '06', bhqId: 106, type: 2, firstName: 'Jacob'    , lastName: 'deGrom'   , age: 33, team: 'NYM', status: 1, positions: 'SP', draftRank: 6 , draftedPercentage: 0.44, league1: 1, league2: 1, battingStats: battingStats, pitchingStats: pitchingStats },
    { id: '07', bhqId: 107, type: 2, firstName: 'Gerrit'   , lastName: 'Cole'     , age: 30, team: 'NYY', status: 0, positions: 'SP', draftRank: 7 , draftedPercentage: 0.33, league1: 1, league2: 2, battingStats: battingStats, pitchingStats: pitchingStats },
    { id: '08', bhqId: 108, type: 1, firstName: 'Mike'     , lastName: 'Trout'    , age: 29, team: 'LAA', status: 2, positions: 'OF', draftRank: 8 , draftedPercentage: 0.22, league1: 1, league2: 3, battingStats: battingStats, pitchingStats: pitchingStats },
    { id: '09', bhqId: 109, type: 1, firstName: 'Christian', lastName: 'Yelich'   , age: 29, team: 'MIL', status: 0, positions: 'OF', draftRank: 9 , draftedPercentage: 0.11, league1: 2, league2: 0, battingStats: battingStats, pitchingStats: pitchingStats },
    { id: '10', bhqId: 110, type: 1, firstName: 'Trevor'   , lastName: 'Story'    , age: 28, team: 'COL', status: 0, positions: 'SS', draftRank: 10, draftedPercentage: 0.01, league1: 2, league2: 1, battingStats: battingStats, pitchingStats: pitchingStats },
    { id: '11', bhqId: 111, type: 1, firstName: 'Jose'     , lastName: 'Ramirez'  , age: 28, team: 'CLE', status: 0, positions: '3B', draftRank: 11, draftedPercentage: 0.00, league1: 2, league2: 2, battingStats: battingStats, pitchingStats: pitchingStats },
  ];

  jest.mock('axios');

  afterEach(() => jest.clearAllMocks());
  beforeEach(() => getSpy = jest.spyOn(axios, 'get'));
  beforeEach(() => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { '0': 'Available', '1': 'Rostered', '2': 'Unavailable', '3': 'Scouted' } }));
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { '0': '', '1': 'Disabled List', '2': 'Not Available', '3': 'New Entry' } }));
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { '0': 'Unknown', '1': 'Batter', '2': 'Pitcher' } }));
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { '0': 'Unknown', '1': 'Year to Date', '2': 'Projected', '3' :'Combined' } }));
  });
  beforeEach(() => putSpy = jest.spyOn(axios, 'put'));

  it('should render the loading screen', async () => {
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><Players/></ThemeProvider>);
    expect(wrapper.find('h4').text()).toEqual('Loading Players...');
  });

  it('should render the table with data', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: players }));
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><Players/></ThemeProvider>);
    await expect(getSpy).toHaveBeenCalledTimes(5);
    wrapper.update();
    expect(wrapper.find(TableBody).find('tr')).toHaveLength(20);
    wrapper.find('#expand-01').at(0).simulate('click');
    wrapper.update();
    expect(wrapper.find(TableBody).find('tr')).toHaveLength(24);
    wrapper.find('#expand-06').at(0).simulate('click');
    wrapper.update();
    expect(wrapper.find(TableBody).find('tr')).toHaveLength(28);
  });

  it('should render when there is data error', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error('errorMessage')));
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><Players/></ThemeProvider>);
    await expect(getSpy).toHaveBeenCalledTimes(5);
    wrapper.update();
    expect(wrapper.find('h4').text()).toEqual('Loading Players...');
  });

  it('should handle a successful update', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: players }));
    axios.put.mockImplementationOnce(() => Promise.resolve({}));
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><Players/></ThemeProvider>);
    await expect(getSpy).toHaveBeenCalledTimes(5);
    wrapper.update();
    wrapper.find('#edit-01').at(0).simulate('click');
    wrapper.update();
    wrapper.find(PlayerView).find(Button).at(0).simulate('click');
    wrapper.update();
    await expect(putSpy).toBeCalled();
    expect(wrapper.find(TableBody).find('tr')).toHaveLength(20);
  });

  it('should handle a failed update', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: players }));
    axios.put.mockImplementationOnce(() => Promise.reject(new Error('errorMessage')));
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><Players/></ThemeProvider>);
    await expect(getSpy).toHaveBeenCalledTimes(5);
    wrapper.update();
    wrapper.find('#edit-01').at(0).simulate('click');
    wrapper.update();
    wrapper.find(PlayerView).find(Button).at(0).simulate('click');
    wrapper.update();
    await expect(putSpy).toBeCalled();
    expect(wrapper.find(TableBody).find('tr')).toHaveLength(20);
  });
});