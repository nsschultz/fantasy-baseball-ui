import CustomCard from '../../../components/card/custom-card';
import React from 'react';
import { mount } from 'enzyme';

describe('Custom Card Component', () => {
  it('should render the card with additional content', () => {
    const card = mount(<CustomCard title='Card Title' content={(<h2>Card Content</h2>)} additionalContent={(<h1>More Content</h1>)}/>);
    expect(card.find('span').text()).toEqual('Card Title');
    expect(card.find('h2').text()).toEqual('Card Content');
    expect(card.find('h1').text()).toEqual('More Content');
  });

  it('should render the card without additional content', () => {
    const card = mount(<CustomCard title='Card Title' content={(<h2>Card Content</h2>)}/>);
    expect(card.find('span').text()).toEqual('Card Title');
    expect(card.find('h2').text()).toEqual('Card Content');
  });
});