import Home from '../../pages/home';
import React from 'react';
import { mount } from 'enzyme';

describe('Home Page', () => {
  it('should render the header', () => expect(mount(<Home/>).find('h2').text()).toEqual('Welcome to the Fantasy Baseball Analyzer'));
});