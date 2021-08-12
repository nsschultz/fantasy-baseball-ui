import Logo from '../../../components/layout/logo';
import React from 'react';
import { shallow } from 'enzyme';

describe('Logo Component', () => {
  it('should render the logo', () => expect(shallow(<Logo/>).find('img').prop('src')).toEqual('/static/logo-056.png'));
});