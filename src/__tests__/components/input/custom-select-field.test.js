import CustomSelectField from '../../../components/input/custom-select-field';
import React from 'react';
import { shallow } from 'enzyme';

describe('Custom Select Field', () => {
  const lookupValues = { 0: 'Available', 1: 'Rostered', 2: 'Unavailable', 3: 'Scouted' };
  const title = 'Select Title';

  it('should render with a title', () => {
    expect(shallow(<CustomSelectField filterValues={[]} lookup={lookupValues} title={title}/>).find('ForwardRef(InputLabel)').text()).toEqual(title);
  });

  it('should render with a list of the items', () => {
    const wrapper = shallow(<CustomSelectField filterValues={[]} lookup={lookupValues} title={title}/>);
    const listItems = wrapper.find('ForwardRef(MenuItem)');
    expect(listItems.length).toEqual(4);
    listItems.forEach(item => { expect(item.find('ForwardRef(ListItemText)').prop('primary')).toEqual(lookupValues[item.prop('value')]); });
  });

  it('should render with fields already selected', () => {
    const filterValues = ['1','3'];
    const wrapper = shallow(<CustomSelectField filterValues={filterValues} lookup={lookupValues} title={title}/>);
    const listItems = wrapper.find('ForwardRef(MenuItem)');
    listItems.forEach(item => { expect(item.find('ForwardRef(Checkbox)').prop('checked')).toEqual(filterValues.some(f => f === item.prop('value'))); });
    const select = wrapper.find('WithStyles(ForwardRef(Select))');
    expect(select.prop('value')).toEqual(filterValues);
    const render = select.render();
    expect(render.text()).toEqual('Rostered, Scouted');
  });

  it('should handle onChange events', () => {
    let existingField = 'OldField'
    let existingValue = 'Old';
    const onHandleFilterChange = (field, value) => {
      expect(field).toEqual(existingField);
      existingValue = value;
    };
    const wrapper = shallow(<CustomSelectField field={existingField} lookup={lookupValues} onHandleFilterChange={onHandleFilterChange} title={title}/>);
    expect(existingValue).toEqual('Old');
    wrapper.find('WithStyles(ForwardRef(Select))').simulate('change', { target: { name: 'width', value: 'New' } });
    expect(existingValue).toEqual('New');
  });
});