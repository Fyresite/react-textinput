import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

class TextInput extends Component {
  constructor(props) {
    super(props);

    // Create an ID if none exists for label binding
    this.id = props.id || uuidv4();

    this.state = {
      value: typeof props.value !== 'undefined' ? props.value : '',
      valid: ''
    };
  }

  componentDidMount() {
    if (typeof this.props.validator === 'function') {
      this.setState((prevState, props) => {
        let valid = this.props.validator(this.state.value);

        return { valid };
      });
    }
  }

  handleChange(e) {
    // Pass the value from the event to avoid a stupid synthetic event
    let value = e.target.value;

    this.setState((prevState, props) => {
      let valid = prevState.valid;
      
      // Check if input has any value
      if (value.length > 0) {
        // If the input has a value, check to see if it has
        // a validator function set
        if (typeof this.props.validator === 'function') {
          // If the input has a validator function set, we
          // run the function and assign it's returned value
          // to valid so we can update the state.
          valid = this.props.validator(value);
        }
      } else {
        // If the input has no value, set valid to an empty string
        // so that any validation messages won't display
        valid = '';
      }

      return {
        value,
        valid
      };
    }, () => {
      // Check if the onChange property is defined as a function
      if (typeof this.props.onChange === 'function') {
        // If the onChange property is defined as a function, call it and send the
        // synthetic event and the updated state of the component
        this.props.onChange(e, Object.assign({}, this.state));
      }
    });
  }

  render() {
    let textInputClasses = ['text-input'];

    if (typeof this.props.className !== 'undefined') {
      textInputClasses.push(this.props.className);
    }

    let inputClasses = [];

    if (typeof this.props.inputClassName !== 'undefined') {
      inputClasses.push(this.props.inputClassName);
    }

    return (
      <div className={textInputClasses.join(' ')}>
        { typeof this.props.label !== 'undefined' ? <label htmlFor={this.id}>{this.props.label}</label> : '' }
        <input
          className={inputClasses.join(' ')}
          type={this.props.type || 'text'}
          onChange={this.handleChange.bind(this)}
          value={this.state.value} />
        {
          this.state.valid !== '' ?
            <div className="validation-message">
              {
                this.state.valid === true ?
                  <div className="success">{this.props.success}</div>
                  :
                  <div className="error">{this.props.error}</div>
              }
            </div>
            : ''
        }
      </div>
    );
  }
}

export default TextInput;
