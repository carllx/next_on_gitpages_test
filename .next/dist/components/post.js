'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('next\\dist\\lib\\link.js');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  return _react2.default.createElement('article', null, _react2.default.createElement('h2', null, props.title), _react2.default.createElement('p', null, props.body), _react2.default.createElement(_link2.default, { href: { pathname: '/post', query: { id: props.id } }, as: '/post/' + props.id }, _react2.default.createElement('a', null, 'Read more...')));
};