'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('next\\node_modules\\babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('next\\node_modules\\babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('next\\node_modules\\babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('next\\node_modules\\babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('next\\node_modules\\babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _head = require('next\\dist\\lib\\head.js');

var _head2 = _interopRequireDefault(_head);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _glamor = require('glamor');

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _nav = require('../components/nav');

var _nav2 = _interopRequireDefault(_nav);

var _carta = require('../components/carta');

var _carta2 = _interopRequireDefault(_carta);

var _device = require('../utils/device');

var _artist = require('../static/contents/artist');

var _artist2 = _interopRequireDefault(_artist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// css.global('html, body',
//   { padding: '3rem 1rem',
//   margin: 0,
//   background: 'papayawhip',
//   minHeight: '100%',
//   fontFamily: 'Helvetica, Arial, sans-serif',
//   fontSize: '24px' })


function ugent() {
	if (typeof window == 'undefined') return;
	if (typeof navigator == 'undefined') return;
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	// const device = new DEVICE();
	// device.init();
	return userAgent;
}

var _class = function (_Component) {
	(0, _inherits3.default)(_class, _Component);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);

		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement('main', null, _react2.default.createElement(_head2.default, null, _react2.default.createElement('title', null, '\u4E2D\u827A\u56FD\u9645-\u827A\u672F\u5BB6')), _react2.default.createElement(_glamorous2.default.Div, { paddingTop: '21rem' }, _react2.default.createElement(_carta2.default, null)), _react2.default.createElement(_nav2.default, { device: 'mobile' }));
		}
	}]);

	return _class;
}(_react.Component);

// <section>
//   {this.props.postList.map(post => <Post {...post} key={post.id} />)}
// </section>


exports.default = _class;