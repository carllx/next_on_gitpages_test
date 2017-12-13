import {PureComponent} from 'react'
import {bindActionCreators} from 'redux'
import withRedux from 'next-redux-wrapper'
import {css} from 'glamor'
import NoSSR from 'react-no-ssr';
import Head from 'next/head'
import {GR , makeKEY , perspZ}  from '~/utils/ui'
import {isMobile  ,isTablet , getLanguer}  from '~/utils/device'
import {switchLanguage,onDevice} from'~/reducers/root'

import Scroller from '~/components/controller.scroll'
import Resizer from '~/components/controller.resize'
import AVATAR from '~/components/avatar'
import Nav from '~/components/nav'
import Seczione from '~/components/section'
import {initStore} from '~/store'
import  debounce  from 'lodash/debounce'

import TabButton from '~/components/artisti.tab.button'
import Biography from '~/components/artisti.tab.biography'
import Exhibition from '~/components/artisti.tab.exhibitions'
import Work from '~/components/artisti.tab.works'


import FullWork from '~/components/artisti.tab.works.FULL_IMG'




class Artisti extends PureComponent {

  static async getInitialProps({ isServer, query }) {
      /*es: query :{ id: 'EnzoCucchi' }*/
      const post = require(`../static/contents/artisti/${query.id}`);
      return { ...post }
  }

  constructor(props) {
    super(props)
    this.PERSP = 1000;
    this.tabs = this.Post2Tabs()
  }

  setLanguage = (language) => {
      this.props.switchLanguage(language)
  }

  Post2Tabs = () => {
    this.tab_names = [];

    if (this.props.biography){
      this.tab_names.push('BIOGRAPHY')
    }
    if (this.props.works){
      this.tab_names.push('WORKS')
    }
    if (this.props.selectTexts){
      this.tab_names.push('SELECTTEXTS')
    }
    if (this.props.exhibitions){
      this.tab_names.push('EXHIBITIONS')
    }
    if (this.props.news){
      this.tab_names.push('NEWS')
    }
  }


  setDevice = () => {
      let whatDevice;
      if (isMobile()) { whatDevice = 'mobile' } else if (isTablet()) { whatDevice = 'tablet' } else { whatDevice = 'desktop' }
      this.props.onDevice(whatDevice)
  }


  componentDidMount() {
      // DEVICE
      this.setDevice()
      /* LANGUGE */
      this.setLanguage(getLanguer())
  }

