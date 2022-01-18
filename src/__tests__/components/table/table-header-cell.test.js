import { TableCell, TableSortLabel } from '@material-ui/core';

import GlobalTheme from '../../../components/global-theme';
import React from 'react';
import TableFilter from '../../../components/table/table-filter';
import TableHeaderCell from '../../../components/table/table-header-cell';
import { ThemeProvider } from '@material-ui/core/styles';
import { mount } from 'enzyme';

describe('Table Header Cell', () => {
  const field = 'Field';
  const title = 'FieldTitle';

  const createWrapper = (align, direction, sortField, open) =>
    mount(
      <ThemeProvider theme={GlobalTheme()}>
        <TableHeaderCell 
          buildSortHandler={() => () => 'asc'} 
          column={{ field: field, title: title, type: 'right' === align ? 'numeric' : 'string' }} 
          order={direction} 
          orderBy={sortField} 
          filterVisible={open}/>
      </ThemeProvider>);

  const validateTableCell = (align, direction, sortField) => {
    const wrapper = createWrapper(align, direction, sortField);
    const tableCell = wrapper.find(TableCell);
    expect(tableCell.prop('align')).toEqual(align);
    expect(tableCell.prop('sortDirection')).toEqual(direction);
    const sortlabel = wrapper.find(TableSortLabel);
    expect(sortlabel.text()).toEqual(title + (direction ? (direction === 'desc' ? 'sorted descending' : 'sorted ascending') : ''));
  };

  it('should render with sort ascending direction', () => { validateTableCell('right', 'asc', field); });

  it('should render with sort descending direction', () => { validateTableCell('right', 'desc', field); });

  it('should render without sort direction', () => { validateTableCell('left', false, 'OtherField'); });

  it('should render with the filter visible', () => {
    const wrapper = createWrapper('right', 'asc', field, true);
    expect(wrapper.find(TableFilter)).toHaveLength(1);
  });

  it('should render without the filter visible', () => {
    const wrapper = createWrapper('right', 'asc', field, false);
    expect(wrapper.find(TableFilter)).toHaveLength(0);
  });
});