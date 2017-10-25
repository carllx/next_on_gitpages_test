import  {PureComponent} from 'react'
// import fetch from 'isomorphic-fetch' //
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {isMobile}  from '~/utils/device'
import {setScroll,setViewSize,setScrollOffsetY } from'~/reducers/root'
import {throttle, debounce}  from '~/utils/throttle'

import NoSSR from 'react-no-ssr';





class Scroller extends PureComponent {



    constructor(props) {
        super(props)
        this.lazyOn = throttle(800,this.isScrollUp);
        this.lazyY = debounce(this.updateY,300)
        this._prevScrollY = 0;
    }

    isScrollUp = () => {

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
        const y = window.scrollY
        this._scrollY = y;
        this.props.setScrollOffsetY(y);
        // debounce(this.props.setScrollOffsetY, 100);
    }

    handleScrollonY = (event) => {
        event.preventDefault();  // 阻止事件继续传播
        event.stopPropagation(); // 取消事件的默认行为
        const y = window.scrollY
        // this.props.setScrollOffsetY(y);
        this.lazyY(y)
        this._scrollY = y;
        this.lazyOn()
    }

    componentDidMount() {
        // LISTENERS
        this._prevScrollY = window.scrollY;
        window.addEventListener('scroll', this.handleScrollonY)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScrollonY);
    }

    componentWillUnMount() {
        if (typeof window == 'undefined') return
        //首次访问会出现无法识别windows
        window.removeEventListener('scroll', this.handleScrollonY)
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
