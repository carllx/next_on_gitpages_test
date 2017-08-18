webpackHotUpdate(5,{

/***/ 576:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(68);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(33);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(69);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(70);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(30);

var _react2 = _interopRequireDefault(_react);

var _head = __webpack_require__(513);

var _head2 = _interopRequireDefault(_head);

var _isomorphicFetch = __webpack_require__(577);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _glamor = __webpack_require__(541);

var _glamorous = __webpack_require__(566);

var _glamorous2 = _interopRequireDefault(_glamorous);

var _reactNoSsr = __webpack_require__(579);

var _reactNoSsr2 = _interopRequireDefault(_reactNoSsr);

var _post = __webpack_require__(581);

var _post2 = _interopRequireDefault(_post);

var _nav = __webpack_require__(593);

var _nav2 = _interopRequireDefault(_nav);

var _img = __webpack_require__(594);

var _img2 = _interopRequireDefault(_img);

var _logo = __webpack_require__(570);

var _logo2 = _interopRequireDefault(_logo);

var _device = __webpack_require__(595);

var _throttle = __webpack_require__(596);

var _ui = __webpack_require__(568);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'E:\\data\\working\\Sito\\Pages chengcestudio nextjs_pages\\pages\\index.js?entry';


/**
 * [fontSize description]
 * @type {String}
 */
_glamor.css.global('html, body', {
  fontSize: '100%',
  color: _ui.ui.color.secondary_on_light
});
/**
 * [color description]
 * @type {[type]}
 */
_glamor.css.global('h1,h2,h3', {
  color: _ui.ui.color.primary_on_light
});

var _class = function (_Component) {
  (0, _inherits3.default)(_class, _Component);

  function _class(props) {
    (0, _classCallCheck3.default)(this, _class);

    var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, props));

    _this.handleScroll = function () {

      var ScrollY = window.scrollY;
      //  ↑ or ↓ ???
      var isScrollUp = ScrollY - _this.prevScrollY <= 0;

      if (isScrollUp) {
        console.log('↑');
      } else {
        console.log('↓');
      }
      // 刷新当前scroll所在位置
      _this.prevScrollY = ScrollY;
    };

    _this.handleReSize = function () {

      _this.setState({ h: window.innerHeight });
      _this.setState({ w: window.innerWidth });
      console.log('resize!');
    };

    _this.state = {
      /*
      device   : desktop / moblie / tablet    --2.
      direction: portrait / landscape
      OS       : android / ios / windows / blackberry   --1.
      browser  : chrome /  firefox / safari / IE / wechat /
      language : cn / en / it
      */
      device: '',
      isLandscape: '',
      language: '',
      h: '',
      w: ''

    };
    _this.onScorll = (0, _throttle.debounce)(_this.handleScroll, 500);
    _this.onReSize = (0, _throttle.debounce)(_this.handleReSize, 500);

    return _this;
  }

  // static async getInitialProps () {

  //   // fetch list of posts
  //   // 只支持外部文件url请求
  //   const response = await fetch('http://jsonplaceholder.typicode.com/posts?_page=1')
  //   const postList = await response.json();
  //   return { postList }


  // };


  (0, _createClass3.default)(_class, [{
    key: 'getInitialState',
    value: function getInitialState() {

      if (typeof window != 'undefined') {
        return { h: window.innerHeight };
      } else {
        return { name: 'Mary' };
      }
    }
    // shouldComponentUpdate(){
    //   return false
    // }

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {

      if (typeof window == 'undefined') return;

      (0, _device.setREM)();
      console.log(this.state.h);
      window.removeEventListener('scroll', this.onScorll, false);
      window.removeEventListener('resize', this.onReSize);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log(this.state.h);
      window.addEventListener('scroll', this.onScorll, false);
      window.addEventListener('resize', this.onReSize);

      // SCROLL
      this.prevScrollY = window.scrollY;

      // 检测移动硬件
      if (typeof navigator !== 'undefined') {

        // device
        if ((0, _device.isMobile)() == true) {
          //isMobile
          this.setState({ device: 'isMobile' });
        } else if ((0, _device.isTablet)() == true) {
          this.setState({ device: 'isTablet' });
        } else {
          this.setState({ device: 'isDesktop' });
        };
        // direction
        this.setState({ isLandscape: (0, _device.isLandscape)() ? true : false });
        // language
        this.setState({ language: (0, _device.getLanguer)() });

        // height width
        this.setState({ h: window.innerHeight });
        this.setState({ w: window.innerWidth });
      } else {
        // console.log(this.state)
      }

      console.log('方向:   ', window.screen.orientation, '\n高度: ', window.innerHeight, '\n宽度: ', window.innerWidth);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('main', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 175
        }
      }, _react2.default.createElement(_head2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 176
        }
      }, _react2.default.createElement('title', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 177
        }
      }, '\u4E2D\u827A\u56FD\u9645')), _react2.default.createElement(_reactNoSsr2.default, { onSSR: _react2.default.createElement('h2', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 179
          }
        }, '\u4E2D\u827A\u56FD\u9645'), __source: {
          fileName: _jsxFileName,
          lineNumber: 179
        }
      }, _react2.default.createElement('section', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 180
        }
      }, _react2.default.createElement(_logo2.default, {
        device: this.state.device,
        isLandscape: this.state.isLandscape,
        color: _ui.ui.color.primary_on_dark,
        bg_color: _ui.ui.color.secondary,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 181
        }
      }))), _react2.default.createElement(_reactNoSsr2.default, { onSSR: _react2.default.createElement('h2', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 189
          }
        }, '\u4E2D\u827A\u56FD\u9645'), __source: {
          fileName: _jsxFileName,
          lineNumber: 189
        }
      }, _react2.default.createElement(_nav2.default, { device: this.state.device, isLandscape: this.state.isLandscape, language: this.state.language, __source: {
          fileName: _jsxFileName,
          lineNumber: 190
        }
      })), _react2.default.createElement(_img2.default, {
        w: this.state.w,
        h: this.state.h,
        org: 'v1502792912/00_Tempio_Malatestiano_gwfwy4.jpg',
        active: 'true', __source: {
          fileName: _jsxFileName,
          lineNumber: 194
        }
      }), _react2.default.createElement('content', { onScroll: this.handleScroll, __source: {
          fileName: _jsxFileName,
          lineNumber: 200
        }
      }, _react2.default.createElement(_glamorous2.default.Div, { fontSize: '0.25rem', margin: '10em 0.8em 0 0.8em', __source: {
          fileName: _jsxFileName,
          lineNumber: 201
        }
      }, _react2.default.createElement(_glamorous2.default.Div, { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '38em', __source: {
          fileName: _jsxFileName,
          lineNumber: 202
        }
      }, 'We are comming...'), _react2.default.createElement('h2', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 203
        }
      }, '\u8BBE\u8BA1\u7279\u8272'), _react2.default.createElement(_glamorous2.default.Span, { color: '#717171', __source: {
          fileName: _jsxFileName,
          lineNumber: 204
        }
      }, '\u66F4\u65B0\u4E8E2017-8-16'), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 205
        }
      }, 'Z + AI'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 206
        }
      }, '\n              ZAI is alive, \u6BCF\u4E2A\u7F51\u9875\u5143\u7D20 (\u4F8B\u5982"\u6309\u94AE,\u56FE\u7247\u5361,\u5BFC\u822A\u680F,Logo"), \u5206\u522B\u89C6\u4E3A\u6709\u751F\u547D\u7684\u72EC\u7ACB\u5143\u7D20. \u5B83\u4EEC\u4E0D\u53EA\u662F\u5B58\u5728, \u66F4\u662F\u6D3B\u7740\u7684.\n\n              Z + AI \u7684\u5B9E\u73B0\u601D\u8DEF\u662F\u4E3A\u5143\u7D20\u6CE8\u5165AI\u7279\u6027,\u5F3A\u5316\u6BCF\u4E2A\u5143\u7D20\u5404\u81EA\u7684\u4E2A\u6027,\u6539\u8FDB\u4E0E\u7528\u6237\u4EA4\u4E92\u7684\u53CD\u5E94.\n              \r\n\u8BE5\u7279\u6027\u662F\u6211\u4EEC\u7684\u957F\u671F\u76EE\u6807,\u5C06\u5728\u7F51\u7AD9\u7B2C\u4E8C\u671F\u5DE5\u7A0B\u7531ZAI\u56E2\u961F\u5171\u540C\u8BBE\u8BA1.'), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 211
        }
      }, 'NULL DESIGN'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 212
        }
      }, '\u7EB8\u5F20\u7684\u7A7A\u80FD\u53EC\u5524\u521B\u9020\u8005\u7684\u7075\u611F,\u5F53\u5B83\u8F7D\u6EE1\u7075\u611F\u7684\u65F6\u5019\u4E5F\u662F\u4ED6\u6700\u6709\u4EF7\u503C\u7684, \u56E0\u6B64\u6211\u4EEC\u7F51\u7AD9\u8BBE\u8BA1\u5C06\u7279\u522B\u5173\u6CE8\u7A7A\u767D\u7684\u5730\u65B9'), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 214
        }
      }, '\u611F\u5E94\u5F0F\u5E03\u5C40'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 215
        }
      }, '\u6211\u4EEC\u5173\u5FC3\u4F60\u4F1A\u5728\u4EC0\u4E48\u573A\u5408,\u4F7F\u7528\u4EC0\u4E48\u65B0\u8BBE\u5907\u8BBF\u95EE\u6211\u4EEC, \u4E0D\u8BBA\u4F60\u4EEC\u5728\u4F7F\u7528\u7535\u8111 / \u624B\u673A / \u5E73\u677F / \u7F51\u7EDCTV,\n              \u6216\u8005\u4F60\u7684\u8BBE\u590790\u5EA6/180\u5EA6,\u6211\u4EEC\u90FD\u4F1A\u8003\u8651\u5230,\u6211\u4EEC\u4F1A\u5206\u522B\u4E3A\u4F60\u5B9A\u4E49\u4E0D\u4E00\u6837\u7684\u7F51\u9875\u5E03\u5C40\n              '), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 219
        }
      }, '\u6D41\u91CF\u8282\u7EA6'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 220
        }
      }, '\u6211\u4EEC\u77E5\u9053\u4F60\u4EEC\u7684\u8BBF\u95EE\u662F\u6709\u4EE3\u4EF7, \u6240\u4EE5\u6211\u4EEC\u5728\u8BBE\u8BA1\u4E00\u5957\u6D41\u91CF\u8282\u5236\u7CFB\u7EDF,\n              \u4F8B\u5982\u5F53\u4F60\u7684\u8BBF\u95EE\u6D89\u53CA\u56FE\u7247\u5185\u5BB9\u65F6,\u6211\u4EEC\u4F1A\u5148\u6839\u636E\u4F60\u7684\u8BBE\u5907\u5148\u5B9A\u5236\u5408\u9002\u7684\u50CF\u7D20,\u518D\u53D1\u9001\u5230\u4F60\u7684\u8BBE\u5907\u4E0A.\n              \u4F60\u5C4F\u5E55\u4EE5\u5916\u7684\u56FE\u7247,\u6211\u4EEC\u662F\u4E0D\u4F1A\u8BA9\u5B83\u5360\u7528\u4F60\u4EEC\u7684\u6D41\u91CF,\u5C3D\u7BA1\u5B83\u5C31\u5728\u4E00\u4E2A\u9875\u9762\u5185,\n              \u5B83\u4EEC\u53EA\u6709\u5728\u4F60\u9700\u8981\u7684\u65F6\u5019\u6211\u4EEC\u624D\u4F1A\u4F20\u9001\u7ED9\u4F60.'), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 224
        }
      }, '\u786C\u4EF6\u68C0\u6D4B'), _react2.default.createElement('span', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 225
        }
      }, '\u4E3A\u611F\u5E94\u5F0F\u5E03\u5C40,\u6839\u636E\u7528\u6237\u8BBF\u95EE\u8BBE\u5907,\u7535\u8111 / \u624B\u673A / \u5E73\u677F ,\u53CA\u8FD9\u4E9B\u8BBE\u5907\u7684\u6A2A\u5C4F\u548C\u7AD6\u5C4F\u5B9A\u4E49\u5408\u9002\u7684\u7F51\u9875\u5E03\u5C40,'), _react2.default.createElement('span', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 226
        }
      }, '\u8BC6\u522B\u4F60\u7684\u8BBE\u5907\u662F ', _react2.default.createElement(_glamorous2.default.Span, { color: '#d14', __source: {
          fileName: _jsxFileName,
          lineNumber: 226
        }
      })), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 227
        }
      }, 'ZAI further away(\u6E10\u884C\u6E10\u8FDC)'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 228
        }
      }, '\u6211\u4EEC\u975E\u5E38\u5728\u4E4E\u4F60\u672A\u6765\u7684\u6D4F\u89C8\u65B9\u5F0F,\u5BF9\u5DF2\u7ECF\u6210\u4E3A\u4E3B\u6D41\u7684\u6280\u672F/\u65B9\u5F0F, \u6211\u4EEC\u4F1A\u4E0D\u60DC\u8FDB\u884C\u6539\u9020,\u5C31\u5982\u6211\u4EEC\u4E0D\u4F1A\u4E3A\u6C42\u9009\u7528\u5DF2\u7ECF\u53D1\u5C55\u6210\u719F\u7684\n              wordpress\u6846\u67B6\u5236\u4F5C\u6211\u4EEC\u7684\u7F51\u7AD9,\u5C3D\u7BA1\u5B83\u66F4\u7B80\u5355\u548C\u66F4\u6709\u6548\u7387. \u6211\u4EEC\u5206\u6790\u672A\u6765\u8D8B\u5411,\u4E0D\u60DC\u82B1\u8D39\u5927\u91CF\u7684\u5B66\u4E60/\u6392\u9519\u6210\u672C,\n              \u63A2\u7D222017+\u6700\u65B0\u7684\u6846\u67B6\u548C\u5F00\u53D1\u8BED\u8A00, \u6240\u4EE5\u6211\u4EEC\u53EF\u4EE5\u4E0D\u65AD\u4E3A\u4F60\u63D0\u4F9B\u6700\u65B0\u7684\u670D\u52A1\u548C\u66F4\u591A\u7684\u53EF\u80FD\u6027'), _react2.default.createElement('h2', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 232
        }
      }, 'Change Log \u7F51\u7AD9\u8FDB\u5EA6'), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 236
        }
      }, '2017-8-16'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 237
        }
      }, '\u628A\u9879\u76EE\u6258\u7BA1\u81F3git'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 238
        }
      }, '\u5C1D\u8BD5\u4FEE\u590Dgit log\u4E2D\u6587\u73B0\u5B9E\u95EE\u9898'), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 240
        }
      }, '2017-8-11'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 241
        }
      }, '\u5F00\u59CBdpr\u68C0\u6D4B\u811A\u672C, \u4E3Aiphone,mac\u7B49\u82F9\u679C\u7684 retina\u5C4F\u5E55\u5339\u914D, '), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 242
        }
      }, '\u811A\u672C\u5C1D\u8BD5\u52A0\u5165\u6839\u636Edpr,\u81EA\u52A8\u5B9A\u4E49fontsize\u7684\u903B\u8F91,\u4E3A\u5B9E\u73B0\u4EE5rem\u548Cem\u5B57\u4F53\u5355\u4F4D\u5B9A\u4E49\u6392\u7248'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 243
        }
      }), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 245
        }
      }, '2017-8-15'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 246
        }
      }, '\u8BD5\u7528\u6784\u5EFA\u56FE\u7247\u81EA\u52A8\u88C1\u526A\u7CFB\u7EDF,\u4E8E\u670D\u52A1\u5668\u4E2D'), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 249
        }
      }, '2017-8-14'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 250
        }
      }, '\u89C4\u8303\u5316\u7F51\u7AD9\u989C\u8272,\u5206\u4E3APrimary,Secondary,\u5B57\u4F53\u5206\u522B\u5728\u6DF1/\u6D45\u989C\u8272\u80CC\u666F\u5404\u5B9A\u4E49\u4E09\u7EA7\u900F\u660E\u5EA689%,55%30%'), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 253
        }
      }, '2017-8-13'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 254
        }
      }, '\u5C1D\u8BD5\u8C03\u8BD5\u5FAE\u4FE1\u7AEF\u4E0D\u652F\u6301Object.assign(\u672A\u89E3\u51B3)'), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 258
        }
      }, '2017-8-12'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 259
        }
      }, '\u4FEE\u590DLink\u4E0D\u80FD\u8DF3\u8F6C\u5230\u6307\u5B9A\u7F51\u9875\u7684\u95EE\u9898'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 260
        }
      }, 'dpr\u68C0\u6D4B\u811A\u672C\u5B8C\u6210'), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 263
        }
      }, '2017-8-10'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 264
        }
      }, '\u53C2\u8003Aframe\u6846\u67B6,device.js \u5C06\u539F\u6765\u7684\u51FD\u6570\u5F0F\u65B9\u7A0B\u91CD\u65B0\u6539\u5199\u6210\u7EC4\u5EFA\u7BA1\u7406\u6A21\u5F0F'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 265
        }
      }, '\u5FFD\u7565\u539F\u6765\u5BF9TV\u7684\u8BC6\u522B(\u6682\u65F6\u4E0D\u9700\u8981) '), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 266
        }
      }), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 268
        }
      }, '2017-8-9'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 269
        }
      }, '\u4FEE\u590DNav \u7EC4\u4EF6, \u7528glamorous\u5BF9Nav\u505A\u521D\u6B65\u6837\u5F0F '), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 270
        }
      }), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 271
        }
      }), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 274
        }
      }, '2017-8-8'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 275
        }
      }, '\u5F15\u5165device.js \u786C\u4EF6\u68C0\u6D4B\u811A\u672C'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 276
        }
      }, '/\u827A\u672F\u5BB6 carta\u7EC4\u4EF6\u6837\u5F0F\u6539\u52A8'), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 279
        }
      }, 'Sat Jul 29 00:21:57 2017 +0200'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 280
        }
      }, '\u6DFB\u52A0.nojekyll,\u5C1D\u8BD5\u4FEE\u590Djs\u8BF7\u6C42\u5931\u8D25'), _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 281
        }
      }, 'Tue Jul 25 12:42:45 2017 +0200'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 282
        }
      }, '\u7B2C\u4E00\u6B21\u9012\u4EA4'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 283
        }
      }))));
    }
  }]);

  return _class;
}(_react.Component);

