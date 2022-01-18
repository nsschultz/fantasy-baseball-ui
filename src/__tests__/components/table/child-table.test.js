import { TableBody, TableCell, TableHead } from '@material-ui/core';

import ChildTable from '../../../components/table/child-table';
import GlobalTheme from '../../../components/global-theme';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { mount } from 'enzyme';

describe('Child Table', () => {
  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Age', field: 'age', type: 'numeric' },
    { title: 'Type', field: 'type', lookup: { 0: '', 1: 'Batter', 2: 'Pitcher' } },
    { title: 'Drafted %', field: 'draftedPercentage', type: 'numeric', format: (value) => value.toFixed(2) }
  ];

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

  const title = 'Test Title';
  
  it('should render', () => { 
    const wrapper = mount(<ThemeProvider theme={GlobalTheme()}><ChildTable columns={columns} rows={rows} title={title}/></ThemeProvider>);
    expect(wrapper.find('h4').text()).toEqual(title);
    expect(wrapper.find(TableHead).find(TableCell)).toHaveLength(columns.length);
    expect(wrapper.find(TableBody).find('tr')).toHaveLength(rows.length);
  });
});