import CustomCard from '../../../components/card/custom-card';
import React from 'react';
import { mount } from 'enzyme';

describe('Custom Card Component', () => {
  const title = 'Card Title';
  const content = 'Card Content';

  it('should render the card with additional content', () => {
    const wrapper = mount(<CustomCard title={title} content={(<h2>{content}</h2>)} additionalContent={(<h1>More Content</h1>)}/>);
    expect(wrapper.find('span').text()).toEqual(title);
    expect(wrapper.find('h2').text()).toEqual(content);
    expect(wrapper.find('h1').text()).toEqual('More Content');
  });

  it('should render the card without additional content', () => {
    const wrapper = mount(<CustomCard title={title} content={(<h2>{content}</h2>)}/>);
    expect(wrapper.find('span').text()).toEqual(title);
    expect(wrapper.find('h2').text()).toEqual(content);
    expect(wrapper.find('h1').isEmpty()).toEqual(true);
  });
});