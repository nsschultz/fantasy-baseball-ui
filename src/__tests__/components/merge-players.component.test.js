import MergePlayers from '../../components/merge-players.component';
import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';

describe('Merge Players Component', () => {
  let wrapper, button, spy;

  jest.mock('axios');

  afterEach(() => jest.clearAllMocks());
  beforeEach(()=> wrapper = mount(<MergePlayers/>));
  beforeEach(()=> button = wrapper.find('button'));
  beforeEach(()=> spy = jest.spyOn(axios, 'post'));
  
  it('should render the merge button', () => {
    expect(button.text()).toEqual('Merge Players');
    expect(button.props().disabled).toEqual(false);
  });

  it('should call post on click', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({}));
    button.simulate('click');
    await expect(spy).toBeCalled();
    await expect(button.props().disabled).toEqual(false);
    await expect(wrapper.state().severity).toEqual("success");
  });

  it('should handle errors on post', async () => {
    axios.post.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
    button.simulate('click');
    await expect(spy).toBeCalled();
    await expect(button.props().disabled).toEqual(false);
    await expect(wrapper.state().severity).toEqual("error");
  });
});