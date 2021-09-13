import CustomTextField from '../../../components/input/custom-text-field';
import GlobalTheme from '../../../components/global-theme';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { mount } from 'enzyme';

describe('Custom Text Field', () => {
  it('should render the text field', () => {
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><CustomTextField/></ThemeProvider>);
    const input = wrapper.find('input');
    input.instance().value = 'Text Change';
    expect(input.instance().value).toEqual('Text Change');
  });
});