//<section>
//  {this.props.postList.map(post => <Post {...post} key={post.id} />)}
//</section>


exports.default = _class;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "E:\\data\\working\\Sito\\Pages chengcestudio nextjs_pages\\pages\\index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\data\\working\\Sito\\Pages chengcestudio nextjs_pages\\pages\\index.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(98)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS40NzI1YTg0N2E1MzcyNzI5MGEwMS5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXM/NWZmYzVmYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCdcbmltcG9ydCBmZXRjaCBmcm9tICdpc29tb3JwaGljLWZldGNoJ1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJ1xuaW1wb3J0IGdsYW1vcm91cyBmcm9tICdnbGFtb3JvdXMnXG5pbXBvcnQgTm9TU1IgZnJvbSAncmVhY3Qtbm8tc3NyJztcblxuaW1wb3J0IFBvc3QgZnJvbSAnLi4vY29tcG9uZW50cy9wb3N0J1xuaW1wb3J0IE5hdiBmcm9tICcuLi9jb21wb25lbnRzL25hdidcbmltcG9ydCBJTUcgZnJvbSAnLi4vY29tcG9uZW50cy9pbWcnXG5pbXBvcnQgTG9nbyBmcm9tICcuLi9jb21wb25lbnRzL2xvZ28nXG5cbmltcG9ydCB7aXNNb2JpbGUgICxpc1RhYmxldCAsIGlzTGFuZHNjYXBlLCBnZXRMYW5ndWVyLCBzZXRSRU0gfSAgZnJvbSAnLi4vdXRpbHMvZGV2aWNlJ1xuaW1wb3J0IHt0aHJvdHRsZSwgZGVib3VuY2V9ICBmcm9tICcuLi91dGlscy90aHJvdHRsZSdcblxuaW1wb3J0IHt1aX0gIGZyb20gJy4uL3V0aWxzL3VpJ1xuXG4vKipcbiAqIFtmb250U2l6ZSBkZXNjcmlwdGlvbl1cbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbmNzcy5nbG9iYWwoXG5cbiAgJ2h0bWwsIGJvZHknLCB7XG4gICAgZm9udFNpemU6ICcxMDAlJyxcbiAgICBjb2xvcjp1aS5jb2xvci5zZWNvbmRhcnlfb25fbGlnaHQsXG4gIH0sXG4pXG4vKipcbiAqIFtjb2xvciBkZXNjcmlwdGlvbl1cbiAqIEB0eXBlIHtbdHlwZV19XG4gKi9cbmNzcy5nbG9iYWwoXG5cbiAgJ2gxLGgyLGgzJyx7XG4gICAgY29sb3I6dWkuY29sb3IucHJpbWFyeV9vbl9saWdodCxcbiAgfVxuKVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgICAgc3VwZXIocHJvcHMpXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAvKlxuICAgICAgICBkZXZpY2UgICA6IGRlc2t0b3AgLyBtb2JsaWUgLyB0YWJsZXQgICAgLS0yLlxuICAgICAgICBkaXJlY3Rpb246IHBvcnRyYWl0IC8gbGFuZHNjYXBlXG4gICAgICAgIE9TICAgICAgIDogYW5kcm9pZCAvIGlvcyAvIHdpbmRvd3MgLyBibGFja2JlcnJ5ICAgLS0xLlxuICAgICAgICBicm93c2VyICA6IGNocm9tZSAvICBmaXJlZm94IC8gc2FmYXJpIC8gSUUgLyB3ZWNoYXQgL1xuICAgICAgICBsYW5ndWFnZSA6IGNuIC8gZW4gLyBpdFxuICAgICAgICAqL1xuICAgICAgICBkZXZpY2U6ICcnLFxuICAgICAgICBpc0xhbmRzY2FwZTogJycsXG4gICAgICAgIGxhbmd1YWdlOiAnJyxcbiAgICAgICAgaDonJyxcbiAgICAgICAgdzonJyxcblxuICAgICAgIH1cbiAgICAgICB0aGlzLm9uU2NvcmxsID0gZGVib3VuY2UodGhpcy5oYW5kbGVTY3JvbGwgLDUwMCApO1xuICAgICAgIHRoaXMub25SZVNpemUgPSBkZWJvdW5jZSh0aGlzLmhhbmRsZVJlU2l6ZSAsNTAwICk7XG5cblxuICAgIH1cblxuICAvLyBzdGF0aWMgYXN5bmMgZ2V0SW5pdGlhbFByb3BzICgpIHtcblxuICAvLyAgIC8vIGZldGNoIGxpc3Qgb2YgcG9zdHNcbiAgLy8gICAvLyDlj6rmlK/mjIHlpJbpg6jmlofku7Z1cmzor7fmsYJcbiAgLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vanNvbnBsYWNlaG9sZGVyLnR5cGljb2RlLmNvbS9wb3N0cz9fcGFnZT0xJylcbiAgLy8gICBjb25zdCBwb3N0TGlzdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgLy8gICByZXR1cm4geyBwb3N0TGlzdCB9XG5cblxuXG4gIC8vIH07XG4gIGdldEluaXRpYWxTdGF0ZSgpe1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB7IGg6IHdpbmRvdy5pbm5lckhlaWdodCB9XG4gICAgfWVsc2V7XG4gICAgICByZXR1cm4ge25hbWU6ICdNYXJ5J31cbiAgICB9XG5cbiAgfVxuICAvLyBzaG91bGRDb21wb25lbnRVcGRhdGUoKXtcbiAgLy8gICByZXR1cm4gZmFsc2VcbiAgLy8gfVxuICBoYW5kbGVTY3JvbGw9KCk9PntcblxuICAgIGNvbnN0IFNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAvLyAg4oaRIG9yIOKGkyA/Pz9cbiAgICBjb25zdCBpc1Njcm9sbFVwID0gKCBTY3JvbGxZIC0gdGhpcy5wcmV2U2Nyb2xsWSk8PTAgO1xuXG4gICAgaWYoaXNTY3JvbGxVcCkge1xuICAgICAgY29uc29sZS5sb2coJ+KGkScpO1xuICAgIH1lbHNle1xuICAgICAgY29uc29sZS5sb2coJ+KGkycpO1xuICAgIH1cbiAgICAvLyDliLfmlrDlvZPliY1zY3JvbGzmiYDlnKjkvY3nva5cbiAgICB0aGlzLnByZXZTY3JvbGxZID0gU2Nyb2xsWTtcblxuICAgfVxuXG4gIGhhbmRsZVJlU2l6ZT0oKT0+e1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7aCA6IHdpbmRvdy5pbm5lckhlaWdodH0pXG4gICAgdGhpcy5zZXRTdGF0ZSh7dyA6IHdpbmRvdy5pbm5lcldpZHRofSlcbiAgICBjb25zb2xlLmxvZygncmVzaXplIScpXG5cbiAgfVxuXG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCl7XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgc2V0UkVNKCk7XG4gICAgY29uc29sZS5sb2codGhpcy5zdGF0ZS5oKVxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2NvcmxsLCBmYWxzZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZVNpemUpO1xuXG4gIH1cblxuXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLmgpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY29ybGwsIGZhbHNlKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVTaXplICk7XG5cbiAgICAvLyBTQ1JPTExcbiAgICB0aGlzLnByZXZTY3JvbGxZID0gd2luZG93LnNjcm9sbFk7XG5cblxuXG4gICAgLy8g5qOA5rWL56e75Yqo56Gs5Lu2XG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgIC8vIGRldmljZVxuICAgICAgaWYoaXNNb2JpbGUoKT09dHJ1ZSl7Ly9pc01vYmlsZVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtkZXZpY2UgOiAnaXNNb2JpbGUnfSlcbiAgICAgIH1lbHNlIGlmIChpc1RhYmxldCgpPT10cnVlKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGV2aWNlIDogJ2lzVGFibGV0J30pXG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGV2aWNlIDogJ2lzRGVza3RvcCd9KVxuICAgICAgfTtcbiAgICAgIC8vIGRpcmVjdGlvblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNMYW5kc2NhcGUgOiAoaXNMYW5kc2NhcGUoKT90cnVlOmZhbHNlKSB9KVxuICAgICAgLy8gbGFuZ3VhZ2VcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2xhbmd1YWdlIDogZ2V0TGFuZ3VlcigpfSlcblxuICAgICAgLy8gaGVpZ2h0IHdpZHRoXG4gICAgICB0aGlzLnNldFN0YXRlKHtoIDogd2luZG93LmlubmVySGVpZ2h0fSlcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3cgOiB3aW5kb3cuaW5uZXJXaWR0aH0pXG5cblxuXG4gICAgfWVsc2V7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKVxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgJ+aWueWQkTogICAnLHdpbmRvdy5zY3JlZW4ub3JpZW50YXRpb24sXG4gICAgICAgICAgICAgICAgICAnXFxu6auY5bqmOiAnLHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgICAgICAgICAgICdcXG7lrr3luqY6ICcsd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgICAgICAgICAgICk7XG5cbiAgfVxuXG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPG1haW4gPlxuICAgICAgICA8SGVhZD5cbiAgICAgICAgICA8dGl0bGU+5Lit6Im65Zu96ZmFPC90aXRsZT5cbiAgICAgICAgPC9IZWFkPlxuICAgICAgICA8Tm9TU1Igb25TU1I9ezxoMj7kuK3oibrlm73pmYU8L2gyPn0+XG4gICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICA8TG9nb1xuICAgICAgICAgZGV2aWNlPXt0aGlzLnN0YXRlLmRldmljZX1cbiAgICAgICAgIGlzTGFuZHNjYXBlID0ge3RoaXMuc3RhdGUuaXNMYW5kc2NhcGV9XG4gICAgICAgICBjb2xvcj17dWkuY29sb3IucHJpbWFyeV9vbl9kYXJrfVxuICAgICAgICAgYmdfY29sb3I9e3VpLmNvbG9yLnNlY29uZGFyeX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgPC9Ob1NTUj5cbiAgICAgICAgPE5vU1NSIG9uU1NSPXs8aDI+5Lit6Im65Zu96ZmFPC9oMj59PlxuICAgICAgICAgIDxOYXYgZGV2aWNlPSB7dGhpcy5zdGF0ZS5kZXZpY2V9IGlzTGFuZHNjYXBlPXt0aGlzLnN0YXRlLmlzTGFuZHNjYXBlfSBsYW5ndWFnZT0ge3RoaXMuc3RhdGUubGFuZ3VhZ2V9Lz5cbiAgICAgICAgPC9Ob1NTUj5cblxuXG4gICAgICAgIDxJTUdcbiAgICAgICAgIHc9e3RoaXMuc3RhdGUud31cbiAgICAgICAgIGg9e3RoaXMuc3RhdGUuaH1cbiAgICAgICAgIG9yZz17J3YxNTAyNzkyOTEyLzAwX1RlbXBpb19NYWxhdGVzdGlhbm9fZ3dmd3k0LmpwZyd9XG4gICAgICAgICBhY3RpdmU9eyd0cnVlJ30vPlxuXG4gICAgICAgIDxjb250ZW50IG9uU2Nyb2xsPXt0aGlzLmhhbmRsZVNjcm9sbH0+XG4gICAgICAgICAgPGdsYW1vcm91cy5EaXYgZm9udFNpemU9JzAuMjVyZW0nIG1hcmdpbj0nMTBlbSAwLjhlbSAwIDAuOGVtJz5cbiAgICAgICAgICAgIDxnbGFtb3JvdXMuRGl2IGRpc3BsYXk9J2ZsZXgnIGFsaWduSXRlbXM9J2NlbnRlcicganVzdGlmeUNvbnRlbnQ9J2NlbnRlcicgd2lkdGg9JzEwMCUnIGhlaWdodD0nMzhlbSc+V2UgYXJlIGNvbW1pbmcuLi48L2dsYW1vcm91cy5EaXY+XG4gICAgICAgICAgICA8aDI+6K6+6K6h54m56ImyPC9oMj5cbiAgICAgICAgICAgIDxnbGFtb3JvdXMuU3BhbiBjb2xvcj0nIzcxNzE3MSc+5pu05paw5LqOMjAxNy04LTE2PC9nbGFtb3JvdXMuU3Bhbj5cbiAgICAgICAgICAgIDxoMz5aICsgQUk8L2gzPlxuICAgICAgICAgICAgPHA+e2BcbiAgICAgICAgICAgICAgWkFJIGlzIGFsaXZlLCDmr4/kuKrnvZHpobXlhYPntKAgKOS+i+Wmglwi5oyJ6ZKuLOWbvueJh+WNoSzlr7zoiKrmoI8sTG9nb1wiKSwg5YiG5Yir6KeG5Li65pyJ55Sf5ZG955qE54us56uL5YWD57SgLiDlroPku6zkuI3lj6rmmK/lrZjlnKgsIOabtOaYr+a0u+edgOeahC5cXG5cbiAgICAgICAgICAgICAgWiArIEFJIOeahOWunueOsOaAnei3r+aYr+S4uuWFg+e0oOazqOWFpUFJ54m55oCnLOW8uuWMluavj+S4quWFg+e0oOWQhOiHqueahOS4quaApyzmlLnov5vkuI7nlKjmiLfkuqTkupLnmoTlj43lupQuXG4gICAgICAgICAgICAgIFxcclxcbuivpeeJueaAp+aYr+aIkeS7rOeahOmVv+acn+ebruaghyzlsIblnKjnvZHnq5nnrKzkuozmnJ/lt6XnqIvnlLFaQUnlm6LpmJ/lhbHlkIzorr7orqEuYH08L3A+XG5cbiAgICAgICAgICAgIDxoMz5OVUxMIERFU0lHTjwvaDM+XG4gICAgICAgICAgICA8cD57YOe6uOW8oOeahOepuuiDveWPrOWUpOWIm+mAoOiAheeahOeBteaEnyzlvZPlroPovb3mu6HngbXmhJ/nmoTml7blgJnkuZ/mmK/ku5bmnIDmnInku7flgLznmoQsIOWboOatpOaIkeS7rOe9keermeiuvuiuoeWwhueJueWIq+WFs+azqOepuueZveeahOWcsOaWuWB9PC9wPlxuXG4gICAgICAgICAgICA8aDM+5oSf5bqU5byP5biD5bGAPC9oMz5cbiAgICAgICAgICAgIDxwPntg5oiR5Lus5YWz5b+D5L2g5Lya5Zyo5LuA5LmI5Zy65ZCILOS9v+eUqOS7gOS5iOaWsOiuvuWkh+iuv+mXruaIkeS7rCwg5LiN6K665L2g5Lus5Zyo5L2/55So55S16ISRIC8g5omL5py6IC8g5bmz5p2/IC8g572R57ucVFYsXG4gICAgICAgICAgICAgIOaIluiAheS9oOeahOiuvuWkhzkw5bqmLzE4MOW6pizmiJHku6zpg73kvJrogIPomZHliLAs5oiR5Lus5Lya5YiG5Yir5Li65L2g5a6a5LmJ5LiN5LiA5qC355qE572R6aG15biD5bGAXG4gICAgICAgICAgICAgIGB9PC9wPlxuXG4gICAgICAgICAgICA8aDM+5rWB6YeP6IqC57qmPC9oMz5cbiAgICAgICAgICAgIDxwPntg5oiR5Lus55+l6YGT5L2g5Lus55qE6K6/6Zeu5piv5pyJ5Luj5Lu3LCDmiYDku6XmiJHku6zlnKjorr7orqHkuIDlpZfmtYHph4/oioLliLbns7vnu58sXG4gICAgICAgICAgICAgIOS+i+WmguW9k+S9oOeahOiuv+mXrua2ieWPiuWbvueJh+WGheWuueaXtizmiJHku6zkvJrlhYjmoLnmja7kvaDnmoTorr7lpIflhYjlrprliLblkIjpgILnmoTlg4/ntKAs5YaN5Y+R6YCB5Yiw5L2g55qE6K6+5aSH5LiKLlxuICAgICAgICAgICAgICDkvaDlsY/luZXku6XlpJbnmoTlm77niYcs5oiR5Lus5piv5LiN5Lya6K6p5a6D5Y2g55So5L2g5Lus55qE5rWB6YePLOWwveeuoeWug+WwseWcqOS4gOS4qumhtemdouWGhSxcbiAgICAgICAgICAgICAg5a6D5Lus5Y+q5pyJ5Zyo5L2g6ZyA6KaB55qE5pe25YCZ5oiR5Lus5omN5Lya5Lyg6YCB57uZ5L2gLmB9PC9wPlxuICAgICAgICAgICAgPGgzPuehrOS7tuajgOa1izwvaDM+XG4gICAgICAgICAgICA8c3Bhbj7kuLrmhJ/lupTlvI/luIPlsYAs5qC55o2u55So5oi36K6/6Zeu6K6+5aSHLOeUteiEkSAvIOaJi+acuiAvIOW5s+advyAs5Y+K6L+Z5Lqb6K6+5aSH55qE5qiq5bGP5ZKM56uW5bGP5a6a5LmJ5ZCI6YCC55qE572R6aG15biD5bGALDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPuivhuWIq+S9oOeahOiuvuWkh+aYryA8Z2xhbW9yb3VzLlNwYW4gY29sb3I9JyNkMTQnPnsgLyp0aGlzLnN0YXRlLmRldmljZSovfTwvZ2xhbW9yb3VzLlNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgPGgzPlpBSSBmdXJ0aGVyIGF3YXko5riQ6KGM5riQ6L+cKTwvaDM+XG4gICAgICAgICAgICA8cD57YOaIkeS7rOmdnuW4uOWcqOS5juS9oOacquadpeeahOa1j+iniOaWueW8jyzlr7nlt7Lnu4/miJDkuLrkuLvmtYHnmoTmioDmnK8v5pa55byPLCDmiJHku6zkvJrkuI3mg5zov5vooYzmlLnpgKAs5bCx5aaC5oiR5Lus5LiN5Lya5Li65rGC6YCJ55So5bey57uP5Y+R5bGV5oiQ54af55qEXG4gICAgICAgICAgICAgIHdvcmRwcmVzc+ahhuaetuWItuS9nOaIkeS7rOeahOe9keermSzlsL3nrqHlroPmm7TnroDljZXlkozmm7TmnInmlYjnjocuIOaIkeS7rOWIhuaekOacquadpei2i+WQkSzkuI3mg5zoirHotLnlpKfph4/nmoTlrabkuaAv5o6S6ZSZ5oiQ5pysLFxuICAgICAgICAgICAgICDmjqLntKIyMDE3K+acgOaWsOeahOahhuaetuWSjOW8gOWPkeivreiogCwg5omA5Lul5oiR5Lus5Y+v5Lul5LiN5pat5Li65L2g5o+Q5L6b5pyA5paw55qE5pyN5Yqh5ZKM5pu05aSa55qE5Y+v6IO95oCnYH08L3A+XG5cbiAgICAgICAgICAgIDxoMj5DaGFuZ2UgTG9nIOe9keermei/m+W6pjwvaDI+XG5cblxuXG4gICAgICAgICAgICA8aDM+MjAxNy04LTE2PC9oMz5cbiAgICAgICAgICAgIDxwPuaKiumhueebruaJmOeuoeiHs2dpdDwvcD5cbiAgICAgICAgICAgIDxwPuWwneivleS/ruWkjWdpdCBsb2fkuK3mlofnjrDlrp7pl67popg8L3A+XG5cbiAgICAgICAgICAgIDxoMz4yMDE3LTgtMTE8L2gzPlxuICAgICAgICAgICAgPHA+5byA5aeLZHBy5qOA5rWL6ISa5pysLCDkuLppcGhvbmUsbWFj562J6Iu55p6c55qEIHJldGluYeWxj+W5leWMuemFjSwgPC9wPlxuICAgICAgICAgICAgPHA+6ISa5pys5bCd6K+V5Yqg5YWl5qC55o2uZHByLOiHquWKqOWumuS5iWZvbnRzaXpl55qE6YC76L6RLOS4uuWunueOsOS7pXJlbeWSjGVt5a2X5L2T5Y2V5L2N5a6a5LmJ5o6S54mIPC9wPlxuICAgICAgICAgICAgPHA+PC9wPlxuXG4gICAgICAgICAgICA8aDM+MjAxNy04LTE1PC9oMz5cbiAgICAgICAgICAgIDxwPuivleeUqOaehOW7uuWbvueJh+iHquWKqOijgeWJquezu+e7nyzkuo7mnI3liqHlmajkuK08L3A+XG5cblxuICAgICAgICAgICAgPGgzPjIwMTctOC0xNDwvaDM+XG4gICAgICAgICAgICA8cD7op4TojIPljJbnvZHnq5npopzoibIs5YiG5Li6UHJpbWFyeSxTZWNvbmRhcnks5a2X5L2T5YiG5Yir5Zyo5rexL+a1heminOiJsuiDjOaZr+WQhOWumuS5ieS4iee6p+mAj+aYjuW6pjg5JSw1NSUzMCU8L3A+XG5cblxuICAgICAgICAgICAgPGgzPjIwMTctOC0xMzwvaDM+XG4gICAgICAgICAgICA8cD7lsJ3or5XosIPor5Xlvq7kv6Hnq6/kuI3mlK/mjIFPYmplY3QuYXNzaWduKOacquino+WGsyk8L3A+XG5cblxuXG4gICAgICAgICAgICA8aDM+MjAxNy04LTEyPC9oMz5cbiAgICAgICAgICAgIDxwPuS/ruWkjUxpbmvkuI3og73ot7PovazliLDmjIflrprnvZHpobXnmoTpl67popg8L3A+XG4gICAgICAgICAgICA8cD5kcHLmo4DmtYvohJrmnKzlrozmiJA8L3A+XG5cblxuICAgICAgICAgICAgPGgzPjIwMTctOC0xMDwvaDM+XG4gICAgICAgICAgICA8cD7lj4LogINBZnJhbWXmoYbmnrYsZGV2aWNlLmpzIOWwhuWOn+adpeeahOWHveaVsOW8j+aWueeoi+mHjeaWsOaUueWGmeaIkOe7hOW7uueuoeeQhuaooeW8jzwvcD5cbiAgICAgICAgICAgIDxwPuW/veeVpeWOn+adpeWvuVRW55qE6K+G5YirKOaaguaXtuS4jemcgOimgSkgPC9wPlxuICAgICAgICAgICAgPHA+PC9wPlxuXG4gICAgICAgICAgICA8aDM+MjAxNy04LTk8L2gzPlxuICAgICAgICAgICAgPHA+5L+u5aSNTmF2IOe7hOS7tiwg55SoZ2xhbW9yb3Vz5a+5TmF25YGa5Yid5q2l5qC35byPIDwvcD5cbiAgICAgICAgICAgIDxwPjwvcD5cbiAgICAgICAgICAgIDxwPjwvcD5cblxuXG4gICAgICAgICAgICA8aDM+MjAxNy04LTg8L2gzPlxuICAgICAgICAgICAgPHA+5byV5YWlZGV2aWNlLmpzIOehrOS7tuajgOa1i+iEmuacrDwvcD5cbiAgICAgICAgICAgIDxwPi/oibrmnK/lrrYgY2FydGHnu4Tku7bmoLflvI/mlLnliqg8L3A+XG5cblxuICAgICAgICAgICAgPGgzPlNhdCBKdWwgMjkgMDA6MjE6NTcgMjAxNyArMDIwMDwvaDM+XG4gICAgICAgICAgICA8cD7mt7vliqAubm9qZWt5bGws5bCd6K+V5L+u5aSNanPor7fmsYLlpLHotKU8L3A+XG4gICAgICAgICAgICA8aDM+VHVlIEp1bCAyNSAxMjo0Mjo0NSAyMDE3ICswMjAwPC9oMz5cbiAgICAgICAgICAgIDxwPuesrOS4gOasoemAkuS6pDwvcD5cbiAgICAgICAgICAgIDxwPjwvcD5cbiAgICAgICAgICA8L2dsYW1vcm91cy5EaXY+XG4gICAgICAgIDwvY29udGVudD5cblxuICAgICAgPC9tYWluPlxuXG4gICAgKVxuICB9XG5cbn1cblxuLy88c2VjdGlvbj5cbi8vICB7dGhpcy5wcm9wcy5wb3N0TGlzdC5tYXAocG9zdCA9PiA8UG9zdCB7Li4ucG9zdH0ga2V5PXtwb3N0LmlkfSAvPil9XG4vLzwvc2VjdGlvbj5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFnZXM/ZW50cnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBQ0E7Ozs7QUFJQTtBQUlBO0FBQUE7QUFEQTtBQUlBOzs7O0FBSUE7QUFHQTtBQUFBO0FBQ0E7O0FBT0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUE0Q0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFFQTtBQUNBO0FBQUE7QUExREE7QUFDQTtBQTZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaEVBO0FBQ0E7QUFEQTtBQVFBOzs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBZkE7QUFjQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7Ozs7OztBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBREE7QUFHQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQTRCQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBOzs7O0FBT0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUlBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBREE7QUFHQTtBQURBO0FBR0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFqQkE7QUF1QkE7QUFFQTtBQUNBO0FBREE7Ozs7QUFVQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFKQTtBQVFBO0FBUkE7QUFDQTs7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFJQTtBQUpBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUpBO0FBTUE7QUFOQTtBQUNBO0FBS0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBS0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBRUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBSUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBSUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFJQTtBQUFBO0FBQUE7QUFBQTs7QUFJQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUVBO0FBRkE7QUFBQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFHQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFHQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFJQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFHQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUVBO0FBRkE7QUFBQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUdBO0FBSEE7QUFBQTs7QUFHQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFHQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQU9BO0FBUEE7QUFBQTs7Ozs7QUFqUEE7QUFDQTtBQTJQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=