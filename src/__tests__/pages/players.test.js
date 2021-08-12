import { Button, TableBody } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import PlayerView from '../../pages/player-view';
import Players from '../../pages/players';
import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';

describe('Players Page', () => {
  let getSpy, putSpy;

  const players = [
    { id: '01', bhqId: 101, type: 1, firstName: 'Fernando' , lastName: 'Tatis Jr.', age: 22, team: 'SD' , status: 0, positions: 'SS', draftRank: 1 , draftedPercentage: 0.99, league1: 0, league2: 0 },
    { id: '02', bhqId: 102, type: 1, firstName: 'Ronald'   , lastName: 'Acuna Jr.', age: 23, team: 'ATL', status: 0, positions: 'OF', draftRank: 2 , draftedPercentage: 0.88, league1: 0, league2: 1 },
    { id: '03', bhqId: 103, type: 1, firstName: 'Mookie'   , lastName: 'Betts'    , age: 28, team: 'LAD', status: 0, positions: 'OF', draftRank: 3 , draftedPercentage: 0.77, league1: 0, league2: 2 },
    { id: '04', bhqId: 104, type: 1, firstName: 'Juan'     , lastName: 'Soto'     , age: 22, team: 'WAS', status: 3, positions: 'OF', draftRank: 4 , draftedPercentage: 0.66, league1: 0, league2: 3 },
    { id: '05', bhqId: 105, type: 1, firstName: 'Trea'     , lastName: 'Turner'   , age: 28, team: 'LAD', status: 0, positions: 'SS', draftRank: 5 , draftedPercentage: 0.55, league1: 1, league2: 0 },
    { id: '06', bhqId: 106, type: 2, firstName: 'Jacob'    , lastName: 'deGrom'   , age: 33, team: 'NYM', status: 1, positions: 'SP', draftRank: 6 , draftedPercentage: 0.44, league1: 1, league2: 1 },
    { id: '07', bhqId: 107, type: 2, firstName: 'Gerrit'   , lastName: 'Cole'     , age: 30, team: 'NYY', status: 0, positions: 'SP', draftRank: 7 , draftedPercentage: 0.33, league1: 1, league2: 2 },
    { id: '08', bhqId: 108, type: 1, firstName: 'Mike'     , lastName: 'Trout'    , age: 29, team: 'LAA', status: 2, positions: 'OF', draftRank: 8 , draftedPercentage: 0.22, league1: 1, league2: 3 },
    { id: '09', bhqId: 109, type: 1, firstName: 'Christian', lastName: 'Yelich'   , age: 29, team: 'MIL', status: 0, positions: 'OF', draftRank: 9 , draftedPercentage: 0.11, league1: 2, league2: 0 },
    { id: '10', bhqId: 110, type: 1, firstName: 'Trevor'   , lastName: 'Story'    , age: 28, team: 'COL', status: 0, positions: 'SS', draftRank: 10, draftedPercentage: 0.01, league1: 2, league2: 1 },
    { id: '11', bhqId: 111, type: 1, firstName: 'Jose'     , lastName: 'Ramirez'  , age: 28, team: 'CLE', status: 0, positions: '3B', draftRank: 11, draftedPercentage: 0.00, league1: 2, league2: 2 },
  ];

  const theme = createMuiTheme({ palette: { background: { paper: '#b3b3b3' } } });

  jest.mock('axios');

  afterEach(() => jest.clearAllMocks());
  beforeEach(() => getSpy = jest.spyOn(axios, 'get'));
  beforeEach(() => putSpy = jest.spyOn(axios, 'put'));

  it('should render the loading screen', async () => {
    const wrapper = mount(<Players/>);
    expect(wrapper.find('h4').text()).toEqual('Loading Players...');
  });

  it('should render the table with data', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { players: players } }));
    const wrapper = mount(<Players/>);
    await expect(getSpy).toBeCalled();
    wrapper.update();
    expect(wrapper.find(TableBody).find('tr').length).toHaveLength(10);
  });

  it('should render when there is data error', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
    const wrapper = mount(<Players/>);
    await expect(getSpy).toBeCalled();
    wrapper.update();
    expect(wrapper.find('h4').text()).toEqual('Loading Players...');
  });

  it('should handle a successful update', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { players: players } }));
    axios.put.mockImplementationOnce(() => Promise.resolve({}));
    const wrapper = mount(<ThemeProvider theme={theme}><Players/></ThemeProvider>);
    await expect(getSpy).toBeCalled();
    wrapper.update();
    wrapper.find('#edit-01').at(0).simulate('click');
    wrapper.update();
    wrapper.find(PlayerView).find(Button).at(0).simulate('click');
    wrapper.update();
    await expect(putSpy).toBeCalled();
    expect(wrapper.find(TableBody).find('tr').length).toHaveLength(10);
  });

  it('should handle a failed update', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { players: players } }));
    axios.put.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
    const wrapper = mount(<ThemeProvider theme={theme}><Players/></ThemeProvider>);
    await expect(getSpy).toBeCalled();
    wrapper.update();
    wrapper.find('#edit-01').at(0).simulate('click');
    wrapper.update();
    wrapper.find(PlayerView).find(Button).at(0).simulate('click');
    wrapper.update();
    await expect(putSpy).toBeCalled();
    expect(wrapper.find(TableBody).find('tr').length).toHaveLength(10);
  });
});