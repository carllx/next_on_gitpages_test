import { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'

import { css  } from 'glamor'
import {initStore} from '~/store'
import {setScroll,switchLanguage,setViewSize,onDevice ,setBrowser} from'~/reducers/root'
import { setPanelOn } from '~/reducers/nav'

import NoSSR from 'react-no-ssr';
import Head from 'next/head'
import SEO from '~/components/SEO.index'
import Nav from '~/components/nav'
import LOGO from '~/components/logo.svg'
import Resizer from '~/components/controller.resize'
import {ThreeInit} from'~/components/section.welcome.THREE.sphere.js'

import {isMobile  ,isTablet ,isLandscape, getLanguer}  from '../utils/device'

import {ui ,GR }  from '../utils/ui'


class Index extends PureComponent {
  static getInitialProps ({isServer}) {
    return Object.assign({},{isServer})
  }

  constructor (props) {
      super(props)
    }


  setLanguage=(language)=>{
    this.props.switchLanguage(language)
  }

  setDevice=()=>{
      let whatDevice ;
      if(isMobile()) {whatDevice = 'mobile'}
      else if(isTablet()) {whatDevice = 'tablet'}
      else {whatDevice = 'desktop'}
      this.props.onDevice(whatDevice)
  }



  componentDidMount(){

    // DEVICE
    this.setDevice()

    /* LANGUGE */
    this.setLanguage(getLanguer())

    /* height width DIRECTION */
    // this.setViewSize()

    ThreeInit();//@bug 不能resize,不能交互
  }



  render () {
    // debugger
    const {language} = this.props.language ||{language:'zh'}
    const {vw,vh,is_landscape} = this.props.view_size||{view_size:{vw:0,vh:0,is_landscap:false}}

    return (
      <main >
        <Head>
          <title>{'中艺国际 - ZAI - zhong art'}</title>
          <meta content={`中艺国际, ZAI, zhongart international`} name='title' />
          <meta content={`中艺国际, ZAI, zhongart international`} property='og:title' />
          <meta content={`中艺国际, ZAI, zhong art international, 中艺国际是一个位于意大利佛罗伦萨的国际性艺术与文化交流机构。成立于2017年，在中国北京和意大利佛罗伦萨均有办事机构，我们的宗旨是为中国和意大利两国提供文化领域的交流与合作，通过积极为两国的艺术机构之间和艺术家之间策划展览和艺术家之间的学术交流活动，推动促进两国文化积极友好的发展。我们与意大利很多国家级的很多重要文化机构如文化部、大使馆等都有长期项目往来，与一些艺术类高等院校如罗马美术学院、佛罗伦萨大学美术学院、欧洲设计学院等都有校际合作关系。我们为专业人士提供专业性对接交流，旨在为中国和意大利两国的艺术发展建立文化沟通的桥梁。`} name='description' />
          <meta content={`中艺国际, ZAI, zhong art international,中艺国际是一个位于意大利佛罗伦萨的国际性艺术与文化交流机构。成立于2017年，在中国北京和意大利佛罗伦萨均有办事机构，我们的宗旨是为中国和意大利两国提供文化领域的交流与合作，通过积极为两国的艺术机构之间和艺术家之间策划展览和艺术家之间的学术交流活动，推动促进两国文化积极友好的发展。我们与意大利很多国家级的很多重要文化机构如文化部、大使馆等都有长期项目往来，与一些艺术类高等院校如罗马美术学院、佛罗伦萨大学美术学院、欧洲设计学院等都有校际合作关系。我们为专业人士提供专业性对接交流，旨在为中国和意大利两国的艺术发展建立文化沟通的桥梁。`} property='og:description' />
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
        {...css({position:'absolute',top:0,left:0,cursor:'pointer',})}
        id = "scene" width={vw} height={vh}
        onClick = {()=>{this.props.setPanelOn('show')}}
        />


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
        <Resizer/>

      </main>



    )
  }

}

const mapStateToProps = (state) => ({
    view_size:state.Root.view_size,
    os:state.Root.os,
    device:state.Root.device,
    language:state.Root.language,
    // nav:state.nav
});

const mapDispatchToProps = (dispatch) => {
  return {
    // root
    switchLanguage: bindActionCreators(switchLanguage, dispatch),
    // setBrowser: bindActionCreators(setBrowser, dispatch),
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

