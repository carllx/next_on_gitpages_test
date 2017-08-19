'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TT = TT;

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

var _Progress = require('../utils/Progress');

var _Progress2 = _interopRequireDefault(_Progress);

var _logo = require('./logo');

var _logo2 = _interopRequireDefault(_logo);

var _ui = require('../utils/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'E:\\data\\working\\Sito\\Pages chengcestudio nextjs_pages\\components\\img.js';
// import glamorous,{withTheme} from 'glamorous'

// import fetch from 'isomorphic-fetch'
//
var theme = {
  main: { color: 'red' }
};

var TitleT = _glamorous2.default.h1({
  fontSize: '5rem'
}, function (_ref) {
  var theme = _ref.theme;
  return {
    color: theme.main.color
  };
});

function TT() {
  return _react2.default.createElement(_glamorous.ThemeProvider, { theme: theme, __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }, _react2.default.createElement(TitleT, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }, 'Hello!'));
}

var _IMG = _glamorous2.default.div({
  justifyContent: 'space-around',
  backgroundColor: '#3b444f',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  overflow: 'hidden'

}, function (props) {
  return {
    // isLandscape  --或 居中
    width: props.w ? '' + props.w : '100%',
    height: props.h ? '' + props.h : '100%',
    //在这里找渐变模板 https: //webgradients.com/
    backgroundImage: props.src ? 'url(' + props.src + ')' : 'linear-gradient(to right, #d7d2cc 0%, #304352 100%)'
  };
});

var _BG_IMG = _glamorous2.default.div({
  // fontSize:           '0.3rem',
  zIndex: 1,
  display: 'flex',
  // flexDirection:    'row',
  // alignItems:       'center',
  justifyContent: 'space-around',
  backgroundColor: '#3b444f',
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
    //在这里找渐变模板 https: //webgradients.com/
    backgroundImage: props.src ? 'url(' + props.src + ')' : 'linear-gradient(to right, #d7d2cc 0%, #304352 100%)'
  };
});

var Loading = _glamorous2.default.div({

  fontWeight: 400,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  backgroundColor: 'rgba(0,0,0,.15)',
  width: '100%',
  height: '100%'

}, function (props) {
  return {
    fontSize: props.size ? props.size : '0.4em',
    color: props.color ? props.color : _ui.ui.color.secondary_on_dark
  };
});

var IMG = function (_Component) {
  (0, _inherits3.default)(IMG, _Component);

  function IMG(props) {
    (0, _classCallCheck3.default)(this, IMG);

    //url
    var _this = (0, _possibleConstructorReturn3.default)(this, (IMG.__proto__ || (0, _getPrototypeOf2.default)(IMG)).call(this, props));

    _this.onProgress = function (xhr) {
      if (xhr.lengthComputable) {
        // false的话total返回是0 ,github 上 json , js , txt
        var percentComplete = Math.round(xhr.loaded / xhr.total * 100);
        console.log(percentComplete, '%');
        _this.setState({ per: percentComplete + '%' });
      } else {
        console.log('@onProgress 该资源无法计算byte长度');
      }
    };

    _this.state = { //onload active
      active: _this.props.active,
      onload: _this.props.onload,
      per: '0%'
    };
    return _this;
  }

  (0, _createClass3.default)(IMG, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.fethImg();
    }
  }, {
    key: 'fethImg',

    /**
     * http://res.cloudinary.com/responsivebreakpoints/image/upload/
     * c_crop,
     * h_403,
     * w_200
     * /v1502792912/00_Tempio_Malatestiano_gwfwy4.jpg
     */
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var h, w, src, XHR, isOk;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                h = window.innerHeight;
                w = window.innerWidth;
                src = 'http://res.cloudinary.com/responsivebreakpoints/image/upload/' + 'c_crop,' + ('h_' + h + ',') + ('w_' + w + '/') + ('' + this.props.org);
                // const response = await fetch( src )
                //     .then(res => ProgressWithFetch(res.body.getReader()));
                // const isOk = await response.ok;
                // hi pixel pic
                // `http://cdn.wallpapersafari.com/23/11/clBNRq.jpg`

                XHR = new _Progress2.default();

                XHR.onProgress = this.onProgress;
                _context.next = 7;
                return XHR.send(src);

              case 7:
                isOk = _context.sent;

                if (isOk == true) this.setState({ onload: true });
                this.setState({ src: src });
                this.setState({ w: w });
                this.setState({ h: h });

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fethImg() {
        return _ref2.apply(this, arguments);
      }

      return fethImg;
    }()
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 145
        }
      }, _react2.default.createElement(_BG_IMG, {
        w: this.state.w,
        h: this.state.h
        // active={this.state.onload}
        , src: this.state.src,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        }
      }, _react2.default.createElement(Loading
      // w={this.state.w}
      // h={this.state.h}
      // onload={this.state.onload}

      , {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 152
        }
      }, !this.state.onload ? this.state.per : 'WE \'RECOMMING..')), _react2.default.createElement(TT, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161
        }
      }));
    }
  }]);

  return IMG;
}(_react.Component);

exports.default = IMG;