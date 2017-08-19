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

var _reactNoSsr = require('react-no-ssr');

var _reactNoSsr2 = _interopRequireDefault(_reactNoSsr);

var _post = require('../components/post');

var _post2 = _interopRequireDefault(_post);

var _nav = require('../components/nav');

var _nav2 = _interopRequireDefault(_nav);

var _img = require('../components/img');

var _img2 = _interopRequireDefault(_img);

var _logo = require('../components/logo');

var _logo2 = _interopRequireDefault(_logo);

var _device = require('../utils/device');

var _throttle = require('../utils/throttle');

var _ui = require('../utils/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  // };
  // shouldComponentUpdate(){
  //   return false
  // }


  (0, _createClass3.default)(_class, [{
    key: 'componentWillMount',
    value: function componentWillMount() {

      if (typeof window == 'undefined') return;
      (0, _device.setREM)();
      window.removeEventListener('scroll', this.onScorll, false);
      window.removeEventListener('resize', this.onReSize);
    }

    // componentWillUnmount(){
    //   window.removeEventListener('scroll', this.onScorll, false);
    //   window.removeEventListener('resize', this.onReSize);
    // }


  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      window.addEventListener('scroll', this.onScorll, false);
      window.addEventListener('resize', this.onReSize);

      // SCROLL
      this.prevScrollY = window.scrollY;

      // 检测移动硬件
      if (typeof navigator === 'undefined') {
        console.log(this.state);
        return;
      }
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

      var screen = window.orientation || window.screen.orientation.angle;

      console.log('方向:   ', screen.orientation, '\n高度: ', window.innerHeight, '\n宽度: ', window.innerWidth);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('main', null, _react2.default.createElement(_head2.default, null, _react2.default.createElement('title', null, '\u4E2D\u827A\u56FD\u9645')), _react2.default.createElement(_reactNoSsr2.default, null, _react2.default.createElement(_logo2.default, {
        device: this.state.device,
        isLandscape: this.state.isLandscape,
        color: _ui.ui.color.primary_on_dark,
        bg_color: _ui.ui.color.secondary
      })), _react2.default.createElement(_reactNoSsr2.default, { onSSR: _react2.default.createElement('h2', null, '\u4E2D\u827A\u56FD\u9645') }, _react2.default.createElement(_nav2.default, {
        device: this.state.device,
        isLandscape: this.state.isLandscape,
        language: this.state.language })), _react2.default.createElement(_reactNoSsr2.default, null, _react2.default.createElement(_img2.default, {
        w: this.state.w,
        h: this.state.h,
        org: 'v1502792912/00_Tempio_Malatestiano_gwfwy4.jpg',
        active: 'true'
      })), _react2.default.createElement('content', { onScroll: this.handleScroll }, _react2.default.createElement(_glamorous2.default.Div, {
        fontSize: '0.25rem',
        margin: '10em 0.8em 0 0.8em' }, _react2.default.createElement(_glamorous2.default.Div, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '38em' }, 'We are comming...'), _react2.default.createElement('h2', null, '\u8BBE\u8BA1\u7279\u8272'), _react2.default.createElement(_glamorous2.default.Span, { color: '#717171' }, '\u66F4\u65B0\u4E8E2017-8-16'), _react2.default.createElement('h3', null, 'Z + AI'), _react2.default.createElement('p', null, '\n              ZAI is alive, \u6BCF\u4E2A\u7F51\u9875\u5143\u7D20 (\u4F8B\u5982"\u6309\u94AE,\u56FE\u7247\u5361,\u5BFC\u822A\u680F,Logo"), \u5206\u522B\u89C6\u4E3A\u6709\u751F\u547D\u7684\u72EC\u7ACB\u5143\u7D20. \u5B83\u4EEC\u4E0D\u53EA\u662F\u5B58\u5728, \u66F4\u662F\u6D3B\u7740\u7684.\n\n              Z + AI \u7684\u5B9E\u73B0\u601D\u8DEF\u662F\u4E3A\u5143\u7D20\u6CE8\u5165AI\u7279\u6027,\u5F3A\u5316\u6BCF\u4E2A\u5143\u7D20\u5404\u81EA\u7684\u4E2A\u6027,\u6539\u8FDB\u4E0E\u7528\u6237\u4EA4\u4E92\u7684\u53CD\u5E94.\n              \r\n\u8BE5\u7279\u6027\u662F\u6211\u4EEC\u7684\u957F\u671F\u76EE\u6807,\u5C06\u5728\u7F51\u7AD9\u7B2C\u4E8C\u671F\u5DE5\u7A0B\u7531ZAI\u56E2\u961F\u5171\u540C\u8BBE\u8BA1.'), _react2.default.createElement('h3', null, 'NULL DESIGN'), _react2.default.createElement('p', null, '\u7EB8\u5F20\u7684\u7A7A\u80FD\u53EC\u5524\u521B\u9020\u8005\u7684\u7075\u611F,\u5F53\u5B83\u8F7D\u6EE1\u7075\u611F\u7684\u65F6\u5019\u4E5F\u662F\u4ED6\u6700\u6709\u4EF7\u503C\u7684, \u56E0\u6B64\u6211\u4EEC\u7F51\u7AD9\u8BBE\u8BA1\u5C06\u7279\u522B\u5173\u6CE8\u7A7A\u767D\u7684\u5730\u65B9'), _react2.default.createElement('h3', null, '\u611F\u5E94\u5F0F\u5E03\u5C40'), _react2.default.createElement('p', null, '\u6211\u4EEC\u5173\u5FC3\u4F60\u4F1A\u5728\u4EC0\u4E48\u573A\u5408,\u4F7F\u7528\u4EC0\u4E48\u65B0\u8BBE\u5907\u8BBF\u95EE\u6211\u4EEC, \u4E0D\u8BBA\u4F60\u4EEC\u5728\u4F7F\u7528\u7535\u8111 / \u624B\u673A / \u5E73\u677F / \u7F51\u7EDCTV,\n              \u6216\u8005\u4F60\u7684\u8BBE\u590790\u5EA6/180\u5EA6,\u6211\u4EEC\u90FD\u4F1A\u8003\u8651\u5230,\u6211\u4EEC\u4F1A\u5206\u522B\u4E3A\u4F60\u5B9A\u4E49\u4E0D\u4E00\u6837\u7684\u7F51\u9875\u5E03\u5C40\n              '), _react2.default.createElement('h3', null, '\u6D41\u91CF\u8282\u7EA6'), _react2.default.createElement('p', null, '\u6211\u4EEC\u77E5\u9053\u4F60\u4EEC\u7684\u8BBF\u95EE\u662F\u6709\u4EE3\u4EF7, \u6240\u4EE5\u6211\u4EEC\u5728\u8BBE\u8BA1\u4E00\u5957\u6D41\u91CF\u8282\u5236\u7CFB\u7EDF,\n              \u4F8B\u5982\u5F53\u4F60\u7684\u8BBF\u95EE\u6D89\u53CA\u56FE\u7247\u5185\u5BB9\u65F6,\u6211\u4EEC\u4F1A\u5148\u6839\u636E\u4F60\u7684\u8BBE\u5907\u5148\u5B9A\u5236\u5408\u9002\u7684\u50CF\u7D20,\u518D\u53D1\u9001\u5230\u4F60\u7684\u8BBE\u5907\u4E0A.\n              \u4F60\u5C4F\u5E55\u4EE5\u5916\u7684\u56FE\u7247,\u6211\u4EEC\u662F\u4E0D\u4F1A\u8BA9\u5B83\u5360\u7528\u4F60\u4EEC\u7684\u6D41\u91CF,\u5C3D\u7BA1\u5B83\u5C31\u5728\u4E00\u4E2A\u9875\u9762\u5185,\n              \u5B83\u4EEC\u53EA\u6709\u5728\u4F60\u9700\u8981\u7684\u65F6\u5019\u6211\u4EEC\u624D\u4F1A\u4F20\u9001\u7ED9\u4F60.'), _react2.default.createElement('h3', null, '\u786C\u4EF6\u68C0\u6D4B'), _react2.default.createElement('span', null, '\u4E3A\u611F\u5E94\u5F0F\u5E03\u5C40,\u6839\u636E\u7528\u6237\u8BBF\u95EE\u8BBE\u5907,\u7535\u8111 / \u624B\u673A / \u5E73\u677F ,\u53CA\u8FD9\u4E9B\u8BBE\u5907\u7684\u6A2A\u5C4F\u548C\u7AD6\u5C4F\u5B9A\u4E49\u5408\u9002\u7684\u7F51\u9875\u5E03\u5C40,'), _react2.default.createElement('span', null, '\u8BC6\u522B\u4F60\u7684\u8BBE\u5907\u662F ', _react2.default.createElement(_glamorous2.default.Span, { color: '#d14' })), _react2.default.createElement('h3', null, 'ZAI further away(\u6E10\u884C\u6E10\u8FDC)'), _react2.default.createElement('p', null, '\u6211\u4EEC\u975E\u5E38\u5728\u4E4E\u4F60\u672A\u6765\u7684\u6D4F\u89C8\u65B9\u5F0F,\u5BF9\u5DF2\u7ECF\u6210\u4E3A\u4E3B\u6D41\u7684\u6280\u672F/\u65B9\u5F0F, \u6211\u4EEC\u4F1A\u4E0D\u60DC\u8FDB\u884C\u6539\u9020,\u5C31\u5982\u6211\u4EEC\u4E0D\u4F1A\u4E3A\u6C42\u9009\u7528\u5DF2\u7ECF\u53D1\u5C55\u6210\u719F\u7684\n              wordpress\u6846\u67B6\u5236\u4F5C\u6211\u4EEC\u7684\u7F51\u7AD9,\u5C3D\u7BA1\u5B83\u66F4\u7B80\u5355\u548C\u66F4\u6709\u6548\u7387. \u6211\u4EEC\u5206\u6790\u672A\u6765\u8D8B\u5411,\u4E0D\u60DC\u82B1\u8D39\u5927\u91CF\u7684\u5B66\u4E60/\u6392\u9519\u6210\u672C,\n              \u63A2\u7D222017+\u6700\u65B0\u7684\u6846\u67B6\u548C\u5F00\u53D1\u8BED\u8A00, \u6240\u4EE5\u6211\u4EEC\u53EF\u4EE5\u4E0D\u65AD\u4E3A\u4F60\u63D0\u4F9B\u6700\u65B0\u7684\u670D\u52A1\u548C\u66F4\u591A\u7684\u53EF\u80FD\u6027'), _react2.default.createElement('h2', null, 'Change Log \u7F51\u7AD9\u8FDB\u5EA6'), _react2.default.createElement('h3', null, '2017-8-16'), _react2.default.createElement('p', null, '\u628A\u9879\u76EE\u6258\u7BA1\u81F3git'), _react2.default.createElement('p', null, '\u5C1D\u8BD5\u4FEE\u590Dgit log\u4E2D\u6587\u73B0\u5B9E\u95EE\u9898'), _react2.default.createElement('h3', null, '2017-8-11'), _react2.default.createElement('p', null, '\u5F00\u59CBdpr\u68C0\u6D4B\u811A\u672C, \u4E3Aiphone,mac\u7B49\u82F9\u679C\u7684 retina\u5C4F\u5E55\u5339\u914D, '), _react2.default.createElement('p', null, '\u811A\u672C\u5C1D\u8BD5\u52A0\u5165\u6839\u636Edpr,\u81EA\u52A8\u5B9A\u4E49fontsize\u7684\u903B\u8F91,\u4E3A\u5B9E\u73B0\u4EE5rem\u548Cem\u5B57\u4F53\u5355\u4F4D\u5B9A\u4E49\u6392\u7248'), _react2.default.createElement('p', null), _react2.default.createElement('h3', null, '2017-8-15'), _react2.default.createElement('p', null, '\u8BD5\u7528\u6784\u5EFA\u56FE\u7247\u81EA\u52A8\u88C1\u526A\u7CFB\u7EDF,\u4E8E\u670D\u52A1\u5668\u4E2D'), _react2.default.createElement('h3', null, '2017-8-14'), _react2.default.createElement('p', null, '\u89C4\u8303\u5316\u7F51\u7AD9\u989C\u8272,\u5206\u4E3APrimary,Secondary,\u5B57\u4F53\u5206\u522B\u5728\u6DF1/\u6D45\u989C\u8272\u80CC\u666F\u5404\u5B9A\u4E49\u4E09\u7EA7\u900F\u660E\u5EA689%,55%30%'), _react2.default.createElement('h3', null, '2017-8-13'), _react2.default.createElement('p', null, '\u5C1D\u8BD5\u8C03\u8BD5\u5FAE\u4FE1\u7AEF\u4E0D\u652F\u6301Object.assign(\u672A\u89E3\u51B3)'), _react2.default.createElement('h3', null, '2017-8-12'), _react2.default.createElement('p', null, '\u4FEE\u590DLink\u4E0D\u80FD\u8DF3\u8F6C\u5230\u6307\u5B9A\u7F51\u9875\u7684\u95EE\u9898'), _react2.default.createElement('p', null, 'dpr\u68C0\u6D4B\u811A\u672C\u5B8C\u6210'), _react2.default.createElement('h3', null, '2017-8-10'), _react2.default.createElement('p', null, '\u53C2\u8003Aframe\u6846\u67B6,device.js \u5C06\u539F\u6765\u7684\u51FD\u6570\u5F0F\u65B9\u7A0B\u91CD\u65B0\u6539\u5199\u6210\u7EC4\u5EFA\u7BA1\u7406\u6A21\u5F0F'), _react2.default.createElement('p', null, '\u5FFD\u7565\u539F\u6765\u5BF9TV\u7684\u8BC6\u522B(\u6682\u65F6\u4E0D\u9700\u8981) '), _react2.default.createElement('p', null), _react2.default.createElement('h3', null, '2017-8-9'), _react2.default.createElement('p', null, '\u4FEE\u590DNav \u7EC4\u4EF6, \u7528glamorous\u5BF9Nav\u505A\u521D\u6B65\u6837\u5F0F '), _react2.default.createElement('p', null), _react2.default.createElement('p', null), _react2.default.createElement('h3', null, '2017-8-8'), _react2.default.createElement('p', null, '\u5F15\u5165device.js \u786C\u4EF6\u68C0\u6D4B\u811A\u672C'), _react2.default.createElement('p', null, '/\u827A\u672F\u5BB6 carta\u7EC4\u4EF6\u6837\u5F0F\u6539\u52A8'), _react2.default.createElement('h3', null, 'Sat Jul 29 00:21:57 2017 +0200'), _react2.default.createElement('p', null, '\u6DFB\u52A0.nojekyll,\u5C1D\u8BD5\u4FEE\u590Djs\u8BF7\u6C42\u5931\u8D25'), _react2.default.createElement('h3', null, 'Tue Jul 25 12:42:45 2017 +0200'), _react2.default.createElement('p', null, '\u7B2C\u4E00\u6B21\u9012\u4EA4'), _react2.default.createElement('p', null))));
    }
  }]);

  return _class;
}(_react.Component);

//<section>
//  {this.props.postList.map(post => <Post {...post} key={post.id} />)}
//</section>


exports.default = _class;