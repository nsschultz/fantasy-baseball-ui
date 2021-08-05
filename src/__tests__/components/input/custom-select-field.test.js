import { Checkbox, InputLabel, ListItemText, MenuItem, Select } from '@material-ui/core';

import CustomSelectField from '../../../components/input/custom-select-field';
import React from 'react';
import { shallow } from 'enzyme';

describe('Custom Select Field', () => {
  const lookupValues = { 0: 'Available', 1: 'Rostered', 2: 'Unavailable', 3: 'Scouted' };
  const title = 'Select Title';

  it('should render with a title', () => {
    expect(shallow(<CustomSelectField filterValues={[]} lookup={lookupValues} title={title}/>).find(InputLabel).text()).toEqual(title);
  });

  it('should render with a list of the items', () => {
    const wrapper = shallow(<CustomSelectField filterValues={[]} lookup={lookupValues} title={title}/>);
    const listItems = wrapper.find(MenuItem);
    expect(listItems).toHaveLength(4);
    listItems.forEach(item => { expect(item.find(ListItemText).prop('primary')).toEqual(lookupValues[item.prop('value')]); });
  });

  it('should render with fields already selected', () => {
    const filterValues = ['1','3'];
    const wrapper = shallow(<CustomSelectField filterValues={filterValues} lookup={lookupValues} title={title}/>);
    const listItems = wrapper.find(MenuItem);
    listItems.forEach(item => { expect(item.find(Checkbox).prop('checked')).toEqual(filterValues.some(f => f === item.prop('value'))); });
    const select = wrapper.find(Select);
    expect(select.prop('value')).toEqual(filterValues);
    const render = select.render();
    expect(render.text()).toEqual('Rostered, Scouted');
  });

  it('should handle onChange events', () => {
    let existingField = 'OldField'
    let existingValue = 'Old';
    const onHandleFilterChange = (event) => existingValue = event.target.value;
    const wrapper = shallow(<CustomSelectField field={existingField} lookup={lookupValues} onHandleFilterChange={onHandleFilterChange} title={title}/>);
    expect(existingValue).toEqual('Old');
    wrapper.find(Select).simulate('change', { target: { name: 'width', value: 'New' } });
    expect(existingValue).toEqual('New');
  });
});