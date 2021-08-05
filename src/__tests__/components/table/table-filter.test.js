import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import React from 'react';
import TableFilter from '../../../components/table/table-filter';
import { mount } from 'enzyme';

describe('Table Filter', () => {
  const theme = createMuiTheme({ palette: { background: { paper: '#b3b3b3'  } } });

  it('should render as a select field', () => {
    const column = { title: 'SelectTitle', lookup: { 0: 'Available', 1: 'Rostered', 2: 'Unavailable', 3: 'Scouted' } };
    const wrapper = mount(<ThemeProvider theme={theme}><TableFilter column={column}/></ThemeProvider>);
    expect(wrapper.find('label').text()).toEqual('SelectTitle');
    expect(wrapper.find('ForwardRef(SelectInput)')).toHaveLength(1);
  });

  it('should render as a text field with a numeric value', () => {
    const column = { filterValue: '1', title: 'TextTitle', type: 'numeric' };
    const wrapper = mount(<ThemeProvider theme={theme}><TableFilter column={column}/></ThemeProvider>);
    expect(wrapper.find('label').text()).toEqual('TextTitle');
    expect(wrapper.find('input').prop('defaultValue')).toEqual(1);
  });

  it('should render as a text field with a text value', () => {
    const column = { filterValue: 'TextValue', title: 'TextTitle' };
    const wrapper = mount(<ThemeProvider theme={theme}><TableFilter column={column}/></ThemeProvider>);
    expect(wrapper.find('label').text()).toEqual('TextTitle');
    expect(wrapper.find('input').prop('defaultValue')).toEqual('TextValue');
  });

  it('should handle a change event', () => {
    let existingField = 'OldField'
    let existingValue = 'Old';
    const onHandleFilterChange = (field, value) => {
      expect(field).toEqual(existingField);
      existingValue = value;
    };
    const column = { field: existingField, title: 'TextTitle' };
    const wrapper = mount(<ThemeProvider theme={theme}><TableFilter column={column} onHandleFilterChange={onHandleFilterChange}/></ThemeProvider>);
    expect(existingValue).toEqual('Old');
    wrapper.find('input').simulate('change', { target: { value: 'New' } });
    expect(existingValue).toEqual('New');
  });
});