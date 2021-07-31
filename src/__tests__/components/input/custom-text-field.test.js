import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import CustomTextField from '../../../components/input/custom-text-field';
import React from 'react';
import { mount } from 'enzyme';

const theme = createMuiTheme({ palette: { text: { secondary: '#b3b3b3'  } } });

describe('Custom Text Field', () => {
  it('should render the text field', () => {
    const wrapper = mount(<ThemeProvider theme={theme}><CustomTextField/></ThemeProvider>);
    const input = wrapper.find('input');
    input.instance().value = 'Text Change';
    expect(input.instance().value).toEqual('Text Change');
  });
});