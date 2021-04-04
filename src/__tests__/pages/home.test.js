import Home from '../../pages/home';
import React from 'react';
import { shallow } from 'enzyme';

describe('Home Page', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<Home/>))
  
  it('should render the header', () => expect(wrapper.find('h2').text()).toEqual('Welcome to the Fantasy Baseball Analyzer'));
});