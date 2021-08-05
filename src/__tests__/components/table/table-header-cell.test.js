import { Backdrop, IconButton, Popover, TableCell, TableSortLabel } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import React from 'react';
import TableHeaderCell from '../../../components/table/table-header-cell';
import { mount } from 'enzyme';

describe('Table Header Cell', () => {
  const field = 'Field';
  
  const theme = createMuiTheme({ palette: { background: { paper: '#b3b3b3'  } } });

  const createWrapper = (align, direction, sortField, title) => {
    const column = { align: align, field: field, title: title };
    return mount(<ThemeProvider theme={theme}>
        <TableHeaderCell buildSortHandler={() => () => 'asc'} column={column} getAlign={(column) => column.align} order={direction} orderBy={sortField}/>
      </ThemeProvider>);
  };

  const validateTableCell = (align, direction, sortField) => {
    const title = 'FieldTitle';
    const wrapper = createWrapper(align, direction, sortField, title);
    const tableCell = wrapper.find(TableCell);
    expect(tableCell.prop('align')).toEqual(align);
    expect(tableCell.prop('sortDirection')).toEqual(direction);
    const sortlabel = wrapper.find(TableSortLabel);
    expect(sortlabel.text()).toEqual(title + (direction ? (direction === 'desc' ? 'sorted descending' : 'sorted ascending') : ''));
  };

  it('should render with sort ascending direction', () => { validateTableCell('right', 'asc', field); });

  it('should render with sort descending direction', () => { validateTableCell('right', 'desc', field); });

  it('should render without sort direction', () => { validateTableCell('left', false, 'OtherField'); });

  it('should render a popup with the filter', () => {
    const wrapper = createWrapper('right', 'asc', field, 'FieldTitle');
    expect(wrapper.find(Popover).prop('open')).toEqual(false);
    wrapper.find(IconButton).at(0).simulate('click');
    expect(wrapper.find(Popover).prop('open')).toEqual(true);
    wrapper.find(Backdrop).simulate('click');
    expect(wrapper.find(Popover).prop('open')).toEqual(false);
  });
});