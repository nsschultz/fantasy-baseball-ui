import NotFound from '../../pages/not-found';
import React from 'react';
import { mount } from 'enzyme';

describe('Not Found Page', () => {
  it('should render the message', () => expect(mount(<NotFound/>).find('h1').text()).toEqual('404: The page you are looking for is not here'));
});