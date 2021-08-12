import { Button } from '@material-ui/core';
import NavigationItem from '../../../components/layout/navigation-item';
import PeopleIcon from '@material-ui/icons/People';
import React from 'react';
import { shallow } from 'enzyme';

const mockLocation = { pathname: '/othersite', search: '', hash: '', state: null };

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useLocation: () => mockLocation,
  };
});

describe('Navigation Item Component', () => {
  it('should render with a link', () => {
    const wrapper = shallow(<NavigationItem href='/othersite' title='Test Title' icon={PeopleIcon}/>);
    expect(wrapper.find('span').text()).toEqual('Test Title');
    expect(wrapper.find(PeopleIcon)).toBeTruthy();
    expect(wrapper.find(Button).prop('to')).toEqual('/othersite');
  });

  it('should render without a link', () => {
    const wrapper = shallow(<NavigationItem title='Test Title' icon={PeopleIcon}/>);
    expect(wrapper.find('span').text()).toEqual('Test Title');
    expect(wrapper.find(PeopleIcon)).toBeTruthy();
    expect(wrapper.find(Button).prop('to')).toEqual(undefined);
  });
});