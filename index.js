import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

class TextInput extends Component {
  constructor(props) {
    super(props);

    // Create an ID if none exists for label binding
    this.id = props.id || uuidv4();

    this.state = {
      value: '',
      valid: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState((prevState, props) => {
      let valid = prevState.valid;
      
      // Check if input has any value
      if (e.target.value.length > 0) {
        // If the input has a value, check to see if it has
        // a validator function set
        if (typeof this.props.validator === 'function') {
          // If the input has a validator function set, we
          // run the function and assign it's returned value
          // to valid so we can update the state.
          valid = this.props.validator(e.target.value);
        }
      } else {
        // If the input has no value, set valid to an empty string
        // so that any validation messages won't display
        valid = '';
      }

      return {
        value: e.target.value,
        valid
      };
    });
  }

  render() {
    return (
      <div className="text-input">
        { typeof this.props.label !== 'undefined' ? <label htmlFor={this.id}>{this.props.label}</label> : '' }
        <input
          type={this.props.type || 'text'}
          onChange={this.handleChange}
          value={this.state.value} />
      </div>
    );
  }
}

export default TextInput;
