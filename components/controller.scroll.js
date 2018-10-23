import  {PureComponent} from 'react'
// import ReactDOM from 'react-dom'
// import fetch from 'isomorphic-fetch' //
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {isMobile}  from 'utils/device'
import {setScroll,setViewSize,setScrollOffsetY } from'reducers/root'
// import {throttle, debounce}  from 'utils/throttle'
import  throttle  from 'lodash/throttle'
import  debounce  from 'lodash/debounce'
import NoSSR from 'react-no-ssr';


class Scroller extends PureComponent {

    constructor(props) {
        super(props)
        /*throttle 支持过程中间切换更快,但safari 造成重新布局卡顿*/
        // this.lazySetOnUp = debounce(this.isScrollUp,100,{leading:false});
        this.lazySetOnUp = throttle(this.isScrollUp,500);
        // this.lazyY = debounce(this.updateY,200)
        this._prevScrollY = 0;
    }

    isScrollUp = () => {

        // debugger
        this._scrollY = this.props.BarOnId?this.$win.scrollTop:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (this._scrollY === this._prevScrollY) return

        if (this._scrollY - this._prevScrollY <= 0) { // is up ?

            console.log('↑');
            this.props.setScroll(true)
        } else {
            console.log('↓');
            this.props.setScroll(false)
        }
        // 刷新当前scroll所在位置
        this._prevScrollY = this._scrollY;
    }

    updateY = () => {
        const y = this.props.BarOnId?this.$win.scrollTop:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this._scrollY = y;
        // this.props.setScrollOffsetY(y);
        // debounce(this.props.setScrollOffsetY, 100);
    }

    handleScroll = (event) => {

        event.preventDefault();  // 阻止事件继续传播
        event.stopPropagation(); // 取消事件的默认行为
        // this.lazyY()
        this.lazySetOnUp()
    }

    componentDidMount() {

        // 根据是否设置了滚动区域 ,决定 Listener 安装的元素
        this.$win = this.props.BarOnId?document.getElementById(this.props.BarOnId):window
        // 根据是否设置了滚动区域 ,决定从哪个元素获取 scroltop 的参数
        this._prevScrollY = this.props.BarOnId?this.$win.scrollTop:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.$win.addEventListener('scroll', this.handleScroll,false)
        // debugger
    }

    componentWillMount() {
        if (typeof this.$win == 'undefined') return
        this.$win.removeEventListener('scroll', this.handleScroll,false);
    }

    componentWillUnmount() {
        if (typeof this.$win == 'undefined') return
        //首次访问会出现无法识别windows
        this.$win.removeEventListener('scroll', this.handleScroll,false)
    }

    render() {
        return (
            null
        )
    }
}





// const mapStateToProps = (state) => ({
//     view_size:state.Root.view_size,
// });

const mapDispatchToProps = (dispatch) => {
  return {
    // root
    setScroll: bindActionCreators(setScroll, dispatch),
    setScrollOffsetY: bindActionCreators(setScrollOffsetY, dispatch),
    // setBrowser: bindActionCreators(setBrowser, dispatch),

  }
}

export default connect( null, mapDispatchToProps)(Scroller)
