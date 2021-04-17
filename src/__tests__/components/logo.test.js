import Logo from '../../components/logo';
import React from 'react';
import { shallow } from 'enzyme';

describe('Logo Component', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<Logo/>));
  
  it('should render the logo', () => expect(wrapper.find('img').prop('src')).toEqual('/static/logo-056.png'));
});