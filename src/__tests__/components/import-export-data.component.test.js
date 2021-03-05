import ImportExportData from '../../components/import-export-data.component';
import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';

describe('Import Export Data Component', () => {
  let wrapper, postSpy, getSpy, exportButton, mergeButton;

  jest.mock('axios');

  afterEach(() => jest.clearAllMocks());
  beforeEach(()=> wrapper = mount(<ImportExportData/>));
  beforeEach(()=> mergeButton = wrapper.find('button').at(0));
  beforeEach(()=> exportButton = wrapper.find('button').at(1));
  beforeEach(()=> postSpy = jest.spyOn(axios, 'post'));
  beforeEach(()=> getSpy = jest.spyOn(axios, 'get'));
  
  it('should render the buttons', () => {
    expect(mergeButton.text()).toEqual('Merge Players');
    expect(mergeButton.props().disabled).toEqual(false);
    expect(exportButton.text()).toEqual('Export Players');
    expect(exportButton.props().disabled).toEqual(false);
  });

  it('should call post on merge click', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({}));
    mergeButton.simulate('click');
    await expect(postSpy).toBeCalled();
    wrapper.update();
    await expect(mergeButton.props().disabled).toEqual(false);
    await expect(wrapper.state().severity).toEqual("success");
  });

  it('should handle errors on post', async () => {
    axios.post.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
    mergeButton.simulate('click');
    await expect(postSpy).toBeCalled();
    wrapper.update();
    await expect(mergeButton.props().disabled).toEqual(false);
    await expect(wrapper.state().severity).toEqual("error");
  });

  it('should handle errors on get', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
    exportButton.simulate('click');
    await expect(getSpy).toBeCalled();
    wrapper.update();
    await expect(exportButton.props().disabled).toEqual(false);
    await expect(wrapper.state().severity).toEqual("error");
  });
});