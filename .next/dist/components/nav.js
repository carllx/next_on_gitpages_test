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

var _link = require('next\\dist\\lib\\link.js');

var _link2 = _interopRequireDefault(_link);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _logo = require('./logo');

var _logo2 = _interopRequireDefault(_logo);

var _ui = require('../utils/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// glamor
// css.global(
// 	'@font-face', {
// 		fontFamily: 'fontZai', src: "url('../static/SFElectrotome-Bold.woff') format('woff')"
// 	}
// );
//
// let abc = css({
//   // 'color': 'red',
//   // ':hover': { color: 'blue' },
//   // 'html.ie9 & span.title': { fontWeight: 'bold' },
//   // '@media(min-width: 300px)': { fontSize: 20 }
// })


// DATA

var paths = [{ 'str': '主页', 'url': '/index' }, { 'str': '艺术家', 'url': '/artista' }, { 'str': '展览', 'url': '/mostre' }, { 'str': '新闻', 'url': '/eventi' }, { 'str': '关于', 'url': '/about' }];

var AContainer = _glamorous2.default.div({

	position: 'relative',
	cursor: 'pointer'
	// color: 'rgba(0, 0, 0, 0.69)',
}, function (props) {
	return {};
});

var A = _glamorous2.default.div({

	cursor: 'pointer'

}, function (props) {
	return {};
});

// ELEMENT

var NavContainer = _glamorous2.default.div({

	fontSize: '0.3rem',
	position: 'fixed',
	zIndex: 1,
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-around',
	backgroundColor: 'white'

}, function (props) {
	return {
		// isLandscape  --或 居中
		left: props.isLandscape ? 0 : '50%',
		top: props.isLandscape ? 0 : '100%',
		transform: props.isLandscape ? 'translate(0, 0)' : 'translate(-50%, -100%)',
		width: props.isLandscape ? 'auto' : '100%',
		padding: props.isLandscape ? '2em' : '1em',
		boxShadow: props.isLandscape ? '0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2)' : '0 -16px 24px 2px rgba(0,0,0,.14),0 -6px 30px 5px rgba(0,0,0,.12),0 -8px 10px -5px rgba(0,0,0,.2)'

	};
});

// const LinkItems = paths.map((paths,index) =>
//   <Link href= {paths.url} >
//   	<A>{paths.str}</A>
//   </Link>
// );

var LinkItems = paths.map(function (paths, index) {
	return _react2.default.createElement(AContainer, { key: 'Container' + index }, _react2.default.createElement(_link2.default, { href: paths.url, key: 'A' + index }, _react2.default.createElement(A, null, paths.str)));
});

// extended component with theme prop

var Nav = function (_Component) {
	(0, _inherits3.default)(Nav, _Component);

	function Nav(props) {
		(0, _classCallCheck3.default)(this, Nav);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Nav.__proto__ || (0, _getPrototypeOf2.default)(Nav)).call(this, props));

		_this.onClick = function (value) {
			console.log(value, '来自 child 的 value 变化');
		};

		_this.state = {};

		return _this;
	}

	(0, _createClass3.default)(Nav, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { onClick: this.onClick }, _react2.default.createElement(NavContainer, { isLandscape: this.props.isLandscape }, LinkItems));
		}
	}]);

	return Nav;
}(_react.Component);

;
exports.default = Nav;