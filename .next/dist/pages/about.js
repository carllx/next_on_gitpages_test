'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  (0, _glamor.rehydrate)(window.__NEXT_DATA__.ids);
}

exports.default = function () {

  var basicStyles = {
    backgroundColor: 'white',
    color: 'cornflowerblue',
    border: '1px solid lightgreen',
    borderRight: 'none',
    borderBottom: 'none',
    boxShadow: '5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow',
    transition: 'all 0.1s linear',
    margin: '3rem 0',
    padding: '1rem 0.5rem'
  };

  var hoverStyles = {
    ':hover': {
      color: 'white',
      backgroundColor: 'lightgray',
      borderColor: 'aqua',
      boxShadow: '-15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue'
    },
    '& code': {
      backgroundColor: 'linen'
    }
  };

  var crazyStyles = function crazyStyles(props) {
    var crazyStyles = hoverStyles;
    var bounce = _glamor.css.keyframes({
      '0%': { transform: 'scale(1.01)' },
      '100%': { transform: 'scale(0.99)' }
    });
    crazyStyles.animation = bounce + ' 0.2s infinite ease-in-out alternate';
    return crazyStyles;
  };

  var Basic = _glamorous2.default.div(basicStyles);
  var Combined = _glamorous2.default.div(basicStyles, hoverStyles);
  var Animated = _glamorous2.default.div(basicStyles, hoverStyles, crazyStyles);

  return _react2.default.createElement('div', null, _react2.default.createElement(Basic, null, 'Cool Styles'), _react2.default.createElement(Combined, null, 'With ', _react2.default.createElement('code', null, ':hover'), '.'), _react2.default.createElement(Animated, null, 'Let\'s bounce.'));
};