import Home from '../../components/home';
import React from 'react';
import { shallow } from 'enzyme';

describe('Home Component', () => {
  let wrapper;

  beforeEach(()=> wrapper = shallow(<Home/>))
  
  it('should render the merge button', () =>  expect(wrapper.find('h2').text()).toEqual('Welcome to the Fantasy Baseball Analyzer'));
});