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
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
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
                return _ref.apply(this, arguments);
            }

            return fethImg;
        }()
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 103
                }
            }, _react2.default.createElement(BGContainer, {
                w: this.state.w,
                h: this.state.h
                // active={this.state.onload}
                , src: this.state.src,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 104
                }
            }, _react2.default.createElement(Loading
            // w={this.state.w}
            // h={this.state.h}
            // onload={this.state.onload}

            , {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 110
                }
            }, !this.state.onload ? this.state.per : 'WE \'RECOMMING..')));
        }
    }]);

    return IMG;
}(_react.Component);

exports.default = IMG;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "E:\\data\\working\\Sito\\Pages chengcestudio nextjs_pages\\components\\img.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\data\\working\\Sito\\Pages chengcestudio nextjs_pages\\components\\img.js"); } } })();

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS4yYzNlMjliMWNhZWRmY2FkNmU3Mi5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9pbWcuanM/NWE0NjUzYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IHJlaHlkcmF0ZSwgY3NzIH0gZnJvbSAnZ2xhbW9yJ1xyXG5pbXBvcnQgZ2xhbW9yb3VzLHt3aXRoVGhlbWV9IGZyb20gJ2dsYW1vcm91cydcclxuaW1wb3J0IFhIUlByb2dyZXNzICBmcm9tICcuLi91dGlscy9Qcm9ncmVzcydcclxuaW1wb3J0IExvZ28gZnJvbSAnLi9sb2dvJ1xyXG5pbXBvcnQge3VpfSAgZnJvbSAnLi4vdXRpbHMvdWknXHJcbi8vIGltcG9ydCBmZXRjaCBmcm9tICdpc29tb3JwaGljLWZldGNoJ1xyXG5jb25zdCBCR0NvbnRhaW5lciA9IGdsYW1vcm91cy5kaXYoe1xyXG4gICAgICAgIC8vIGZvbnRTaXplOicwLjNyZW0nLFxyXG4gICAgICAgIHpJbmRleDoxLFxyXG4gICAgICAgIGRpc3BsYXk6J2ZsZXgnLFxyXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxyXG4gICAgICAgIGFsaWduSXRlbXM6J2NlbnRlcicsXHJcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6J3NwYWNlLWFyb3VuZCcsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yICAgOicjM2I0NDRmJyxcclxuICAgICAgICAvLyBiYWNrZ3JvdW5kUG9zaXRpb246JzUwJScsXHJcbiAgICAgICAgYmFja2dyb3VuZFJlcGVhdCAgOiduby1yZXBlYXQnLFxyXG4gICAgICAgIGJhY2tncm91bmRTaXplICAgIDonY292ZXInLFxyXG4gICAgICAgIG92ZXJmbG93ICAgICAgICAgIDonaGlkZGVuJyxcclxuICAgICAgICBwb3NpdGlvbiAgICAgICAgICA6J2Fic29sdXRlJyxcclxuICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgIHRvcDogMCxcclxuICAgIH0sKHByb3BzKT0+KHtcclxuICAgICAgICAvLyBpc0xhbmRzY2FwZSAgLS3miJYg5bGF5LitXHJcbiAgICAgICAgd2lkdGg6cHJvcHMudz9gJHtwcm9wcy53fWA6JzEwMCUnLFxyXG4gICAgICAgIGhlaWdodDpwcm9wcy5oP2Ake3Byb3BzLmh9YDonMTAwJScsXHJcbiAgICAgICAgLy/lnKjov5nph4zmib7muJDlj5jmqKHmnb8gaHR0cHM6Ly93ZWJncmFkaWVudHMuY29tL1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTpwcm9wcy5zcmM/YHVybCgke3Byb3BzLnNyY30pYDonbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjZDdkMmNjIDAlLCAjMzA0MzUyIDEwMCUpJyxcclxuICAgIH0pXHJcbilcclxuY29uc3QgTG9hZGluZyA9IGdsYW1vcm91cy5kaXYoe1xyXG4gICAgICAgIGZvbnRXZWlnaHQ6IDEwMCxcclxuICAgICAgICBwYWRkaW5nOiAnMC4zZW0gM2VtJyxcclxuICAgICAgICBmb250U2l6ZTogJzAuNGVtJyxcclxuICAgICAgICBjb2xvcjp1aS5jb2xvci5zZWNvbmRhcnlfb25fbGlnaHQsXHJcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXHJcbiAgICAgICAgYWxpZ25JdGVtczonY2VudGVyJyxcclxuICAgICAgICBqdXN0aWZ5Q29udGVudDonY2VudGVyJyxcclxuICAgICAgICBkaXNwbGF5OidmbGV4JyxcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6dWkuY29sb3IucHJpbWFyeSxcclxuICAgIH0sKHByb3BzKT0+KHtcclxuICAgICAgICAvLyBjb2xvcjpwcm9wcy5vbmxvYWQ/dWkuY29sb3Iuc2Vjb25kYXJ5X29uX2xpZ2h0OnVpLmNvbG9yLnNlY29uZGFyeV9vbl9kYXJrLFxyXG4gICAgICAgIC8vIGRpc3BsYXk6cHJvcHMub25sb2FkPydub25lJzonZmxleCcsXHJcbiAgICB9KVxyXG4pXHJcbmNsYXNzIElNRyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcclxuICAgICAgc3VwZXIocHJvcHMpOyAvL3VybFxyXG4gICAgICB0aGlzLnN0YXRlID0gey8vb25sb2FkIGFjdGl2ZVxyXG4gICAgICAgICAgYWN0aXZlOnRoaXMucHJvcHMuYWN0aXZlLFxyXG4gICAgICAgICAgb25sb2FkOnRoaXMucHJvcHMub25sb2FkLFxyXG4gICAgICAgICAgcGVyOiAnMCUnLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCl7XHJcbiAgICAgICAgdGhpcy5mZXRoSW1nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Qcm9ncmVzcz0oeGhyKSA9PntcclxuICAgICAgICBpZih4aHIubGVuZ3RoQ29tcHV0YWJsZSl7IC8vIGZhbHNl55qE6K+ddG90YWzov5Tlm57mmK8wICxnaXRodWIg5LiKIGpzb24gLCBqcyAsIHR4dFxyXG4gICAgICAgICAgICBsZXQgcGVyY2VudENvbXBsZXRlID0gTWF0aC5yb3VuZCh4aHIubG9hZGVkIC8geGhyLnRvdGFsICogMTAwKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwZXJjZW50Q29tcGxldGUsJyUnKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtwZXI6IGAke3BlcmNlbnRDb21wbGV0ZX0lYH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ0BvblByb2dyZXNzIOivpei1hOa6kOaXoOazleiuoeeul2J5dGXplb/luqYnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGh0dHA6Ly9yZXMuY2xvdWRpbmFyeS5jb20vcmVzcG9uc2l2ZWJyZWFrcG9pbnRzL2ltYWdlL3VwbG9hZC9cclxuICAgICAqIGNfY3JvcCxcclxuICAgICAqIGhfNDAzLFxyXG4gICAgICogd18yMDBcclxuICAgICAqIC92MTUwMjc5MjkxMi8wMF9UZW1waW9fTWFsYXRlc3RpYW5vX2d3Znd5NC5qcGdcclxuICAgICAqL1xyXG4gICAgYXN5bmMgZmV0aEltZyAoKSB7XHJcbiAgICAgICAgY29uc3QgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICBjb25zdCB3ID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgY29uc3Qgc3JjID1cclxuICAgICAgICBgaHR0cDovL3Jlcy5jbG91ZGluYXJ5LmNvbS9yZXNwb25zaXZlYnJlYWtwb2ludHMvaW1hZ2UvdXBsb2FkL2ArXHJcbiAgICAgICAgYGNfY3JvcCxgK1xyXG4gICAgICAgIGBoXyR7aH0sYCtcclxuICAgICAgICBgd18ke3d9L2ArXHJcbiAgICAgICAgYCR7dGhpcy5wcm9wcy5vcmd9YDtcclxuICAgICAgICAvLyBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCBzcmMgKVxyXG4gICAgICAgIC8vICAgICAudGhlbihyZXMgPT4gUHJvZ3Jlc3NXaXRoRmV0Y2gocmVzLmJvZHkuZ2V0UmVhZGVyKCkpKTtcclxuICAgICAgICAvLyBjb25zdCBpc09rID0gYXdhaXQgcmVzcG9uc2Uub2s7XHJcbiAgICAgICAgLy8gaGkgcGl4ZWwgcGljXHJcbiAgICAgICAgLy8gYGh0dHA6Ly9jZG4ud2FsbHBhcGVyc2FmYXJpLmNvbS8yMy8xMS9jbEJOUnEuanBnYFxyXG5cclxuICAgICAgICBsZXQgWEhSID0gbmV3IFhIUlByb2dyZXNzKCk7XHJcbiAgICAgICAgWEhSLm9uUHJvZ3Jlc3MgPSB0aGlzLm9uUHJvZ3Jlc3M7XHJcbiAgICAgICAgbGV0IGlzT2sgPSBhd2FpdCBYSFIuc2VuZChzcmMpXHJcblxyXG4gICAgICAgIGlmKGlzT2s9PXRydWUpIHRoaXMuc2V0U3RhdGUoe29ubG9hZDp0cnVlfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3JjOnNyY30pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3c6d30pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2g6aH0pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPEJHQ29udGFpbmVyXHJcbiAgICAgICAgICAgICAgICAgdz17dGhpcy5zdGF0ZS53fVxyXG4gICAgICAgICAgICAgICAgICBoPXt0aGlzLnN0YXRlLmh9XHJcbiAgICAgICAgICAgICAgICAgLy8gYWN0aXZlPXt0aGlzLnN0YXRlLm9ubG9hZH1cclxuICAgICAgICAgICAgICAgICBzcmM9e3RoaXMuc3RhdGUuc3JjfVxyXG4gICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8TG9hZGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAvLyB3PXt0aGlzLnN0YXRlLnd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBoPXt0aGlzLnN0YXRlLmh9XHJcbiAgICAgICAgICAgICAgICAgICAgIC8vIG9ubG9hZD17dGhpcy5zdGF0ZS5vbmxvYWR9XHJcbiAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyF0aGlzLnN0YXRlLm9ubG9hZD90aGlzLnN0YXRlLnBlcjonV0UgXFwnUkVDT01NSU5HLi4nfVxyXG4gICAgICAgICAgICAgICAgICAgICA8L0xvYWRpbmc+XHJcbiAgICAgICAgICAgICAgICA8L0JHQ29udGFpbmVyPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBJTUc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvaW1nLmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFiQTs7QUFnQkE7QUFBQTtBQUNBO0FBRUE7QUFBQTtBQUpBO0FBaEJBO0FBdUJBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBUkE7O0FBV0E7QUFGQTtBQUNBO0FBWEE7QUFDQTtBQWNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFHQTtBQW5CQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOzs7OztBQUVBO0FBQ0E7OztBQVlBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBT0E7QUFBQTtBQUNBO0FBRUE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBREE7O0FBQ0E7QUFDQTtBQURBO0FBRUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUVBO0FBQ0E7QUFGQTtBQUNBOztBQURBO0FBTUE7QUFOQTtBQU1BO0FBRUE7QUFDQTtBQUhBO0FBQ0E7OztBQURBO0FBS0E7QUFMQTtBQUFBOzs7OztBQVlBO0FBQ0E7QUFEQTtBQUNBOzs7OztBIiwic291cmNlUm9vdCI6IiJ9