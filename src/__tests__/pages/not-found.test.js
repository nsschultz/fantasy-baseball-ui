import NotFound from '../../pages/not-found';
import React from 'react';
import { mount } from 'enzyme';

describe('Not Found Page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<NotFound/>);
  })
  
  it('should render the message', () => expect(wrapper.find('h1').text()).toEqual('404: The page you are looking for is not here'));
});