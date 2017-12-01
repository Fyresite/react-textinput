# react-textinput

Base TextInput React Component built for internal Fyresite use.

## Installation

```
npm install --save-dev @fyresite/react-textinput
```

## Usage

```javascript
import React, { Component } from 'react';
import TextInput from '@fyresite/react-textinput';

class Example extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      textInput: ''
    };
  }
  
  handleChange(field, e) {
    this.setState((prevState, props) => {
      return {
        [field]: e.target.value
      };
    });
  }
  
  render() {
    return (
      <TextInput
        onChange={this.handleChange.bind(this, 'textInput')}
        value={this.state.textInput} />
    );
  }
}
```
