import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// import TextInput from './index';
import TextInput from './dist/TextInput';

configure({ adapter: new Adapter() });

const div = document.createElement('div');

it('renders without crashing', () => {
  ReactDOM.render(
    <TextInput />
  , div);
});

it('accepts a label property and renders a label tag', () => {
  const input = shallow(<TextInput id="testing-label" label="Testing Label" />);
  const label = <label htmlFor="testing-label">Testing Label</label>;

  expect(input.contains(label)).toEqual(true);
});

it('displays error message when validator function returns false', () => {
  const errorMessage = "Input invalid";

  const input = shallow(<TextInput validator={val => { return false; }} error={errorMessage} value="lorem" />);
  const error = <div className="validation-message"><div className="error">{errorMessage}</div></div>;

  expect(input.contains(error)).toEqual(true);
});

it('displays success message when validator function returns true', () => {
  const successMessage = "Input invalid";

  const input = shallow(<TextInput validator={val => { return true; }} success={successMessage} value="lorem" />);
  const success = <div className="validation-message"><div className="success">{successMessage}</div></div>;

  expect(input.contains(success)).toEqual(true);
});

it('displays the sublabel with a SublabelClass', () => {
  const subLabel = "here's the sublabel";

  const input = shallow(
    <TextInput
      subLabel={subLabel}
      subLabelClassName="testing" />
  );
  const subLabelNode = <small className="sub-label testing">{subLabel}</small>;

  expect(input.contains(subLabelNode)).toEqual(true);
});