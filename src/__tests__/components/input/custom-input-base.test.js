import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import CustomInputBase from '../../../components/input/custom-input-base';
import React from 'react';
import { mount } from 'enzyme';

describe('Custom Input Base', () => {
  it('should render the input base', () => {
    const theme = createMuiTheme({ palette: { text: { secondary: '#b3b3b3' } } });
    const wrapper = mount(<ThemeProvider theme={theme}><CustomInputBase/></ThemeProvider>);
    const input = wrapper.find('input');
    input.instance().value = 'Text Change';
    expect(input.instance().value).toEqual('Text Change');
  });
});