'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('next\\node_modules\\babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('next\\node_modules\\babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

// import fetch from 'isomorphic-fetch'

var BGContainer = _glamorous2.default.div({

	// fontSize:'0.3rem',
	zIndex: 1,
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-around',

	backgroundColor: '#3b444f',
	// backgroundPosition:'50%',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',

	overflow: 'hidden',
	position: 'absolute',
	left: 0,
	top: 0

}, function (props) {
	return {
		// isLandscape  --或 居中
		width: props.w ? '' + props.w : '100%',
		height: props.h ? '' + props.h : '100%',
		//在这里找渐变模板 https://webgradients.com/
		backgroundImage: props.src ? 'url(' + props.src + ')' : 'linear-gradient(to right, #d7d2cc 0%, #304352 100%)'

	};
});

var Loading = _glamorous2.default.div({
	fontWeight: 100,
	padding: '0.3em 3em',
	fontSize: '0.4em',
	color: _ui.ui.color.secondary_on_light,
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	display: 'flex',
	backgroundColor: _ui.ui.color.primary

}, function (props) {
	return {
		// color:props.onload?ui.color.secondary_on_light:ui.color.secondary_on_dark,
		// display:props.onload?'none':'flex',
	};
});

var IMG = function (_Component) {
	(0, _inherits3.default)(IMG, _Component);

	function IMG(props) {
		(0, _classCallCheck3.default)(this, IMG);

		//url

		var _this = (0, _possibleConstructorReturn3.default)(this, (IMG.__proto__ || (0, _getPrototypeOf2.default)(IMG)).call(this, props));

		_this.state = { //onload active
			active: _this.props.active,
			onload: _this.props.onload
		};

		return _this;
	}
	// static async getInitialProps () {

	// 	// fetch list of posts
	// 	// 只支持外部文件url请求
	// 	const response = await fetch('http://jsonplaceholder.typicode.com/posts?_page=1')
	// 	const postList = await response.json();
	// 	return { postList }
	// }

	(0, _createClass3.default)(IMG, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.fethImg();
		}
	}, {
		key: 'fethImg',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
				var src, response, isOk;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								/*test
         	http://res.cloudinary.com/responsivebreakpoints/image/upload/
        c_crop,
        h_403,
        w_200
        /v1502792912/00_Tempio_Malatestiano_gwfwy4.jpg
        */
								src = 'http://res.cloudinary.com/responsivebreakpoints/image/upload/' + 'c_crop,' + (
								// `h_${this.props.h},`+
								'h_' + window.innerHeight + ',') + ('w_' + window.innerWidth + '/') + (
								// `w_${this.props.w}/`+
								'' + this.props.org);
								_context.next = 3;
								return fetch(src);

							case 3:
								response = _context.sent;
								_context.next = 6;
								return response.ok;

							case 6:
								isOk = _context.sent;

								if (isOk) this.setState({ onload: true });
								this.setState({ src: src });

							case 9:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function fethImg() {
				return _ref.apply(this, arguments);
			}

			return fethImg;
		}()
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', null, _react2.default.createElement(BGContainer, {
				w: this.state.w,
				h: this.state.h,
				active: this.state.onload,
				src: this.state.src }, _react2.default.createElement(Loading, {
				w: this.state.w,
				h: this.state.h,
				onload: this.state.onload }, !this.state.onload ? 'Loading....' : 'WE \'RECOMMING..')));
		}
	}]);

	return IMG;
}(_react.Component);

exports.default = IMG;