  render () {

    const {language } = this.props ||{language:'zh'}
    const {vw,vh,is_landscape} = this.props.view_size||{view_size:{vw:0,vh:0,is_landscap:false}}
    const WIDTH = is_landscape?GR.px(1,vw):GR.px(0.4,vw)

    return (
      <main
      key = {`page-${this.props.id}` }
       >
        <Head>
            <title>{this.props.name[language]}</title>
            {/*meta 不支持重复 property*/}
            <meta content={`ZAI - ${this.props.name[language]}`} name='title' />
            <meta content={`ZAI - ${this.props.name[language]}`} property='og:title' />
            <meta content={`ZAI - ${this.props.biography.zh} ${this.props.biography[language]} ${this.props.biography.en}`} name='biography' />
            <meta content={`ZAI - ${this.props.biography.zh} ${this.props.biography[language]} ${this.props.biography.en}`} property='og:biography' />
            <meta content={`${this.props.keywords} ZAI, zhongart internationale, Gallery, arte,中艺国际, 佛罗伦萨 `} name='keywords' />
            <meta content='article' property='og:type' />

            <meta content={`http://www.zhongart.it/artisti/${this.props.name[language]}`} property='og:url' />

            {/*
            <meta content='//s3.amazonaws.com/所用的图片' property='og:image' />
            */}

            {/*<style dangerouslySetInnerHTML={{ __html: this.props.css }} />*/}

        </Head>




      {/*3D Parallax*/}
      <div
       {...css({
          position: '-webkit-sticky',// @safari
          height: '100vh',//@parallax
          overflowX: 'hidden',//@parallax
          overflowY: 'auto',//@parallax
          perspective: '1000px',//@parallax
          perspectiveOrigin: '50% 50%',//@parallax left,top
          'WebkitOverflowScrolling': 'touch',// @safari
          backfaceVisibility: 'hidden',// @parallax防止闪烁(flicker)
       })}
       // ref= {c=>this._$win = c}
       // onMouseMove = {(e)=>{this.onMouse(e)}}
       id ='win_scroller'
       >


        {/* 头像和描述
        宽屏--横向2列 竖屏--1列 */}
          <NoSSR>
          <div
          {...css({
              // is_landscape
              display:'flex',
              flexDirection:'column',
              justifyContent:is_landscape?'center':'left',// iphone
              alignItems:'center',
              marginTop: `${is_landscape?GR.vw(7):GR.vw(6)}vw`,
              marginBottom: is_landscape?`${GR.vw(7)}vh`:`${GR.vw(7)}vw`,
              transformStyle: 'preserve-3d',//@parallax
              // transform: `rotate3d(${this.state.tiltx},${this.state.tilty},0,${this.state.degree}deg)`,
              // transition: `transform 1s cubic-bezier(0.1, 0.5, 0.4, 1)`,
            })}
           id ='roll'
          >
              {/* AVATAR/ TABS */}
              <div
               {...css({
                  width:`${WIDTH}px`,
                  display:'flex',
                  flexDirection:'row',
                  height:`${is_landscape?GR.px(4,vw):GR.px(1,vw)}px`,
                  marginBottom:`${is_landscape?GR.vw(6):GR.vw(6)}vw`,
                  transformStyle: 'preserve-3d',//@parallax
                  backfaceVisibility: 'hidden',//防止闪烁(flicker)
               })}
              >
                  <AVATAR
                   src = {this.props.avatar}
                   SizeWidth = {is_landscape?GR.px(4,vw):GR.px(1,vw)}
                   name = {this.props.name[language]}
                   />

                  {/*TabButton*/}
                  <TabButton
                   tabs= {this.tab_names}
                   width = {`${GR.px(1,vw)}px`}
                  />
              </div>


              {/*TABS*/}
              <div
              {...css({
                  // display:'flex',
                  position:'relative',
                  width:this.props.view_size.vw,// 不许提供，否则不能居中
                  left:0,
              })}
              className = 'TAB_MAIN'
              >
                {/*BIOGRAPHY*/}
                <Biography
                 width = {WIDTH}
                 tabName = {'BIOGRAPHY'}
                 contents = {this.props.biography[language]}
                />

                {/*EXHIBITIONS*/}
               <Exhibition
                width = {WIDTH}
                tabName = {'EXHIBITIONS'}
                contents = {this.props.exhibitions[language]}
                />
                {/*WORKS*/}
                <Work
                 width = {WIDTH}
                 tabName = {'WORKS'}
                 contents = {this.props.works}
                 // language = {language}
                />
              </div>

          </div>
          </NoSSR>

          {/*TABS-SECTION*/}



          {/*WORKS*/}

          {/*SELECT TEXTS*/}

          {/*EXHIBITIONS*/}










        </div>{/*3D Parallax*/}
        <FullWork contents = {this.props.works} />




        <NoSSR>
            <Nav show_on_init = {!is_landscape}/>
        </NoSSR>
        <NoSSR>
          <Scroller />
        </NoSSR>
        <Resizer/>

      </main>
      )
}
}





const mapStateToProps = (state) => ({
    view_size:state.Root.view_size,
    language:state.Root.language,

    // device:state.Root.device,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // root
    switchLanguage: bindActionCreators(switchLanguage, dispatch),
    onDevice: bindActionCreators(onDevice, dispatch),
    // setBrowser: bindActionCreators(setBrowser, dispatch),
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Artisti)
