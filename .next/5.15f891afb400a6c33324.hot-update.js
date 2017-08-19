webpackHotUpdate(5,{

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(101);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(102);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _link = __webpack_require__(567);

var _link2 = _interopRequireDefault(_link);

var _react = __webpack_require__(30);

var _react2 = _interopRequireDefault(_react);

var _glamor = __webpack_require__(541);

var _glamorous = __webpack_require__(566);

var _glamorous2 = _interopRequireDefault(_glamorous);

var _Progress = __webpack_require__(595);

var _Progress2 = _interopRequireDefault(_Progress);

var _logo = __webpack_require__(570);

var _logo2 = _interopRequireDefault(_logo);

var _ui = __webpack_require__(568);

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
      lineNumber: 24
    }
  }, _react2.default.createElement(TitleT, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
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
          lineNumber: 146
        }
      }, _react2.default.createElement(_BG_IMG, {
        w: this.state.w,
        h: this.state.h
        // active={this.state.onload}
        , src: this.state.src,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 147
        }
      }, _react2.default.createElement(Loading
      // w={this.state.w}
      // h={this.state.h}
      // onload={this.state.onload}

      , {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 153
        }
      }, !this.state.onload ? this.state.per : 'WE \'RECOMMING..')), _react2.default.createElement(TT, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 162
        }
      }));
    }
  }]);

  return IMG;
}(_react.Component);

