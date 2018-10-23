import  {PureComponent} from 'react'
// import fetch from 'isomorphic-fetch' //
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {setScroll,setViewSize,setScrollOffsetY } from'reducers/root'
import {throttle, debounce}  from 'utils/throttle'
import {isMobile  , isLandscape }  from 'utils/device'
import NoSSR from 'react-no-ssr';





class Resizer extends PureComponent {



    constructor(props) {
        super(props)
        this.lazyResize = debounce(this.handleReSize ,400 );
    }

    setViewSize=()=>{
        console.info('Resize - setViewSize on redux')
        this.props.setViewSize({
              vh:  window.innerHeight,//window.innerHeight,//document.documentElement.clientHeight,
              vw:  window.innerWidth,//window.innerWidth,//document.documentElement.clientWidth,
              is_landscape:isLandscape()
          })
    }
    handleReSize=()=>{
        console.log('resize')
        this.setViewSize()
      }


    componentDidMount() {
        // LISTENERS
        window.addEventListener('resize', this.lazyResize);
        // 如果是直接访问,root 没有viewSize 信息
        if (this.props.view_size.vh === 0) {this.setViewSize()}
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.lazyResize);
    }

    componentWillUnMount() {
        if (typeof window == 'undefined') return
        //首次访问会出现无法识别windows
        window.removeEventListener('resize', this.lazyResize)
    }

    render() {
        return (
            null
        )
    }
}





const mapStateToProps = (state) => ({
    view_size:state.Root.view_size,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // root
    setViewSize: bindActionCreators(setViewSize, dispatch),
    // setBrowser: bindActionCreators(setBrowser, dispatch),

  }
}

export default connect( mapStateToProps, mapDispatchToProps)(Resizer)
