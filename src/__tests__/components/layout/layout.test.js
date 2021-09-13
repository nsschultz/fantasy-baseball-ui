import GlobalTheme from '../../../components/global-theme';
import Layout from '../../../components/layout/layout';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import Sidebar from '../../../components/layout/sidebar';
import { ThemeProvider } from '@material-ui/core/styles';
import Titlebar from '../../../components/layout/titlebar';
import { mount } from 'enzyme';

describe('Layout Component', () => {
  it('should render when logged in', () => {
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><MemoryRouter initialEntries={['/home']}><Layout isLoggedIn={true}/></MemoryRouter></ThemeProvider>);
    expect(wrapper.find(Titlebar)).toHaveLength(1);
    expect(wrapper.find(Sidebar)).toHaveLength(1);
    wrapper.find(Titlebar).props().onOpenMobileNavigation();
    wrapper.update();
    expect(wrapper.find(Sidebar).prop('openMobile')).toEqual(true);
    wrapper.find(Sidebar).props().onMobileClose();
    wrapper.update();
    expect(wrapper.find(Sidebar).prop('openMobile')).toEqual(false);
  });

  it('should render when not logged in', () => {
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><MemoryRouter initialEntries={['/home']}><Layout isLoggedIn={false}/></MemoryRouter></ThemeProvider>);
    expect(wrapper.find(Titlebar)).toHaveLength(1);
    expect(wrapper.find(Sidebar)).toHaveLength(0);
  });
});