exports.default = IMG;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "E:\\data\\working\\Sito\\Pages chengcestudio nextjs_pages\\components\\img.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\data\\working\\Sito\\Pages chengcestudio nextjs_pages\\components\\img.js"); } } })();

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS4xNWY4OTFhZmI0MDBhNmMzMzMyNC5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9pbWcuanM/YzUxNGU4MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IHJlaHlkcmF0ZSwgY3NzIH0gZnJvbSAnZ2xhbW9yJ1xyXG4vLyBpbXBvcnQgZ2xhbW9yb3VzLHt3aXRoVGhlbWV9IGZyb20gJ2dsYW1vcm91cydcclxuaW1wb3J0IGdsYW1vcm91cywge1RoZW1lUHJvdmlkZXJ9IGZyb20gJ2dsYW1vcm91cydcclxuaW1wb3J0IFhIUlByb2dyZXNzICBmcm9tICcuLi91dGlscy9Qcm9ncmVzcydcclxuaW1wb3J0IExvZ28gZnJvbSAnLi9sb2dvJ1xyXG5pbXBvcnQge3VpfSAgZnJvbSAnLi4vdXRpbHMvdWknXHJcbi8vIGltcG9ydCBmZXRjaCBmcm9tICdpc29tb3JwaGljLWZldGNoJ1xyXG4vL1xyXG5jb25zdCB0aGVtZSA9IHtcclxuICBtYWluOiB7Y29sb3I6ICdyZWQnfVxyXG59XHJcblxyXG5jb25zdCBUaXRsZVQgPSBnbGFtb3JvdXMuaDEoe1xyXG4gIGZvbnRTaXplOiAnNXJlbSdcclxufSwgKHt0aGVtZX0pID0+ICh7XHJcbiAgY29sb3I6IHRoZW1lLm1haW4uY29sb3JcclxuXHJcbn0pKVxyXG5cclxuZnVuY3Rpb24gVFQoICl7XHJcbiAgcmV0dXJuKFxyXG4gICAgPFRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cclxuICAgICAgPFRpdGxlVD57J0hlbGxvISd9PC9UaXRsZVQ+XHJcbiAgICA8L1RoZW1lUHJvdmlkZXI+XHJcbiAgICApO1xyXG5cclxufVxyXG5cclxuXHJcbmNvbnN0IF9JTUcgID0gZ2xhbW9yb3VzLmRpdih7XHJcbiAganVzdGlmeUNvbnRlbnQ6ICAgJ3NwYWNlLWFyb3VuZCcsXHJcbiAgYmFja2dyb3VuZENvbG9yOiAgJyMzYjQ0NGYnLFxyXG4gIGJhY2tncm91bmRSZXBlYXQ6ICduby1yZXBlYXQnLFxyXG4gIGJhY2tncm91bmRTaXplOiAgICdjb3ZlcicsXHJcbiAgb3ZlcmZsb3c6ICAgICAgICAgJ2hpZGRlbicsXHJcblxyXG59LChwcm9wcyk9Pih7XHJcbiAgLy8gaXNMYW5kc2NhcGUgIC0t5oiWIOWxheS4rVxyXG4gIHdpZHRoOiAgICAgICAgICAgIHByb3BzLnc/YCR7cHJvcHMud31gOicxMDAlJyxcclxuICBoZWlnaHQ6ICAgICAgICAgICBwcm9wcy5oP2Ake3Byb3BzLmh9YDonMTAwJScsXHJcbiAgLy/lnKjov5nph4zmib7muJDlj5jmqKHmnb8gaHR0cHM6IC8vd2ViZ3JhZGllbnRzLmNvbS9cclxuICBiYWNrZ3JvdW5kSW1hZ2U6ICBwcm9wcy5zcmM/YHVybCgke3Byb3BzLnNyY30pYDonbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjZDdkMmNjIDAlLCAjMzA0MzUyIDEwMCUpJyxcclxufSkpXHJcblxyXG5cclxuY29uc3QgX0JHX0lNRyA9IGdsYW1vcm91cy5kaXYoe1xyXG4gIC8vIGZvbnRTaXplOiAgICAgICAgICAgJzAuM3JlbScsXHJcbiAgekluZGV4OiAgICAgICAgICAgMSxcclxuICBkaXNwbGF5OiAgICAgICAgICAnZmxleCcsXHJcbiAgLy8gZmxleERpcmVjdGlvbjogICAgJ3JvdycsXHJcbiAgLy8gYWxpZ25JdGVtczogICAgICAgJ2NlbnRlcicsXHJcbiAganVzdGlmeUNvbnRlbnQ6ICAgJ3NwYWNlLWFyb3VuZCcsXHJcbiAgYmFja2dyb3VuZENvbG9yOiAgJyMzYjQ0NGYnLFxyXG4gIGJhY2tncm91bmRSZXBlYXQ6ICduby1yZXBlYXQnLFxyXG4gIGJhY2tncm91bmRTaXplOiAgICdjb3ZlcicsXHJcbiAgb3ZlcmZsb3c6ICAgICAgICAgJ2hpZGRlbicsXHJcbiAgcG9zaXRpb246ICAgICAgICAgJ2Fic29sdXRlJyxcclxuICBsZWZ0OiAgICAgICAgICAgICAwLFxyXG4gIHRvcDogICAgICAgICAgICAgIDAsXHJcbn0sKHByb3BzKT0+KHtcclxuICAvLyBpc0xhbmRzY2FwZSAgLS3miJYg5bGF5LitXHJcbiAgd2lkdGg6ICAgICAgICAgICAgcHJvcHMudz9gJHtwcm9wcy53fWA6JzEwMCUnLFxyXG4gIGhlaWdodDogICAgICAgICAgIHByb3BzLmg/YCR7cHJvcHMuaH1gOicxMDAlJyxcclxuICAvL+WcqOi/memHjOaJvua4kOWPmOaooeadvyBodHRwczogLy93ZWJncmFkaWVudHMuY29tL1xyXG4gIGJhY2tncm91bmRJbWFnZTogIHByb3BzLnNyYz9gdXJsKCR7cHJvcHMuc3JjfSlgOidsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICNkN2QyY2MgMCUsICMzMDQzNTIgMTAwJSknLFxyXG59KVxyXG4pXHJcblxyXG5cclxuY29uc3QgTG9hZGluZyA9IGdsYW1vcm91cy5kaXYoe1xyXG5cclxuICAgIGZvbnRXZWlnaHQ6ICAgICA0MDAsXHJcbiAgICBmbGV4RGlyZWN0aW9uOiAgJ3JvdycsXHJcbiAgICBhbGlnbkl0ZW1zOiAgICAgJ2NlbnRlcicsXHJcbiAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICBkaXNwbGF5OiAgICAgICAgJ2ZsZXgnLFxyXG4gICAgYmFja2dyb3VuZENvbG9yOidyZ2JhKDAsMCwwLC4xNSknLFxyXG4gICAgd2lkdGg6ICAgICAgICAgICcxMDAlJyxcclxuICAgIGhlaWdodDogICAgICAgICAnMTAwJScsXHJcblxyXG59LChwcm9wcyk9Pih7XHJcbiAgICBmb250U2l6ZTogICAgICAgIHByb3BzLnNpemU/cHJvcHMuc2l6ZTonMC40ZW0nLFxyXG4gICAgY29sb3I6ICAgICAgICAgICBwcm9wcy5jb2xvcj9wcm9wcy5jb2xvcjp1aS5jb2xvci5zZWNvbmRhcnlfb25fZGFyayxcclxufSlcclxuKVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElNRyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcclxuICAgICAgc3VwZXIocHJvcHMpOyAvL3VybFxyXG4gICAgICB0aGlzLnN0YXRlID0gey8vb25sb2FkIGFjdGl2ZVxyXG4gICAgICAgICAgYWN0aXZlOnRoaXMucHJvcHMuYWN0aXZlLFxyXG4gICAgICAgICAgb25sb2FkOnRoaXMucHJvcHMub25sb2FkLFxyXG4gICAgICAgICAgcGVyOiAnMCUnLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCl7XHJcbiAgICAgICAgdGhpcy5mZXRoSW1nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Qcm9ncmVzcz0oeGhyKSA9PntcclxuICAgICAgICBpZih4aHIubGVuZ3RoQ29tcHV0YWJsZSl7IC8vIGZhbHNl55qE6K+ddG90YWzov5Tlm57mmK8wICxnaXRodWIg5LiKIGpzb24gLCBqcyAsIHR4dFxyXG4gICAgICAgICAgICBsZXQgcGVyY2VudENvbXBsZXRlID0gTWF0aC5yb3VuZCh4aHIubG9hZGVkIC8geGhyLnRvdGFsICogMTAwKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwZXJjZW50Q29tcGxldGUsJyUnKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtwZXI6IGAke3BlcmNlbnRDb21wbGV0ZX0lYH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ0BvblByb2dyZXNzIOivpei1hOa6kOaXoOazleiuoeeul2J5dGXplb/luqYnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGh0dHA6Ly9yZXMuY2xvdWRpbmFyeS5jb20vcmVzcG9uc2l2ZWJyZWFrcG9pbnRzL2ltYWdlL3VwbG9hZC9cclxuICAgICAqIGNfY3JvcCxcclxuICAgICAqIGhfNDAzLFxyXG4gICAgICogd18yMDBcclxuICAgICAqIC92MTUwMjc5MjkxMi8wMF9UZW1waW9fTWFsYXRlc3RpYW5vX2d3Znd5NC5qcGdcclxuICAgICAqL1xyXG4gICAgYXN5bmMgZmV0aEltZyAoKSB7XHJcbiAgICAgICAgY29uc3QgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICBjb25zdCB3ID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgY29uc3Qgc3JjID1cclxuICAgICAgICBgaHR0cDovL3Jlcy5jbG91ZGluYXJ5LmNvbS9yZXNwb25zaXZlYnJlYWtwb2ludHMvaW1hZ2UvdXBsb2FkL2ArXHJcbiAgICAgICAgYGNfY3JvcCxgK1xyXG4gICAgICAgIGBoXyR7aH0sYCtcclxuICAgICAgICBgd18ke3d9L2ArXHJcbiAgICAgICAgYCR7dGhpcy5wcm9wcy5vcmd9YDtcclxuICAgICAgICAvLyBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCBzcmMgKVxyXG4gICAgICAgIC8vICAgICAudGhlbihyZXMgPT4gUHJvZ3Jlc3NXaXRoRmV0Y2gocmVzLmJvZHkuZ2V0UmVhZGVyKCkpKTtcclxuICAgICAgICAvLyBjb25zdCBpc09rID0gYXdhaXQgcmVzcG9uc2Uub2s7XHJcbiAgICAgICAgLy8gaGkgcGl4ZWwgcGljXHJcbiAgICAgICAgLy8gYGh0dHA6Ly9jZG4ud2FsbHBhcGVyc2FmYXJpLmNvbS8yMy8xMS9jbEJOUnEuanBnYFxyXG5cclxuICAgICAgICBsZXQgWEhSID0gbmV3IFhIUlByb2dyZXNzKCk7XHJcbiAgICAgICAgWEhSLm9uUHJvZ3Jlc3MgPSB0aGlzLm9uUHJvZ3Jlc3M7XHJcbiAgICAgICAgbGV0IGlzT2sgPSBhd2FpdCBYSFIuc2VuZChzcmMpXHJcblxyXG4gICAgICAgIGlmKGlzT2s9PXRydWUpIHRoaXMuc2V0U3RhdGUoe29ubG9hZDp0cnVlfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3JjOnNyY30pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3c6d30pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2g6aH0pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPF9CR19JTUdcclxuICAgICAgICAgICAgICAgICB3PXt0aGlzLnN0YXRlLnd9XHJcbiAgICAgICAgICAgICAgICAgaD17dGhpcy5zdGF0ZS5ofVxyXG4gICAgICAgICAgICAgICAgIC8vIGFjdGl2ZT17dGhpcy5zdGF0ZS5vbmxvYWR9XHJcbiAgICAgICAgICAgICAgICAgc3JjPXt0aGlzLnN0YXRlLnNyY31cclxuICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPExvYWRpbmdcclxuICAgICAgICAgICAgICAgICAgICAgLy8gdz17dGhpcy5zdGF0ZS53fVxyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gaD17dGhpcy5zdGF0ZS5ofVxyXG4gICAgICAgICAgICAgICAgICAgICAvLyBvbmxvYWQ9e3RoaXMuc3RhdGUub25sb2FkfVxyXG4gICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHshdGhpcy5zdGF0ZS5vbmxvYWQ/dGhpcy5zdGF0ZS5wZXI6J1dFIFxcJ1JFQ09NTUlORy4uJ31cclxuICAgICAgICAgICAgICAgICAgICAgPC9Mb2FkaW5nPlxyXG5cclxuICAgICAgICAgICAgICAgIDwvX0JHX0lNRz5cclxuICAgICAgICAgICAgICAgIDxUVC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL2ltZy5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7O0FBTEE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBOztBQUNBO0FBQ0E7QUFEQTtBQUhBO0FBQ0E7QUFNQTtBQUVBO0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7OztBQU9BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBTEE7O0FBUUE7QUFBQTtBQUNBO0FBRUE7QUFBQTtBQUpBO0FBUkE7QUFDQTtBQWVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFaQTs7QUFlQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBSkE7QUFmQTtBQUNBO0FBdUJBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFSQTs7QUFVQTtBQUNBO0FBREE7QUFaQTtBQUNBO0FBaUJBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFHQTtBQW5CQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOzs7OztBQUVBO0FBQ0E7OztBQVlBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBT0E7QUFBQTtBQUNBO0FBRUE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBREE7O0FBQ0E7QUFDQTtBQURBO0FBRUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUVBO0FBQ0E7QUFGQTtBQUNBOztBQURBO0FBTUE7QUFOQTtBQU1BO0FBRUE7QUFDQTtBQUhBO0FBQ0E7OztBQURBO0FBS0E7QUFMQTtBQUFBOztBQVNBO0FBR0E7QUFIQTtBQUFBOzs7OztBQXhFQTtBQUNBO0FBREE7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==