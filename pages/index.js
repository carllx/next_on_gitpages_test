import { Component } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'

import { css  } from 'glamor'

import {initStore} from '~/store'
import {setScroll,switchLanguage,setViewSize,onDevice ,setBrowser} from'~/reducers/root'
import { setPanelOn } from '~/reducers/nav'

import NoSSR from 'react-no-ssr';
import Head from 'next/head'
import SEO from '../components/SEO.index'
import Nav from '~/container/nav'
import LOGO from '../components/logo.svg'
import {ThreeInit} from'../components/section.welcome.THREE.sphere.js'

import {isMobile  ,isTablet ,isLandscape, getLanguer}  from '../utils/device'
import {throttle, debounce}  from '../utils/throttle'
import {ui ,GR }  from '../utils/ui'

import Perf from 'react-addons-perf'

// import fetch from 'isomorphic-fetch'
// import Post from '../components/post'


class Index extends Component {
  static getInitialProps ({isServer}) {
    return Object.assign({},{isServer})
  }

  constructor (props) {
      super(props)
      this.prevScrollY= 0
      this.lazyScroll= debounce(this.isScrollUp,130)
      this.lazyResize= debounce(this.handleReSize,130)
    }

  isScrollUp=()=>{

    const ScrollY = window.scrollY;
    const isUp = ( ScrollY - this.prevScrollY)<0 ;

    if(isUp) {
      console.log('↑');
    }else{
      console.log('↓');
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
          vh:  window.screen.height//window.innerHeight,//document.documentElement.clientHeight,
          vw:  window.screen.height//window.innerWidth,//document.documentElement.clientWidth,
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



  componentDidMount(){

    window.Perf = Perf
    window.addEventListener('scroll', this.lazyScroll, false)
    window.addEventListener('resize', this.lazyResize );

    // SCROLL
    this.prevScrollY = window.scrollY;

    // DEVICE
    this.setDevice()

    /* LANGUGE */
    this.setLanguage(getLanguer())

    /* height width DIRECTION */
    this.setViewSize()

    ThreeInit();

  }

  componentWillMount(){
    if (typeof window == 'undefined') return
    //首次访问会出现无法识别windows
    window.removeEventListener('scroll', this.lazyScroll);
    window.removeEventListener('resize', this.lazyResize);

  }


  componentWillUnMount(){
    window.removeEventListener('scroll', this.lazyScroll)
    window.removeEventListener('resize', this.lazyScroll)
  }


  render () {
    // debugger
    const {language } = this.props.language ||{language:'zh'}
    const {vw,vh,is_landscape} = this.props.view_size||{view_size:{vw:0,vh:0,is_landscap:false}}
    // if(vw>0) {debugger}
      // debugger
    return (
      <main >
        <Head>
          <title>{'中艺国际 - ZAI - zhong art'}</title>
          <meta content={`中艺国际, ZAI, zhongart international`} name='title' />
            <meta content={`中艺国际, ZAI, zhongart international`} property='og:title' />
            <meta content={`中艺国际, ZAI, zhong art international, 是一个致力于在意大利传播中国艺术文化的现实：我们的目标是让我们的传播者介绍中国传统和现代的艺术和文化，促进他们在意大利得到适当的赞赏。另一方面，我们在中国实现同样的目标，在两个地理遥远的国家之间的交流与互惠的逻辑，但接近精神`} name='description' />
            <meta content={`中艺国际, ZAI, zhong art international,是一个致力于在意大利传播中国艺术文化的现实：我们的目标是让我们的传播者介绍中国传统和现代的艺术和文化，促进他们在意大利得到适当的赞赏。另一方面，我们在中国实现同样的目标，在两个地理遥远的国家之间的交流与互惠的逻辑，但接近精神`} property='og:description' />
            <meta content={`中艺国际, ZAI, zhongart, zhong art international, 意大利, 佛罗伦萨, firenze, arte, Gallery`} name='keywords'/>
            <meta http-equiv="keyword" content="中艺国际, ZAI, zhongart, zhong art international, 意大利, 佛罗伦萨, firenze, arte, Gallery" />
            {/*name="twitter:site" content="@artstationhq"
            name="twitter:site_name" content="ArtStation"
            name="twitter:title" content="Fenghua Zhong"
            name="twitter:card" content="summary"
            name="twitter:description" content="concept artist E-art School of Design"
            name="twitter:image"*/}
        </Head>


        {/*服务器初始内容*/}
        <NoSSR onSSR={<SEO/>}>
          <ABS>{'客户端'}</ABS>
        </NoSSR>

        {/*THREE*/}
          <canvas
        {...css({position:'absolute',top:0,left:0})}
        id = "scene" width={vw} height={vh}/>


        {/*LOGO*/}
        <div
         {...css({
            /*居中*/
             position:'absolute',
             height: `fit-content`,
             width: is_landscape?`${GR.vw(3)}vw`:`${GR.vw(1)}vw`,
             display: 'block',
             marginLeft:is_landscape?'auto':`${GR.vw(6)}vw`,
             marginTop:is_landscape?'auto':`${GR.vw(6)}vw`,
             marginRight:'auto',
             marginBottom:'auto',
             top: 0, left: 0, right: 0, bottom: 0,
             cursor:'pointer',


        })}
        className= {'index_LOGO'}
        onClick = {()=>{this.props.setPanelOn('show')}}
        >
            <LOGO/>
        </div>

        {/*NAV*/}
        <NoSSR>
          <Nav
           // vw = {vw}
           // vh = {vh}
           // isLandscape={isLandscape}
           // language= {language}
           // marginW = {GR.vw(5)}
           show_on_init = {!is_landscape}
          />
        </NoSSR>


      </main>



    )
  }

}

const mapStateToProps = (state) => ({
    view_size:state.Root.view_size,
    os:state.Root.os,
    device:state.Root.device,
    language:state.Root.language,
    is_Scroll_up:state.Root.is_Scroll_up,
    // nav:state.nav
});

const mapDispatchToProps = (dispatch) => {
  return {
    // root
    switchLanguage: bindActionCreators(switchLanguage, dispatch),
    setScroll: bindActionCreators(setScroll, dispatch),
    setViewSize: bindActionCreators(setViewSize, dispatch),
    setBrowser: bindActionCreators(setBrowser, dispatch),
    onDevice: bindActionCreators(onDevice, dispatch),
    //nav
    setPanelOn:bindActionCreators(setPanelOn, dispatch )
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)



const ABS = (props)=>
   <div
    {...css({
         position:'absolute',
         zIndex:-1,
    })}
    >
        {props.children}
    </div>

