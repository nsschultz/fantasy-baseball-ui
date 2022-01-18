import CustomTableRow from "../../../components/table/custom-table-row";
import GlobalTheme from '../../../components/global-theme';
import React from 'react';
import { TableCell } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';
import { mount } from 'enzyme';

describe('Custom Table Row', () => {
  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Age', field: 'age', type: 'numeric' },
    { title: 'Type', field: 'type', lookup: { 0: '', 1: 'Batter', 2: 'Pitcher' } },
    { title: 'Drafted %', field: 'draftedPercentage', type: 'numeric', format: (value) => value.toFixed(2) }
  ];

  const values = { id: 10, name: 'Schultz, Nick', age: 40, type: 1, draftedPercentage: 0 };

  it('should render basic row', () => { 
    const wrapper = mount(<CustomTableRow columns={columns} values={values}/>);
    expect(wrapper.find(TableCell)).toHaveLength(columns.length);
  });

  it('should render with edit button', () => {
    let editData = {};
    expect(editData).toEqual({});
    const wrapper = mount(<CustomTableRow columns={columns} handleEditOpen={(v) => editData = v} values={values}/>);
    expect(wrapper.find(TableCell)).toHaveLength(columns.length+1);
    wrapper.find('#edit-10').at(0).simulate('click');
    expect(editData).toEqual(values);
  });

  it('should render with child table', () => { 
    const wrapper = mount(
      <ThemeProvider theme={GlobalTheme()}>
        <CustomTableRow 
          childColumns={columns}
          childRows={[values]}
          childTitle='ChildTitle'
          columns={columns} 
          values={values}/>
      </ThemeProvider>);
    expect(wrapper.find(TableCell)).toHaveLength(columns.length+2);
    wrapper.find('#expand-10').at(0).simulate('click');
    expect(wrapper.find(TableCell)).toHaveLength(columns.length*3+2);
  });
});