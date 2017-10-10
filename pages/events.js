import { Component } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'

import NoSSR from 'react-no-ssr';
import {throttle, debounce}  from '../utils/throttle'
import {isMobile  ,isTablet , isLandscape, getLanguer }  from '~/utils/device'
import Page from '../container/events/page'
import {initStore} from '~/store'
import {setScroll,switchLanguage,setViewSize,onDevice } from'~/reducers/root'

import Nav from '~/container/nav'

import Perf from 'react-addons-perf'

class Events extends Component {
  //getInitialProps {{store query}}
  static getInitialProps ({isServer, query}) {

    const post = require(`../static/contents/artisti/${query.id}`);
    // store.dispatch( )达到初始化store的效果
    // store.dispatch({type:'INIT'})
    return   Object.assign({},{isServer},post)
  }


  constructor(props){
    super(props)
    this.prevScrollY = 0
    this.lazyScroll= debounce(this.isScrollUp,130)
    this.lazyResize= debounce(this.setViewSize,130)
  }


  isScrollUp = ()=>{

    const ScrollY = window.scrollY;
    if(ScrollY == this.prevScrollY) return
    const isUp = ( ScrollY - this.prevScrollY)<=0 ;

    if(isUp) {
      console.log('↑');
      this.props.setScroll(true)
    }else{
      console.log('↓');
      this.props.setScroll(false)
    }
    // 刷新当前scroll所在位置
    this.prevScrollY = ScrollY;
  }

  setLanguage=(language)=>{
    this.props.switchLanguage(language)
  }

  setViewSize=()=>{
    console.info('Resize - setViewSize on redux')
    this.props.setViewSize({
      vh: document.documentElement.clientHeight,
      vw: document.documentElement.clientWidth,
      is_landscape:isLandscape()
      })
  }
  setDevice=()=>{
      let whatDevice ;
      if(isMobile()) {whatDevice = 'mobile'}
      else if(isTablet()) {whatDevice = 'tablet'}
      else {whatDevice = 'desktop'}
      this.props.onDevice(whatDevice)
    }



  componentDidMount () {
    window.Perf = Perf
    // LISTENERS
    this.prevScrollY = window.scrollY;
    window.addEventListener('scroll', this.lazyScroll)
    window.addEventListener('resize', this.lazyResize);

    // DEVICE
    this.setDevice()

    /* LANGUGE */
    this.setLanguage(getLanguer())

    /* height width DIRECTION */
    this.setViewSize()
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.lazyScroll);
    window.removeEventListener('resize', this.lazyResize);
  }

  componentWillUnMount(){
    window.removeEventListener('scroll', this.lazyScroll)
    window.removeEventListener('resize', this.lazyResize)
  }

  render () {
    // console.log(this.props)
    return (
      <div>
        <div onClick= {()=>this.setLanguage('it')}>ITALIANO</div>
        <div onClick= {()=>this.setLanguage('en')}>ENGLISH</div>
        <div onClick= {()=>this.setLanguage('zh')}>中文</div>
        <Page name = {this.props.name} />
        <Page name = {this.props.name} />
        <Page name = {this.props.name} />
        <Page name = {this.props.name} />
        <Page name = {this.props.name} />
        <Page name = {this.props.name} />
        <Page name = {this.props.name} />
        <Page name = {this.props.name} />
        <NoSSR>
          <Nav
           show_on_init = {true}
           // show = {is_Scroll_up}
          />
        </NoSSR>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchLanguage: bindActionCreators(switchLanguage, dispatch),
    setScroll: bindActionCreators(setScroll, dispatch),
    setViewSize: bindActionCreators(setViewSize, dispatch),
    onDevice: bindActionCreators(onDevice, dispatch),
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(Events)
