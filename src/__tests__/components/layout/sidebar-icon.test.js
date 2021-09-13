import { HomeIcon, IntegrationIcon, PlayerIcon } from '../../../components/layout/sidebar-icon';

import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { shallow } from 'enzyme';

describe('Sidebar Icon Component', () => {
  it('should render the HomeIcon', () => expect(shallow(<HomeIcon/>).find(SvgIcon)).toHaveLength(1));

  it('should render the IntegrationIcon', () => expect(shallow(<IntegrationIcon/>).find(SvgIcon)).toHaveLength(1));

  it('should render the PlayerIcon', () => expect(shallow(<PlayerIcon/>).find(SvgIcon)).toHaveLength(1));
});