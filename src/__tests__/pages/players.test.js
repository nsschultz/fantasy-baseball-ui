import Players from '../../pages/players';
import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';

describe('Players Component', () => {
  let getSpy, putSpy;

  jest.mock('axios');

  afterEach(() => jest.clearAllMocks());
  beforeEach(() => getSpy = jest.spyOn(axios, 'get'));
  beforeEach(() => putSpy = jest.spyOn(axios, 'put'));
  
  it('should call get on load', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({data: {players: [{bhqId:1},{bhdId:2}]}}));
    const wrapper = mount(<Players/>);
    await expect(getSpy).toBeCalled();
    wrapper.update();
    await expect(wrapper.find({type:'button',title:'Edit'})).toHaveLength(2);
  });

  it('should handle errors on load', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error('errorMessage')));
    const wrapper = mount(<Players/>);
    await expect(getSpy).toBeCalled();
    wrapper.update();
    await expect(wrapper.find({type:'button',title:'Edit'})).toHaveLength(0);
  });

  it('should display the check and cancel buttons on edit', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({data: {players: [{bhqId:1},{bhdId:2}]}}));
    const wrapper = mount(<Players/>);
    await expect(getSpy).toBeCalled();
    wrapper.update();
    const editButton = wrapper.find({type:'button',title:'Edit'}).first();
    editButton.simulate('click');
    wrapper.update();
    await expect(wrapper.find({type:'button',title:'Save'})).toHaveLength(1);
    await expect(wrapper.find({type:'button',title:'Cancel'})).toHaveLength(1);
  });

  it('should not update on cancel', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({data: {players: [{bhqId:1},{bhdId:2}]}}));
    const wrapper = mount(<Players/>);
    await expect(getSpy).toBeCalled();
    wrapper.update();
    const editButton = wrapper.find({type:'button',title:'Edit'}).first();
    editButton.simulate('click');
    wrapper.update();
    await expect(wrapper.find({type:'button',title:'Save'})).toHaveLength(1);
    await expect(wrapper.find({type:'button',title:'Cancel'})).toHaveLength(1);
    const cancelButton = wrapper.find({type:'button',title:'Cancel'}).first();
    cancelButton.simulate('click');
    await expect(putSpy).not.toBeCalled();
    wrapper.update();
    await expect(wrapper.find({type:'button',title:'Save'})).toHaveLength(0);
    await expect(wrapper.find({type:'button',title:'Cancel'})).toHaveLength(0);
  });

  it('should handle errors on update', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({data: {players: [{bhqId:1},{bhdId:2}]}}));
    axios.put.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
    const wrapper = mount(<Players/>);
    await expect(getSpy).toBeCalled();
    wrapper.update();
    const editButton = wrapper.find({type:'button',title:'Edit'}).first();
    editButton.simulate('click');
    wrapper.update();
    await expect(wrapper.find({type:'button',title:'Save'})).toHaveLength(1);
    await expect(wrapper.find({type:'button',title:'Cancel'})).toHaveLength(1);
    const saveButton = wrapper.find({type:'button',title:'Save'}).first();
    saveButton.simulate('click');
    await expect(putSpy).toBeCalled();
    wrapper.update();
    await expect(wrapper.find({type:'button',title:'Save'})).toHaveLength(0);
    await expect(wrapper.find({type:'button',title:'Cancel'})).toHaveLength(0);
  });

  it('should handle success on update', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({data: {players: [{bhqId:1},{bhdId:2}]}}));
    axios.put.mockImplementationOnce(() => Promise.resolve());
    const wrapper = mount(<Players/>);
    await expect(getSpy).toBeCalled();
    wrapper.update();
    const editButton = wrapper.find({type:'button',title:'Edit'}).first();
    editButton.simulate('click');
    wrapper.update();
    await expect(wrapper.find({type:'button',title:'Save'})).toHaveLength(1);
    await expect(wrapper.find({type:'button',title:'Cancel'})).toHaveLength(1);
    const saveButton = wrapper.find({type:'button',title:'Save'}).first();
    saveButton.simulate('click');
    await expect(putSpy).toBeCalled();
    wrapper.update();
    await expect(wrapper.find({type:'button',title:'Save'})).toHaveLength(0);
    await expect(wrapper.find({type:'button',title:'Cancel'})).toHaveLength(0);
  });
});