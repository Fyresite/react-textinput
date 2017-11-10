import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TextInput from './index';

configure({ adapter: new Adapter() });

const div = document.createElement('div');

it('renders without props without crashing', () => {
  ReactDOM.render(
    <TextInput />
  , div);
});

it('accepts a label property and renders a label tag', () => {
  const input = shallow(<TextInput id="testing-label" label="Testing Label" />);
  const label = <label htmlFor="testing-label">Testing Label</label>;

  expect(input.contains(label)).toEqual(true);
});