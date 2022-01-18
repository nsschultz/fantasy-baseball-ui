import { IconButton, TableBody, TablePagination } from '@material-ui/core';

import GlobalTheme from '../../../components/global-theme';
import ParentTable from '../../../components/table/parent-table';
import React from 'react';
import TableHeaderCell from '../../../components/table/table-header-cell';
import { ThemeProvider } from '@material-ui/core/styles';
import { mount } from 'enzyme';

describe('Parent Table', () => {
  let columns; 
  
  const rows = [
    { id: 10, name: 'Schultz, Nick',     age: 40, type: 1, draftedPercentage: 0   },
    { id: 11, name: 'Schultz, Annie',    age: 36, type: 0, draftedPercentage: .5  },
    { id: 12, name: 'Schultz, James',    age: 10, type: 2, draftedPercentage: 1   },
    { id: 13, name: 'Schultz, Samantha', age: 7,  type: 0, draftedPercentage: .99 },
    { id: 14, name: 'Braun, Ryan',       age: 37, type: 1, draftedPercentage: .08 },
    { id: 15, name: 'Yount, Robin',      age: 65, type: 1, draftedPercentage: .19 },
    { id: 16, name: 'Molitor, Paul',     age: 64, type: 1, draftedPercentage: .04 },
    { id: 17, name: 'Fingers, Rollie',   age: 74, type: 2, draftedPercentage: .34 },
    { id: 18, name: 'Aaron, Hank',       age: 86, type: 1, draftedPercentage: .44 },
    { id: 19, name: 'Sheets, Ben',       age: 43, type: 2, draftedPercentage: .15 },
    { id: 20, name: 'Wickman, Bob',      age: 52, type: 2, draftedPercentage: .27 }
  ];
  
  const getRows = (wrapper) => wrapper.find(TableBody).find('tr');

  beforeEach(() => columns = [
    { title: 'Name', field: 'name' },
    { title: 'Age', field: 'age', type: 'numeric' },
    { title: 'Type', field: 'type', lookup: { 0: '', 1: 'Batter', 2: 'Pitcher' } },
    { title: 'Drafted %', field: 'draftedPercentage', type: 'numeric', format: (value) => value.toFixed(2) }
  ]);

  it('should render', () => { 
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><ParentTable columns={columns} values={rows}/></ThemeProvider>);
    expect(wrapper.find(TableHeaderCell)).toHaveLength(columns.length);
    expect(getRows(wrapper)).toHaveLength(10);
  });

  it('should sort in ascending order', () => { 
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><ParentTable columns={columns} values={rows}/></ThemeProvider>);
    wrapper.find('span').at(2).simulate('click');
    expect(getRows(wrapper).at(0).find('td').at(1).text()).toEqual('Aaron, Hank');
    expect(getRows(wrapper).at(9).find('td').at(1).text()).toEqual('Wickman, Bob');
  });

  it('should sort in descending order', () => { 
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><ParentTable columns={columns} values={rows}/></ThemeProvider>);
    wrapper.find('span').at(2).simulate('click');
    wrapper.find('span').at(2).simulate('click');
    expect(getRows(wrapper).at(0).find('td').at(1).text()).toEqual('Yount, Robin');
    expect(getRows(wrapper).at(9).find('td').at(1).text()).toEqual('Braun, Ryan');
  });

  it('should only display the filters on click', () => { 
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><ParentTable columns={columns} values={rows}/></ThemeProvider>);
    expect(wrapper.find('table').find('input').exists()).toBeFalsy();
    wrapper.find(IconButton).at(0).simulate('click');
    wrapper.update();
    expect(wrapper.find('table').find('input')).toHaveLength(4);
  });

  it('should handle filtering of text field', () => { 
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><ParentTable columns={columns} values={rows}/></ThemeProvider>);
    expect(getRows(wrapper)).toHaveLength(10);
    wrapper.find(IconButton).at(0).simulate('click');
    wrapper.update();
    wrapper.find('input').at(0).simulate('change', { target: { value: 'Samantha' } });
    expect(getRows(wrapper)).toHaveLength(1);
  });

  it('should handle filtering of numeric field', () => { 
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><ParentTable columns={columns} values={rows}/></ThemeProvider>);
    expect(getRows(wrapper)).toHaveLength(10);
    wrapper.find(IconButton).at(0).simulate('click');
    wrapper.update();
    wrapper.find('input').at(1).simulate('change', { target: { value: '10' } });
    expect(getRows(wrapper)).toHaveLength(1);
  });

  it('should handle filtering of select field', () => { 
    columns[2].filterValue = ['0'];
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><ParentTable columns={columns} values={rows}/></ThemeProvider>);
    expect(getRows(wrapper)).toHaveLength(2);
  });
  
  it('should handle moving to the next page and back', () => { 
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><ParentTable columns={columns} values={rows}/></ThemeProvider>);
    expect(getRows(wrapper)).toHaveLength(10);
    wrapper.find('ForwardRef(KeyboardArrowRightIcon)').simulate('click');
    expect(getRows(wrapper)).toHaveLength(1);
    wrapper.find('ForwardRef(KeyboardArrowLeftIcon)').simulate('click');
    expect(getRows(wrapper)).toHaveLength(10);
  });

  it('should handle changing the page size', () => { 
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><ParentTable columns={columns} values={rows}/></ThemeProvider>);
    expect(wrapper.find(TablePagination).props().rowsPerPage).toEqual(10);
    wrapper.find(TablePagination).props().onRowsPerPageChange({ target: { value: 25 } });
    wrapper.update();
    expect(wrapper.find(TablePagination).props().rowsPerPage).toEqual(25);
  });

  it('should handle editing and cancelling the changes', () => { 
    let editCount = 0, closeCount = 0;
    const handleClose = () => { closeCount++; };
    const buildEdit = (handleEditClose, editOpen, editRow) => {
      editCount++;
      expect(editOpen).toEqual(true);
      expect(editRow).toEqual(rows[0]);
      handleEditClose();
    };
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><ParentTable columns={columns} values={rows} handleClose={handleClose} buildEdit={buildEdit}/></ThemeProvider>);
    wrapper.find('#edit-10').at(0).simulate('click');
    expect(closeCount).toEqual(0);
    expect(editCount).toEqual(1);
  });

  it('should handle editing and saving the changes', () => { 
    let editCount = 0, closeCount = 0;
    const handleClose = (editRow) => { 
      expect(editRow).toEqual(rows[0]);
      closeCount++; 
      return rows;
    };
    const buildEdit = (handleEditClose, editOpen, editRow) => {
      editCount++;
      expect(editOpen).toEqual(true);
      expect(editRow).toEqual(rows[0]);
      handleEditClose(editRow);
    };
    const wrapper = mount(
      <ThemeProvider theme={GlobalTheme()}>
        <ParentTable 
          buildEdit={buildEdit}
          columns={columns} 
          handleClose={handleClose} 
          values={rows}/>
      </ThemeProvider>);
    wrapper.find('#edit-10').at(0).simulate('click');
    expect(closeCount).toEqual(1);
    expect(editCount).toEqual(1);
  });

  it('should handle displaying a child table', () => { 
    const wrapper = mount(
      <ThemeProvider theme={GlobalTheme()}>
        <ParentTable 
          childColumnSelector={() => columns}
          childRowSelector={() => rows}
          childTitle='Child Title'
          columns={columns} 
          values={rows}/>
      </ThemeProvider>);
      expect(getRows(wrapper)).toHaveLength(20);
      wrapper.find('#expand-10').at(0).simulate('click');
      wrapper.update();
      expect(getRows(wrapper)).toHaveLength(32);
  });
});