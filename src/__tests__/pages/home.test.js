import Home from '../../pages/home';
import React from 'react';
import { mount } from 'enzyme';

describe('Home Page', () => {
  let wrapper;

  beforeEach(() => wrapper = mount(<Home/>));
  
  it('should render the header', () => expect(wrapper.find('h2').text()).toEqual('Welcome to the Fantasy Baseball Analyzer'));
});