import Players from '../../components/players.component';
import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';

describe('Players Component', () => {
  let spy;

  jest.mock('axios');

  afterEach(() => jest.clearAllMocks());
  beforeEach(()=> spy = jest.spyOn(axios, 'get'));
  
  it('should call get on load', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({data: {players: []}}));
    const wrapper = mount(<Players/>);
    await wrapper.instance().componentDidMount();
    await expect(spy).toBeCalled();
    expect(wrapper.find('h6')).toHaveLength(1);
    await expect(wrapper.state().isLoading).toEqual(false);
    await expect(wrapper.state().errorMessage).toEqual(null);
  });

  it('should handle errors on load', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
    const wrapper = mount(<Players/>);
    await wrapper.instance().componentDidMount();
    await expect(spy).toBeCalled();
    expect(wrapper.find('h6')).toHaveLength(1);
    await expect(wrapper.state().isLoading).toEqual(false);
    await expect(wrapper.state().errorMessage).toEqual("Unable to load players");
  });
});