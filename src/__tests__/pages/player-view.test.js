import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Button } from "@material-ui/core";
import PlayerView from '../../pages/player-view'
import React from 'react';
import { mount } from 'enzyme';

describe('Player View Page', () => {
  const existingPlayer = {
    age: 40,
    draftedPercentage: 0.36,
    draftRank: 10,
    firstName: 'Nick',
    lastName: 'Schultz',
    league1: 2,
    league2: 3,
    positions: '2B-SS',
    status: 0,
    team: 'MIL',
    type: 1
  };
  const findSelect = 'ForwardRef(Select)';
  const theme = createMuiTheme({ palette: { text: { secondary: '#b3b3b3'  } } });

  const mutatePlayer = (wrapper) => {
    wrapper.find('input').find('#firstName').at(0).simulate('change', { target: { value: 'Annie' } });
    wrapper.find('input').find('#lastName').at(0).simulate('change', { target: { value: 'Oppman' } });
    wrapper.find('input').find('#age').at(0).simulate('change', { target: { value: 35 } });
    wrapper.find(findSelect).find('#type').find('input').at(0).simulate('change', { target: { value: '2' } });
    wrapper.find('input').find('#positions').at(0).simulate('change', { target: { value: 'SP' } });
    wrapper.find('input').find('#team').at(0).simulate('change', { target: { value: 'SF' } });
    wrapper.find(findSelect).find('#status').find('input').at(0).simulate('change', { target: { value: '1' } });
    wrapper.find(findSelect).find('#league1').find('input').at(0).simulate('change', { target: { value: '1' } });
    wrapper.find(findSelect).find('#league2').find('input').at(0).simulate('change', { target: { value: '2' } });
    wrapper.find('input').find('#draftRank').at(0).simulate('change', { target: { value: 20 } });
    wrapper.find('input').find('#draftedPercentage').at(0).simulate('change', { target: { value: 0.07 } });
  };

  const verifyPlayer = (player, age, draftedPercentage, draftRank, firstName, lastName, league1, league2, positions, status, team, type) => {
    expect(player.age).toEqual(age);
    expect(player.draftedPercentage).toEqual(draftedPercentage);
    expect(player.draftRank).toEqual(draftRank);
    expect(player.firstName).toEqual(firstName);
    expect(player.lastName).toEqual(lastName);
    expect(player.league1).toEqual(league1);
    expect(player.league2).toEqual(league2);
    expect(player.positions).toEqual(positions);
    expect(player.status).toEqual(status);
    expect(player.team).toEqual(team);
    expect(player.type).toEqual(type);
  };

  it('should handle a cancel', () => {
    let count = 0;
    const onClose = (value) => { 
      count++;
      expect(value).toEqual(undefined);
      verifyPlayer(existingPlayer, 40, 0.36, 10, 'Nick', 'Schultz', 2, 3, '2B-SS', 0, 'MIL', 1);
    };
    const wrapper = mount(<ThemeProvider theme={theme}><PlayerView player={existingPlayer} open={true} onClose={onClose}/></ThemeProvider>);
    mutatePlayer(wrapper);
    wrapper.find(Button).at(1).simulate('click');
    wrapper.update();
    expect(count).toEqual(1);
  });

  it('should handle a save', () => {
    let count = 0;
    const onClose = (newPlayer) => { 
      count++;
      verifyPlayer(existingPlayer, 40, 0.36, 10, 'Nick' , 'Schultz', 2, 3, '2B-SS', 0, 'MIL', 1);
      verifyPlayer(newPlayer     , 35, 0.07, 20, 'Annie', 'Oppman' , 1, 2, 'SP'   , 1, 'SF' , 2);
    };
    const wrapper = mount(<ThemeProvider theme={theme}><PlayerView player={existingPlayer} open={true} onClose={onClose}/></ThemeProvider>);
    mutatePlayer(wrapper);
    wrapper.find(Button).at(0).simulate('click');
    wrapper.update();
    expect(count).toEqual(1);
  });

  it('should handle a save with no player set', () => {
    let count = 0;
    const onClose = (newPlayer) => { 
      count++;
      verifyPlayer(newPlayer, 35, 0.07, 20, 'Annie', 'Oppman', 1, 2, 'SP', 1, 'SF', 2);
    };
    const wrapper = mount(<ThemeProvider theme={theme}><PlayerView open={true} onClose={onClose}/></ThemeProvider>);
    mutatePlayer(wrapper);
    wrapper.find(Button).at(0).simulate('click');
    wrapper.update();
    expect(count).toEqual(1);
  });
});