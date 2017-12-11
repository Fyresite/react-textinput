import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import isEqual from 'lodash.isequal';

import './style.scss';

class TextInput extends Component {
  constructor(props) {
    super(props);

    // Create an ID if none exists for label binding
    this.id = props.id || uuidv4();

    this.state = {
      value: typeof props.value !== 'undefined' ? props.value : '',
      valid: typeof props.valid !== 'undefined' ? props.valid : ''
    };

    this.renderSubLabel = this.renderSubLabel.bind(this);
  }

  componentDidMount() {
    if (typeof this.props.validator === 'function' && this.state.value !== '') {
      this.setState((prevState, props) => {
        let valid = this.props.validator(this.state.value);

        return { valid };
      });
    }

    this.focus = this.focus.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // Do a diff comparison of the prevProps and this.props objects to see if anything
    // has changed before setting the state, (so we don't trigger an infinite loop)
    if (!isEqual(prevProps, this.props)) {
      // If the props are unequal we can reset the state, but first we need to make sure
      // we handle the case of value or valid not being set as a prop, which can cause
      // a bug where the component loses the key in it's state.
      let state = Object.assign({}, this.state, {
        value: typeof this.props.value !== 'undefined' ? this.props.value : this.state.value,
        valid: typeof this.props.valid !== 'undefined' ? this.props.valid : this.state.valid
      });

      this.setState((prevState, props) => {
        return state;
      });
    }
  }

  focus() {
    this.input.focus();
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
  
  renderSubLabel() {
    let classes = ['sub-label'];

    if (typeof this.props.subLabelClassName !== 'undefined') {
      classes.push(this.props.subLabelClassName);
    }

    return (<small className={classes.join(' ')}>{this.props.subLabel}</small>);
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
          id={this.id}
          className={inputClasses.join(' ')}
          disabled={this.props.disabled || false}
          type={this.props.type || 'text'}
          onChange={this.handleChange.bind(this)}
          value={this.state.value}
          ref={el => this.input = el}
          placeholder={this.props.placeholder} />
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
        { typeof this.props.subLabel !== 'undefined' && (this.state.valid !== false && typeof this.props.success === 'undefined') ? this.renderSubLabel() : '' }
      </div>
    );
  }
}

export default TextInput;
