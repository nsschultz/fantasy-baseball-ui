import App from '../App';
import React from 'react';
import { mount } from 'enzyme';

describe('App Function', () => {
  let wrapper;

  beforeEach(() => wrapper = mount(<App/>))
  
  it('should render without crashing', () => expect(wrapper.find('h6')).toHaveLength(1));
});