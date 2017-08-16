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
  // display      :'inline-block',
  fontSize: '0.8em',
  lineHeight: '0.8em', //为了和右边对齐
  display: 'flex',
  alignItems: 'flex-end',
  padding: '0 0.1em 0 0'
});

var LogoRight = _glamorous2.default.div({

  fontFamily: ZhoFont,
  fontSize: '0.3em'

  // display    :'inline-block',
  // paddingLeft:'0.5rem',
  // float      :'right',
});

var LogoContainer = _glamorous2.default.div({

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-end',
  // alignItems:'baseline',    
  position: 'fixed',
  zIndex: 2,
  textAlign: 'left',
  color: _ui.ui.color.primary_on_dark,
  backgroundColor: _ui.ui.color.secondary,
  boxShadow: '0 9px 46px 8px rgba(0,0,0,.14),0 11px 15px -7px rgba(0,0,0,.12),0 24px 38px 3px rgba(0,0,0,.2)',
  padding: '0.5em 0.5em 0.5em 0.5em'
}, function (props) {

  var isLandscape = props.isLandscape;

  if (props.device == 'isDesktop') {
    return {
      fontSize: '1rem',
      width: 'auto'
    };
  } else if (props.device == 'isMobile') {
    return {
      fontSize: isLandscape ? '0.8rem' : '1rem',
      width: isLandscape ? 'auto' : '100%',

      left: isLandscape ? '50%' : 0,
      top: isLandscape ? '0%' : 0,
      transform: isLandscape ? 'translate(-50%, 0)' : 0
    };
  } else if (props.device == 'isTablet') {
    return {
      fontSize: '1rem',
      width: 'auto'

    };
  }
}
// width         :props.isCenter? '100%':'auto',
// left          :props.isCenter? '50%':0,
// top           :props.isCenter? '0%':0,
// transform     :props.isCenter? 'translate(-50%, 0)':0 ,
);

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
          lineNumber: 114
        }
      }, _react2.default.createElement(LogoContainer, (0, _extends3.default)({}, this.props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        }
      }), _react2.default.createElement(LogoZAI, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        }
      }, 'ZAI'), _react2.default.createElement(LogoRight, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        }
      }, _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        }
      }, 'Zhong Art'), _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        }
      }, 'Internazionale'))));
    }
  }]);

  return Logo;
}(_react.Component);

exports.default = Logo;

//  const Logo = ()=>(
//     <div>
//       <LogoContainer>
//         <LogoZAI>{'ZAI'}</LogoZAI>
//         <LogoRight>
//         <div>{'Zhong Art'}</div>
//         <div>{'Internazionale'}</div>
//       </LogoRight>
//       </LogoContainer>
//     </div>
// );