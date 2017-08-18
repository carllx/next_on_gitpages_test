'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('next\\node_modules\\babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _assign = require('next\\node_modules\\babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _link = require('next\\dist\\lib\\link.js');

var _link2 = _interopRequireDefault(_link);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _ui = require('../utils/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'E:\\data\\working\\Sito\\Pages chengcestudio nextjs_pages\\components\\logo.js';


// FONT

var ZaiFont = _glamor.css.fontFace({
  fontFamily: 'ZAI',
  fontStyle: 'normal',
  fontWeight: 400,
  src: "url('../static/font/SFElectrotome-Bold.woff2') format('woff2')," + "url('../static/font/SFElectrotome-Bold.woff') format('woff')," + "url('../static/font/SFElectrotome-Bold.svg') format('svg')",
  unicodeRange: "U+0000-00FF, U+0131, ... U+E0FF, U+EFFD, U+F000"
});

var ZhoFont = _glamor.css.fontFace({
  fontFamily: 'Zho',
  fontStyle: 'normal',
  fontWeight: 400,
  src: "url('../static/font/SquadaOne-Regular.woff2') format('woff2')," + "url('../static/font/SquadaOne-Regular.woff') format('woff')," + "url('../static/font/SquadaOne-Regular.svg') format('svg')",
  unicodeRange: "U+0000-00FF, U+0131, ... U+E0FF, U+EFFD, U+F000"
});

// ELEMENT

var LogoZAI = _glamorous2.default.div({

  fontFamily: ZaiFont,
  lineHeight: '0.8em', //为了和右边对齐
  display: 'flex',
  alignItems: 'flex-end',
  padding: '0 0.1em 0 0'
});

var LogoRight = _glamorous2.default.div({

  fontFamily: ZhoFont,
  fontSize: '0.3em'

});

/**
 * Logo组件,
 * @param  {float}  fontSize
 * @param  {string} color  [description]
 * @param  {string} bg_color  [description]
 * @return {component}
 */

function isMobile_Logo() {
  return {
    fontSize: '1rem'
  };
}

var _Logo = _glamorous2.default.div({
  // alignItems:'baseline',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-end',
  position: 'fixed',
  zIndex: 2,
  textAlign: 'left',
  boxShadow: '0 9px 46px 8px rgba(0,0,0,.14),0 11px 15px -7px rgba(0,0,0,.12),0 24px 38px 3px rgba(0,0,0,.2)',
  padding: '0.5em 0.5em 0.5em 0.5em'
}, function (props) {

  var Default = {
    fontSize: props.size ? props.size + 'rem' : '0.8rem',
    color: props.color,
    backgroundColor: props.bg_color
  };

  var isLandscape = props.isLandscape;

  var isDesktop = {
    fontSize: props.size ? props.size + 'rem' : '0.8rem'
  };

  var isMobile = {
    fontSize: isLandscape ? '0.8rem' : '1rem',
    width: isLandscape ? 'auto' : '100%',
    left: isLandscape ? '50%' : 0,
    top: isLandscape ? '0%' : 0,
    transform: isLandscape ? 'translate(-50%, 0)' : 0
  };

  var isTablet = {
    fontSize: '1rem'
  };
  switch (props.device) {
    case 'isDesktop':
      return (0, _assign2.default)(Default, isDesktop);

    case 'isMobile':
      return (0, _assign2.default)(Default, isMobile);
      break;
    case 'isTablet':
      return (0, _assign2.default)(Default, isTablet);
      break;
  }
});

var Logo = function (_Component) {
  (0, _inherits3.default)(Logo, _Component);

  function Logo(props) {
    (0, _classCallCheck3.default)(this, Logo);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Logo.__proto__ || (0, _getPrototypeOf2.default)(Logo)).call(this, props));

    _this.state = {};

    return _this;
  }

  (0, _createClass3.default)(Logo, [{
    key: 'render',
    value: function render() {

      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 141
        }
      }, _react2.default.createElement(_Logo, (0, _extends3.default)({}, this.props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142
        }
      }), _react2.default.createElement(LogoZAI, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143
        }
      }, 'ZAI'), _react2.default.createElement(LogoRight, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 144
        }
      }, _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 145
        }
      }, 'Zhong Art'), _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        }
      }, 'Internazionale'))));
    }
  }]);

  return Logo;
}(_react.Component);

exports.default = Logo;