import Home from '../../components/home.component';
import React from 'react';
import { mount } from 'enzyme';

describe('Home Component', () => {
  let wrapper;

  beforeEach(()=> wrapper = mount(<Home/>))
  
  it('should render the merge button', () =>  expect(wrapper.find('h2').text()).toEqual('Welcome to the Fantasy Baseball Analyzer'));
});