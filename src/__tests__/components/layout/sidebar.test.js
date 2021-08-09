import { Hidden } from '@material-ui/core';
import React from 'react';
import Sidebar from '../../../components/layout/sidebar';
import { mount } from 'enzyme';

const mockLocation = { pathname: '/othersite', search: '', hash: '', state: null };

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useLocation: () => mockLocation,
  };
});

describe('Sidebar Component', () => {
  it('should render with mobile', () => {
    const wrapper = mount(<Sidebar onMobileClose={() => {}} openMobile={true}/>);
    expect(wrapper.find(Hidden)).toHaveLength(2);
  });

  it('should render without mobile', () => {
    const wrapper = mount(<Sidebar onMobileClose={() => {}} openMobile={false}/>);
    expect(wrapper.find(Hidden)).toHaveLength(2);
  });
});