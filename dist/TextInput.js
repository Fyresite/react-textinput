'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInput = function (_Component) {
  _inherits(TextInput, _Component);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    // Create an ID if none exists for label binding
    var _this = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props));

    _this.id = props.id || (0, _v2.default)();

    _this.state = {
      value: typeof props.value !== 'undefined' ? props.value : '',
      valid: ''
    };
    return _this;
  }

  _createClass(TextInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (typeof this.props.validator === 'function') {
        this.setState(function (prevState, props) {
          var valid = _this2.props.validator(_this2.state.value);

          return { valid: valid };
        });
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var _this3 = this;

      // Pass the value from the event to avoid a stupid synthetic event
      var value = e.target.value;

      this.setState(function (prevState, props) {
        var valid = prevState.valid;

        // Check if input has any value
        if (value.length > 0) {
          // If the input has a value, check to see if it has
          // a validator function set
          if (typeof _this3.props.validator === 'function') {
            // If the input has a validator function set, we
            // run the function and assign it's returned value
            // to valid so we can update the state.
            valid = _this3.props.validator(value);
          }
        } else {
          // If the input has no value, set valid to an empty string
          // so that any validation messages won't display
          valid = '';
        }

        return {
          value: value,
          valid: valid
        };
      }, function () {
        // Check if the onChange property is defined as a function
        if (typeof _this3.props.onChange === 'function') {
          // If the onChange property is defined as a function, call it and send the
          // synthetic event and the updated state of the component
          _this3.props.onChange(e, Object.assign({}, _this3.state));
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var textInputClasses = ['text-input'];

      if (typeof this.props.className !== 'undefined') {
        textInputClasses.push(this.props.className);
      }

      var inputClasses = [];

      if (typeof this.props.inputClassName !== 'undefined') {
        inputClasses.push(this.props.inputClassName);
      }

      return _react2.default.createElement(
        'div',
        { className: textInputClasses.join(' ') },
        typeof this.props.label !== 'undefined' ? _react2.default.createElement(
          'label',
          { htmlFor: this.id },
          this.props.label
        ) : '',
        _react2.default.createElement('input', {
          className: inputClasses.join(' '),
          type: this.props.type || 'text',
          onChange: this.handleChange.bind(this),
          value: this.state.value }),
        this.state.valid !== '' ? _react2.default.createElement(
          'div',
          { className: 'validation-message' },
          this.state.valid === true ? _react2.default.createElement(
            'div',
            { className: 'success' },
            this.props.success
          ) : _react2.default.createElement(
            'div',
            { className: 'error' },
            this.props.error
          )
        ) : ''
      );
    }
  }]);

  return TextInput;
}(_react.Component);

exports.default = TextInput;
